'use client';
import React from 'react';
import {
  khulnasoft,
  Subscription,
  GetContentOptions,
  Khulnasoft,
  KhulnasoftContent as Content,
} from '@khulnasoft.com/sdk';
import { NoWrap } from './no-wrap';
import { applyPatchWithMinimalMutationChain } from '../functions/apply-patch-with-mutation';
import { VariantsProvider } from './variants-provider.component';

export type KhulnasoftContentProps<ContentType> = {
  /**
   * Callback to run when content is fetched and loaded.
   */
  contentLoaded?: (data: any, content: any) => void;
  /**
   * Callback to run if an error occurred while fetching content.
   */
  contentError?: (error: any) => void;
  options?: GetContentOptions;
  children: (content: ContentType, loading?: boolean, fullData?: any) => React.ReactNode;
  /**
   * Only render what was explicitly passed in via `content` - don't fetch from
   * the Khulnasoft API.
   *
   * @see content
   */
  inline?: boolean;
  /**
   * @package
   * @deprecated
   */
  dataOnly?: boolean;
  /**
   * @package
   * Pass in a specific khulnasoft instance to use instead of the default
   * singleton.
   */
  khulnasoft?: Khulnasoft;
  /**
   * @deprecated and unnecessary
   */
  isStatic?: boolean;
  /**
   * Khulnasoft content object to use instead of fetching from the API.
   *
   * Required if `inline` is set to `true`.
   */
  content?: Content;
} & ({ model: string } | { modelName: string }); // model and modelName are aliases of the same thing¸

/**
 * When passed content json explicitly it'll calculate a/b tests on the content
 * and pass the winning variation down to the children function. If then content
 * prop was omitted it'll try to fetch matching content from your Khulnasoft
 * account based on the default user attributes and model.
 */
export class KhulnasoftContent<ContentType extends object = any> extends React.Component<
  KhulnasoftContentProps<ContentType>
