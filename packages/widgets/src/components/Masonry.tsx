import {
  Khulnasoft,
  KhulnasoftAsyncRequestsContext,
  KhulnasoftBlockComponent,
  KhulnasoftBlocks,
  KhulnasoftElement,
  KhulnasoftStoreContext,
  stringToFunction,
} from '@khulnasoft.com/react';
import * as React from 'react';
import Masonry from 'react-masonry-component';

type KhulnasoftBlockType = KhulnasoftElement;

interface MasonryProps {
  tiles: Array<
    React.ReactNode | { content: KhulnasoftBlockType[] } /* KhulnasoftBlock <- export this type */
  >;
  khulnasoftBlock: KhulnasoftBlockType;
  useChildrenForTiles?: boolean;
  gutterSize?: string;
  columnWidth?: string;
}

// TODO: column with, gutter, etc options
export class MasonryComponent extends React.Component<MasonryProps> {
  divRef: HTMLElement | null = null;
  masonryRef: React.Component<Masonry.MasonryPropTypes> | null = null;

  private _errors?: Error[];
  private _logs?: string[];

  state = {
    layoutComplete: false,
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.divRef) {
        this.divRef.dispatchEvent(
          new CustomEvent('khulnasoft:masonry:load', {
            bubbles: true,
            cancelable: false,
            detail: {
              block: this.props.khulnasoftBlock,
              ref: this.divRef,
              masonry: this.masonryRef,
            },
          })
        );
      }

      if (Khulnasoft.isEditing) {
        // mutation observer?
      }
    });
  }

  render() {
    let slides = this.props.tiles;

    // if (slides && !Khulnasoft.isBrowser) {
    //   slides = slides.slice(0, 1)
    // }

    const itemStyle: any = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: this.props.columnWidth,
    };

    return (
      <div
        style={{
          opacity: Khulnasoft.isBrowser && this.state.layoutComplete ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <KhulnasoftAsyncRequestsContext.Consumer>
          {value => {
            this._errors = value && value.errors;
            this._logs = value && value.logs;

            return (
              <KhulnasoftStoreContext.Consumer>
                {state => (
                  <div ref={ref => (this.divRef = ref)} className="khulnasoft-masonry">
                    <Masonry
                      onLayoutComplete={() => {
                        if (!this.state.layoutComplete) {
                          this.setState({
                            ...this.state,
                            layoutComplete: true,
                          });
                        }
                      }}
                      options={{
                        gutter: this.props.gutterSize,
                        // Maybe us this
                        fitWidth:
                          this.props.columnWidth && this.props.columnWidth.endsWith('%')
                            ? false
                            : true,
                        percentPosition:
                          // TODO: option to override this too
                          (this.props.columnWidth &&
                            (this.props.columnWidth.endsWith('%') ||
                              this.props.columnWidth.startsWith('.'))) ||
                          false,
                      }}
                      ref={ref => (this.masonryRef = ref)}
                    >
                      {/* todo: children.forEach hmm insert block inside */}
                      {this.props.useChildrenForTiles
                        ? this.props.khulnasoftBlock &&
                          this.props.khulnasoftBlock.children &&
                          this.props.khulnasoftBlock.children.map(
                            (block: KhulnasoftElement, index: number) => {
                              if (block.repeat && block.repeat.collection) {
                                const collectionPath = block.repeat.collection;
                                const collectionName = (collectionPath || '')
                                  .split(/\.\w+\(/)[0]
                                  .trim()
                                  .split('.')
                                  .pop();
                                const itemName =
                                  block.repeat.itemName ||
                                  (collectionName ? collectionName + 'Item' : 'item');

                                let array: any[] | void = stringToFunction(
                                  collectionPath,
                                  true,
                                  this._errors,
                                  this._logs
                                )(state.state);

                                if (Array.isArray(array)) {
                                  if (!Khulnasoft.isBrowser) {
                                    array = array.slice(0, 1);
                                  }

                                  return array.map((data, index) => {
                                    // TODO: Khulnasoft state produce the data
                                    const childState = {
                                      ...state.state,
                                      $index: index,
                                      $item: data,
                                      [itemName]: data,
                                    };

                                    return (
                                      <div className="masonry-item" style={itemStyle}>
                                        <KhulnasoftStoreContext.Provider
                                          key={block.id}
                                          value={
                                            {
                                              ...state,
                                              state: childState,
                                            } as any
                                          }
                                        >
                                          <KhulnasoftBlockComponent
                                            block={{
                                              ...block,
                                              repeat: null,
                                            }}
                                            index={index}
                                            child={true} /* TODO: fieldname? */
                                          />
                                        </KhulnasoftStoreContext.Provider>
                                      </div>
                                    );
                                  });
                                }
                              }
                              return (
                                <div style={itemStyle} className="masonry-item">
                                  <KhulnasoftBlockComponent
                                    key={block.id}
                                    block={block}
                                    index={index}
                                    child={true} /* TODO: fieldname? */
                                  />
                                </div>
                              );
                            }
                          )
                        : this.props.tiles &&
                          this.props.tiles.map((tile, index) => (
                            // TODO: how make react compatible with plain react components
                            // tiles: <Foo><Bar> <- khulnasoft blocks if passed react nodes as blocks just forward them
                            <div style={itemStyle} className="masonry-item">
                              <KhulnasoftBlocks
                                key={index}
                                parentElementId={
                                  this.props.khulnasoftBlock && this.props.khulnasoftBlock.id
                                }
                                dataPath={`component.options.tiles.${index}.content`}
                                child
                                blocks={(tile as any).content || tile}
                              />
                            </div>
                          ))}
                    </Masonry>
                  </div>
                )}
              </KhulnasoftStoreContext.Consumer>
            );
          }}
        </KhulnasoftAsyncRequestsContext.Consumer>
      </div>
    );
  }
}
