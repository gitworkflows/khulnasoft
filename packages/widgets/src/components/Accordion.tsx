import {
  KhulnasoftAsyncRequestsContext,
  KhulnasoftBlockComponent,
  KhulnasoftBlocks,
  KhulnasoftElement,
  KhulnasoftStoreContext,
  stringToFunction,
} from '@khulnasoft.com/react';
import * as React from 'react';

interface AccordionProps {
  items: {
    title: KhulnasoftElement[];
    detail: KhulnasoftElement[];
  }[];

  oneAtATime?: boolean;
  grid?: boolean;
  defaultOpen?: number;
  khulnasoftBlock?: KhulnasoftElement;
  // TODO: gridRowWidth
  gridRowWidth?: number;
  useChildrenForItems?: boolean;
}

// TODO: change to slick grid
export class AccordionComponent extends React.Component<AccordionProps> {
  divRef: HTMLElement | null = null;

  state = {
    open: [] as number[],
  };

  private _errors?: Error[];
  private _logs?: string[];

  componentDidMount() {
    setTimeout(() => {
      if (this.divRef) {
        this.divRef.dispatchEvent(
          new CustomEvent('khulnasoft:accordion:load', {
            bubbles: true,
            cancelable: false,
            detail: {
              ref: this,
            },
          })
        );
      }
    });
  }

  getAccordionItem(
    titleBlocks: KhulnasoftElement[],
    detailBlocks: KhulnasoftElement[],
    index: number,
    openGridItemOrder: number | null,
    onlyOneAtATime: boolean,
    fromChildren = false
  ) {
    const open = this.state.open.indexOf(index) !== -1;
    const { grid } = this.props;

    return (
      // This will not work as expected with react 15
      // Did preact get the span replacmenet too?
      <React.Fragment key={index}>
        <div
          className={`khulnasoft-accordion-title khulnasoft-accordion-title-${open ? 'open' : 'closed'}`}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            ...(grid && {
              width: this.props.gridRowWidth,
              ...(typeof openGridItemOrder === 'number' && {
                order: index < openGridItemOrder ? index : index + 1,
              }),
            }),
          }}
          data-index={index}
          onClick={() => {
            if (open) {
              this.setState({
                ...this.state,
                open: onlyOneAtATime ? [] : this.state.open.filter(item => item !== index),
              });
            } else {
              this.setState({
                ...this.state,
                open: onlyOneAtATime ? [index] : this.state.open.concat(index),
              });
            }
          }}
        >
          {fromChildren ? (
            titleBlocks.map((block, index) => (
              <KhulnasoftBlockComponent
                key={index}
                block={{
                  ...block,
                  repeat: null,
                }}
                index={index}
                child={true} /* TODO: fieldname? */
              />
            ))
          ) : (
            <KhulnasoftBlocks blocks={titleBlocks} dataPath={`items.${index}.title`} />
          )}
        </div>
        {open && (
          <div
            className={`khulnasoft-accordion-detail khulnasoft-accordion-detail-${
              open ? 'open' : 'closed'
            }`}
            style={{
              order: typeof openGridItemOrder === 'number' ? openGridItemOrder : undefined,
              ...(grid && {
                width: '100%',
              }),
            }}
          >
            {open &&
              (fromChildren ? (
                detailBlocks.map((block, index) => (
                  <KhulnasoftBlockComponent
                    key={index}
                    block={{
                      ...block,
                      repeat: null,
                    }}
                    index={index}
                    child={true} /* TODO: fieldname? */
                  />
                ))
              ) : (
                <KhulnasoftBlocks blocks={detailBlocks} dataPath={`items.${index}.detail`} />
              ))}
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { grid, oneAtATime } = this.props;

    const onlyOneAtATime = Boolean(grid || oneAtATime);

    const getOpenGridItemPosition = grid && this.state.open.length;
    let openGridItemOrder: number | null = null;
    if (getOpenGridItemPosition && this.divRef) {
      const openItemIndex = this.state.open[0];
      const openItem = this.divRef.querySelector(
        `.khulnasoft-accordion-title[data-index="${openItemIndex}"]`
      );

      let subjectItem = openItem;
      openGridItemOrder = openItemIndex;

      if (subjectItem) {
        let prevItemRect = subjectItem.getBoundingClientRect();

        while ((subjectItem = subjectItem && subjectItem.nextElementSibling)) {
          if (subjectItem) {
            if (subjectItem.classList.contains('khulnasoft-accordion-detail')) {
              continue;
            }
            const subjectItemRect = subjectItem.getBoundingClientRect();
            if (subjectItemRect.left > prevItemRect.left) {
              const index = parseInt(subjectItem.getAttribute('data-index') || '', 10);
              if (!isNaN(index)) {
                prevItemRect = subjectItemRect;
                openGridItemOrder = index;
              }
            } else {
              break;
            }
          }
        }
      }
    }

    if (typeof openGridItemOrder === 'number') {
      openGridItemOrder = openGridItemOrder + 1;
    }

    return (
      <KhulnasoftAsyncRequestsContext.Consumer>
        {value => {
          this._errors = value && value.errors;
          this._logs = value && value.logs;

          return (
            <KhulnasoftStoreContext.Consumer>
              {state => (
                <div
                  ref={ref => (this.divRef = ref)}
                  className="khulnasoft-accordion"
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    ...(grid && {
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }),
                  }}
                >
                  {/* TODO: helper static method for khulnasoft blocks to do this stuff */}
                  {this.props.useChildrenForItems
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
                              return array.map((data, index) => {
                                // TODO: Khulnasoft state produce the data
                                const childState = {
                                  ...state.state,
                                  $index: index,
                                  $item: data,
                                  [itemName]: data,
                                };

                                return (
                                  <KhulnasoftStoreContext.Provider
                                    key={block.id}
                                    value={{ ...state, state: childState } as any}
                                  >
                                    {this.getAccordionItem(
                                      block.children ? [block.children[0]] : [],
                                      block.children ? [block.children[1]] : [],
                                      index,
                                      openGridItemOrder,
                                      onlyOneAtATime,
                                      true
                                    )}
                                  </KhulnasoftStoreContext.Provider>
                                );
                              });
                            }
                          }
                          return this.getAccordionItem(
                            block.children ? [block.children[0]] : [],
                            block.children ? [block.children[1]] : [],
                            index,
                            openGridItemOrder,
                            onlyOneAtATime,
                            true
                          );
                        }
                      )
                    : this.props.items &&
                      this.props.items.map((item, index) => {
                        return this.getAccordionItem(
                          item.title,
                          item.detail,
                          index,
                          openGridItemOrder,
                          onlyOneAtATime
                        );
                      })}
                </div>
              )}
            </KhulnasoftStoreContext.Consumer>
          );
        }}
      </KhulnasoftAsyncRequestsContext.Consumer>
    );
  }
}
