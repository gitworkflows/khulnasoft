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
import Slider, { ResponsiveObject, Settings } from 'react-slick';

type KhulnasoftBlockType = KhulnasoftElement;

interface CarouselProps {
  slides: Array<
    React.ReactNode | { content: KhulnasoftBlockType[] } /* KhulnasoftBlock <- export this type */
  >;
  khulnasoftBlock: KhulnasoftBlockType;
  nextButton?: KhulnasoftBlockType[];
  prevButton?: KhulnasoftBlockType[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  hideDots?: boolean;
  useChildrenForSlides?: boolean;
  slickProps?: Settings;
  responsive?: ResponsiveObject[];
}

// TODO: change to slick grid
export class CarouselComponent extends React.Component<CarouselProps> {
  divRef = React.createRef<HTMLDivElement>();
  sliderRef = React.createRef<Slider>();

  private _errors?: Error[];
  private _logs?: string[];

  componentDidMount() {
    setTimeout(() => {
      this.divRef.current?.dispatchEvent(
        new CustomEvent('khulnasoft:carousel:load', {
          bubbles: true,
          cancelable: false,
          detail: {
            block: this.props.khulnasoftBlock,
            carousel: this.sliderRef.current,
          },
        })
      );
    });
  }

  render() {
    let slides = this.props.slides;

    if (slides && !Khulnasoft.isBrowser) {
      slides = slides.slice(0, 1);
    }

    return (
      <KhulnasoftAsyncRequestsContext.Consumer>
        {value => {
          this._errors = value && value.errors;
          this._logs = value && value.logs;

          return (
            <KhulnasoftStoreContext.Consumer>
              {state => (
                <div ref={this.divRef} className="khulnasoft-carousel">
                  {/* Strange encoding issue workaround... */}
                  {Khulnasoft.isServer ? (
                    <style
                      type="text/css"
                      dangerouslySetInnerHTML={{ __html: slickStyles }}
                    ></style>
                  ) : (
                    <style type="text/css">{slickStyles}</style>
                  )}
                  <Slider
                    responsive={this.props.responsive}
                    ref={this.sliderRef}
                    afterChange={slide => {
                      // TODO; callbacks
                      if (this.divRef) {
                        this.divRef.current?.dispatchEvent(
                          new CustomEvent('khulnasoft:carousel:change', {
                            bubbles: true,
                            cancelable: false,
                            detail: {
                              slide,
                              block: this.props.khulnasoftBlock,
                              carousel: this.sliderRef.current,
                            },
                          })
                        );
                      }
                    }}
                    autoplay={this.props.autoplay}
                    autoplaySpeed={
                      this.props.autoplaySpeed ? this.props.autoplaySpeed * 1000 : undefined
                    }
                    dots={!this.props.hideDots}
                    // TODO: on change emit event on element?
                    // renderBottomCenterControls={this.props.hideDots ? () => null : undefined}

                    // OOF!!
                    nextArrow={
                      <div>
                        <KhulnasoftBlocks
                          parentElementId={this.props.khulnasoftBlock.id}
                          dataPath="component.options.prevButton"
                          blocks={this.props.prevButton}
                        />
                      </div>
                    }
                    // OOF!!
                    prevArrow={
                      <div>
                        <KhulnasoftBlocks
                          parentElementId={this.props.khulnasoftBlock.id}
                          dataPath="component.options.nextButton"
                          blocks={this.props.nextButton}
                        />
                      </div>
                    }
                    {...this.props.slickProps}
                  >
                    {/* todo: children.forEach hmm insert block inside */}
                    {this.props.useChildrenForSlides
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
                                    [itemName]: data,
                                    $index: index,
                                    $item: data,
                                  };

                                  return (
                                    <KhulnasoftStoreContext.Provider
                                      key={block.id}
                                      value={{ ...state, state: childState } as any}
                                    >
                                      <KhulnasoftBlockComponent
                                        block={{
                                          ...block,
                                          repeat: null,
                                        }}
                                        index={index}
                                        child /* TODO: fieldname? */
                                      />
                                    </KhulnasoftStoreContext.Provider>
                                  );
                                });
                              }
                            }
                            return (
                              <KhulnasoftBlockComponent
                                key={block.id}
                                block={block}
                                index={index}
                                child /* TODO: fieldname? */
                              />
                            );
                          }
                        )
                      : this.props.slides &&
                        this.props.slides.map((slide, index) => (
                          // TODO: how make react compatible with plain react components
                          // slides: <Foo><Bar> <- khulnasoft blocks if passed react nodes as blocks just forward them
                          <React.Fragment key={index}>
                            <KhulnasoftBlocks
                              parentElementId={this.props.khulnasoftBlock && this.props.khulnasoftBlock.id}
                              dataPath={`component.options.slides.${index}.content`}
                              child
                              blocks={(slide as any).content || slide}
                            />
                          </React.Fragment>
                        ))}
                  </Slider>
                </div>
              )}
            </KhulnasoftStoreContext.Consumer>
          );
        }}
      </KhulnasoftAsyncRequestsContext.Consumer>
    );
  }
}