> {
  ref: HTMLDivElement | null = null;

  get khulnasoft() {
    return this.props.khulnasoft || khulnasoft;
  }
  get name() {
    const props = this.props;

    if ('model' in props) {
      return props.model;
    } else {
      return props.modelName;
    }
  }

  get renderedVariantId() {
    const id = this.props.isStatic
      ? this.khulnasoft.getCookie(`khulnasoft.tests.${this.data?.id}`)
      : this.data?.variationId;
    if (id !== null) {
      return id;
    }
  }

  get options() {
    let options = {
      ...(this.props.options || ({} as GetContentOptions)),
    };
    if (!options.key && this.props.content?.id && !Khulnasoft.isEditing && !Khulnasoft.isPreviewing) {
      options.key = this.props.content.id;
    }
    if (
      this.props.content &&
      !options.initialContent?.length &&
      (this.props.inline || !Khulnasoft.isPreviewing)
    ) {
      options.initialContent = [this.props.content];
    }

    return options;
  }

  get data() {
    const content: Content =
      ((this.props.inline || !Khulnasoft.isBrowser || this.firstLoad) &&
        this.options.initialContent &&
        this.options.initialContent[0]) ||
      this.state.data;

    return getContentWithInfo(content);
  }

  state = {
    loading: !this.props.content,
    data: getContentWithInfo(this.props.content),
    updates: 1,
  };

  onWindowMessage = (event: MessageEvent) => {
    const isTrusted = Khulnasoft.isTrustedHostForEvent(event);
    if (!isTrusted) return;

    const message = event.data;
    if (!message) {
      return;
    }
    switch (message.type) {
      case 'khulnasoft.patchUpdates': {
        if (this.props.options?.noEditorUpdates) {
          return;
        }
        const { data } = message;
        if (!(data && data.data)) {
          break;
        }
        const patches = data.data[this.state.data?.id!];
        if (!(patches && patches.length)) {
          return;
        }

        if (location.href.includes('khulnasoft.debug=true')) {
          eval('debugger');
        }
        let newData = this.state.data as any;
        for (const patch of patches) {
          newData = applyPatchWithMinimalMutationChain(newData, patch, false);
        }
        this.setState({
          updates: this.state.updates + 1,
          data: newData,
        });
        if (this.props.contentLoaded) {
          this.props.contentLoaded(newData.data, newData);
        }
        break;
      }
    }
  };

  subscriptions = new Subscription();

  firstLoad = true;
  clicked = false;
  trackedImpression = false;

  intersectionObserver: IntersectionObserver | null = null;

  // TODO: observe model name for changes
  componentDidMount() {
    // Temporary to test metrics diving in with bigquery and heatmaps
    // this.khulnasoft.autoTrack = true;
    // this.khulnasoft.env = 'development';
    if (!this.props.inline || Khulnasoft.isEditing || Khulnasoft.isPreviewing) {
      this.subscribeToContent();
    } else if (this.props.inline && this.options?.initialContent?.length) {
      const contentData = this.options.initialContent[0];
      // TODO: intersectionobserver like in subscribetocontent - reuse the logic
      if (contentData?.id) {
        this.khulnasoft.trackImpression(contentData.id, this.renderedVariantId, undefined, {
          content: contentData,
        });
      }
    }

    if (Khulnasoft.isEditing) {
      addEventListener('message', this.onWindowMessage);
    }

    /// REACT15ONLY if (this.ref) { this.ref.setAttribute('khulnasoft-model', this.name); }
  }

  subscribeToContent() {
    if (this.name !== '_inline') {
      // TODO:... using targeting...? express.request hmmm
      this.subscriptions.add(
        this.khulnasoft.queueGetContent(this.name, this.options).subscribe(
          matches => {
            const match = matches && matches[0];
            this.setState({
              data: match,
              loading: false,
            });
            // when KhulnasoftContent is wrapping a KhulnasoftComponent of the same model, the KhulnasoftComponent is passing initialContent on the same key
            // causing the sdk to resolve this call to the initialContent instead of the previewed/edited content
            // so we test here if the KhulnasoftContent is being used directly ( not inlined ) and it has initial content ( content prop ), we let the first render go through to show the initial content
            // and we subscribe again to get the draft/editing content
            const isPreviewing =
              (this.khulnasoft.editingModel || this.khulnasoft.previewingModel) === this.name;
            if (!this.props.inline && this.props.content && this.firstLoad && isPreviewing) {
              this.firstLoad = false;
              this.subscriptions.unsubscribe();
              this.subscribeToContent();
            }

            if (match && this.firstLoad) {
              this.firstLoad = false;
              // TODO: autoTrack
              if (khulnasoft.autoTrack && !Khulnasoft.isEditing) {
                let addedObserver = false;
                if (typeof IntersectionObserver === 'function' && this.ref) {
                  try {
                    const observer = (this.intersectionObserver = new IntersectionObserver(
                      (entries, observer) => {
                        entries.forEach(entry => {
                          // In view
                          if (entry.intersectionRatio > 0 && !this.trackedImpression) {
                            this.khulnasoft.trackImpression(
                              match.id!,
                              this.renderedVariantId,
                              undefined,
                              {
                                content: this.data,
                              }
                            ),
                              { content: this.data };
                            this.trackedImpression = true;
                            if (this.ref) {
                              observer.unobserve(this.ref);
                            }
                          }
                        });
                      }
                    ));

                    observer.observe(this.ref);
                    addedObserver = true;
                  } catch (err) {
                    console.warn('Could not bind intersection observer');
                  }
                }
                if (!addedObserver) {
                  this.trackedImpression = true;
                  this.khulnasoft.trackImpression(match.id!, this.renderedVariantId, undefined, {
                    content: match,
                  });
                }
              }
            }
            if (this.props.contentLoaded) {
              this.props.contentLoaded(match && match.data, match);
            }
          },
          error => {
            if (this.props.contentError) {
              this.props.contentError(error);
              this.setState({
                loading: false,
              });
            }
          }
        )
      );
    }
  }

  componentWillUnmount() {
    if (Khulnasoft.isEditing) {
      removeEventListener('message', this.onWindowMessage);
    }

    this.subscriptions.unsubscribe();
    if (this.intersectionObserver && this.ref) {
      this.intersectionObserver.unobserve(this.ref);
    }
  }

  onClick = (reactEvent: React.MouseEvent<HTMLElement>) => {
    // TODO: viewport scrolling tracking for impression events
    const event = reactEvent.nativeEvent;

    const content = this.data;
    if (!content) {
      return;
    }
    if (khulnasoft.autoTrack) {
      this.khulnasoft.trackInteraction(content.id!, this.renderedVariantId, this.clicked, event, {
        content,
      });
    }
    if (!this.clicked) {
      this.clicked = true;
    }
  };

  render() {
    if (this.props.dataOnly) {
      return null;
    }
    const { loading } = this.state;

    const useData: any = this.data;
    const TagName = this.props.dataOnly ? NoWrap : 'div';
    return (
      <VariantsProvider initialContent={useData}>
        {(variants, renderScript) => {
          return (
            <React.Fragment>
              {variants.map((content, index) => {
                // default Variation is at the end, wrap the rest with template
                // TODO: IE11 don't support templates
                const Tag = index === variants.length - 1 ? React.Fragment : 'template';
                return (
                  <React.Fragment key={String(content?.id! + index)}>
                    {Tag !== 'template' && renderScript?.()}
                    <Tag
                      key={String(content?.id! + index)}
                      {...(Tag === 'template' && {
                        'data-template-variant-id': content?.id,
                      })}
                    >
                      <TagName
                        {...(index === 0 &&
                          !this.props.dataOnly && {
                            ref: (ref: any) => (this.ref = ref),
                          })}
                        className="khulnasoft-content"
                        onClick={this.onClick}
                        khulnasoft-content-id={content?.id}
                        khulnasoft-model={this.name}
                      >
                        {this.props.children(
                          content?.data! as any,
                          this.props.inline ? false : loading,
                          useData
                        )}
                      </TagName>
                    </Tag>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        }}
      </VariantsProvider>
    );
  }
}

export const getContentWithInfo = (content?: Content) => {
  if (content) {
    const cookieValue = khulnasoft.getCookie(`khulnasoft.tests.${content.id}`);
    const cookieVariation =
      cookieValue === content.id ? content : content.variations?.[cookieValue];
    const variationName =
      cookieVariation?.name || (cookieVariation?.id === content.id ? 'Default variation' : '');

    return {
      ...content,
      variationId: cookieValue,
      testVariationId: cookieValue,
      testVariationName: variationName,
    };
  }
  return null;
};
