import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { useContainerWidth } from '../../hooks/useContainerWidth';
import { ArrowsNavigation, DotsNavigation } from '../Navigation';
import { CarouselItem, CarouselWrap, HeaderWrap, InnerContainer, WrapperContainer } from './styled';

export type CarouselProps = {
  items: ReactElement[];
  withArrows?: boolean;
  carouselTitle?: ReactElement | string;
  className?: string;
  tooltipContent?: string;
  disabledTooltipContent?: string;
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
  tooltipContent,
  disabledTooltipContent,
  ...restProps
}: WithSupportProps<CarouselProps>) {
  const [idx, setIdx] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const heightRef = useRef<null | HTMLDivElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);

  const withHeader = withArrows || carouselTitle;
  const width = useContainerWidth(containerRef);

  useEffect(() => {
    if (heightRef.current) {
      setCardHeight(heightRef.current?.offsetHeight);
    }
  }, []);

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
    }
  };

  return (
    <CarouselWrap className={className} ref={containerRef} {...extractSupportProps(restProps)}>
      {withHeader && (
        <HeaderWrap>
          <div>{carouselTitle}</div>
          {withArrows && (
            <ArrowsNavigation
              tooltipContent={tooltipContent}
              disabledTooltipContent={disabledTooltipContent}
              idx={idx}
              itemsAmount={items.length}
              onArrowClick={handleArrowClick}
            />
          )}
        </HeaderWrap>
      )}
      <WrapperContainer height={cardHeight}>
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