const slickStyles = `@charset 'UTF-8';

.khulnasoft-carousel .slick-list,
.khulnasoft-carousel .slick-slider,
.khulnasoft-carousel .slick-track {
  position: relative;
  display: block
}

.khulnasoft-carousel .slick-loading .slick-slide,
.khulnasoft-carousel .slick-loading .slick-track {
  visibility: hidden
}

.khulnasoft-carousel .slick-slider {
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent
}

.khulnasoft-carousel .slick-list {
  overflow: hidden;
  margin: 0;
  padding: 0
}

.khulnasoft-carousel .slick-list:focus {
  outline: 0
}

.khulnasoft-carousel .slick-list.dragging {
  cursor: pointer;
  cursor: hand
}

.khulnasoft-carousel .slick-slider .slick-list,
.khulnasoft-carousel .slick-slider .slick-track {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0)
}

.khulnasoft-carousel .slick-track {
  top: 0;
  left: 0
}

.khulnasoft-carousel .slick-track:after,
.khulnasoft-carousel .slick-track:before {
  display: table;
  content: ''
}

.khulnasoft-carousel .slick-track:after {
  clear: both
}

.khulnasoft-carousel .slick-slide {
  display: none;
  float: left;
  height: auto;
  min-height: 1px
}

.khulnasoft-carousel [dir=rtl] .slick-slide {
  float: right
}

.khulnasoft-carousel .slick-slide img {
  display: block
}

.khulnasoft-carousel .slick-slide.slick-loading img {
  display: none
}

.khulnasoft-carousel .slick-slide.dragging img {
  pointer-events: none
}

.khulnasoft-carousel .slick-initialized .slick-slide {
  display: block
}

.khulnasoft-carousel .slick-vertical .slick-slide {
  display: block;
  height: auto;
  border: 1px solid transparent
}

.khulnasoft-carousel .slick-arrow.slick-hidden {
  display: none
}

.khulnasoft-carousel .slick-dots,
.khulnasoft-carousel .slick-next,
.khulnasoft-carousel .slick-prev {
  position: absolute;
  display: block;
  padding: 0
}

.khulnasoft-carousel .slick-dots li button:before,
.khulnasoft-carousel .slick-next:before,
.khulnasoft-carousel .slick-prev:before {
  font-family: slick;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}

.khulnasoft-carousel .slick-loading .slick-list {
  background: url(ajax-loader.gif) center center no-repeat #fff
}

@font-face {
  font-display: swap;
  font-family: slick;
  font-weight: 400;
  font-style: normal;
  src: url(https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.eot);
  src: local("slick"), url(https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.eot?#iefix) format('embedded-opentype'), url(https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.woff) format('woff'), url(https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.ttf) format('truetype'), url(https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.svg#slick) format('svg')
}

.khulnasoft-carousel .slick-next,
.khulnasoft-carousel .slick-prev {
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: 0;
  background: 0 0
}

.khulnasoft-carousel .slick-next:focus,
.khulnasoft-carousel .slick-next:hover,
.khulnasoft-carousel .slick-prev:focus,
.khulnasoft-carousel .slick-prev:hover {
  color: transparent;
  outline: 0;
  background: 0 0
}

.khulnasoft-carousel .slick-next:focus:before,
.khulnasoft-carousel .slick-next:hover:before,
.khulnasoft-carousel .slick-prev:focus:before,
.khulnasoft-carousel .slick-prev:hover:before {
  opacity: 1
}

.khulnasoft-carousel .slick-next.slick-disabled:before,
.khulnasoft-carousel .slick-prev.slick-disabled:before {
  opacity: .25
}

.khulnasoft-carousel .slick-next:before,
.khulnasoft-carousel .slick-prev:before {
  font-size: 20px;
  line-height: 1;
  opacity: .75;
  color: #fff
}

.khulnasoft-carousel .slick-prev {
  left: -25px
}

.khulnasoft-carousel [dir=rtl] .slick-prev {
  right: -25px;
  left: auto
}

.khulnasoft-carousel .slick-prev:before {
  content: ''
}

.khulnasoft-carousel .slick-next:before,
.khulnasoft-carousel [dir=rtl] .slick-prev:before {
  content: ''
}

.khulnasoft-carousel .slick-next {
  right: -25px
}

.khulnasoft-carousel [dir=rtl] .slick-next {
  right: auto;
  left: -25px
}

.khulnasoft-carousel [dir=rtl] .slick-next:before {
  content: '•'
}

.khulnasoft-carousel .slick-dotted.slick-slider {
  margin-bottom: 30px
}

.khulnasoft-carousel .slick-dots {
  bottom: -25px;
  width: 100%;
  margin: 0;
  list-style: none;
  text-align: center
}

.khulnasoft-carousel .slick-dots li {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  padding: 0;
  cursor: pointer
}

.khulnasoft-carousel .slick-dots li button {
  font-size: 0;
  line-height: 0;
  display: block;
  width: 20px;
  height: 20px;
  padding: 5px;
  cursor: pointer;
  color: transparent;
  border: 0;
  outline: 0;
  background: 0 0
}

.khulnasoft-carousel .slick-dots li button:focus,
.khulnasoft-carousel .slick-dots li button:hover {
  outline: 0
}

.khulnasoft-carousel .slick-dots li button:focus:before,
.khulnasoft-carousel .slick-dots li button:hover:before {
  opacity: 1
}

.khulnasoft-carousel .slick-dots li button:before {
  font-size: 6px;
  line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  content: '•';
  text-align: center;
  opacity: .25;
  color: #000
}

.khulnasoft-carousel .slick-dots li.slick-active button:before {
  opacity: .75;
  color: #000
}

.khulnasoft-carousel img {
  pointer-events: none
}
`;
