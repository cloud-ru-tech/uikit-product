import { ReactElement, useCallback, useMemo, useRef, useState } from 'react';

import { extractSupportProps, useComponentSize, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TooltipsSettings } from '../../types';
import { ArrowsNavigation, DotsNavigation } from '../Navigation';
import { CarouselItem, CarouselWrap, HeaderWrap, InnerContainer, WrapperContainer } from './styled';

export type CarouselProps = {
  items: ReactElement[];
  withArrows?: boolean;
  carouselTitle?: ReactElement | string;
  className?: string;
  prevButtonTooltips?: TooltipsSettings;
  nextButtonTooltips?: TooltipsSettings;
};

export enum ActionTypes {
  Incr = 'incr',
  Decr = 'decr',
}

export function Carousel({
  items,
  carouselTitle,
  withArrows = true,
  className,
  prevButtonTooltips,
  nextButtonTooltips,
  ...restProps
}: WithSupportProps<CarouselProps>) {
  const [idx, setIdx] = useState(0);

  const heightRef = useRef<null | HTMLDivElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);

  const withHeader = withArrows || carouselTitle;

  const { height } = useComponentSize(heightRef);
  const { width } = useComponentSize(containerRef);

  const handleDotClick = useCallback((value: number) => {
    setIdx(value);
  }, []);

  const handleArrowClick = (action: ActionTypes) => {
    switch (action) {
      case ActionTypes.Decr:
        setIdx(idx - 1);
        break;
      case ActionTypes.Incr:
        setIdx(idx + 1);
        break;
      default:
        break;
    }
  };

  return (
    <CarouselWrap className={className} ref={containerRef} {...extractSupportProps(restProps)}>
      {withHeader && (
        <HeaderWrap>
          <div>{carouselTitle}</div>
          {withArrows && (
            <ArrowsNavigation
              prevButtonTooltips={prevButtonTooltips}
              nextButtonTooltips={nextButtonTooltips}
              idx={idx}
              itemsAmount={items.length}
              onArrowClick={handleArrowClick}
            />
          )}
        </HeaderWrap>
      )}
      <WrapperContainer height={height}>
        <InnerContainer
          data-test-id='carousel__container'
          ref={heightRef}
          width={width * idx}
          containerWidth={width * items.length}
        >
          {useMemo(
            () =>
              items.map((item, idx) => (
                <CarouselItem data-test-id='carousel__item' key={idx} width={width}>
                  {item}
                </CarouselItem>
              )),
            [items, width],
          )}
        </InnerContainer>
      </WrapperContainer>
      <DotsNavigation currentIdx={idx} onDotClick={handleDotClick} dotsAmount={items.length} />
    </CarouselWrap>
  );
}
