import { ReactElement, useContext, useEffect, useRef, WheelEventHandler } from 'react';

import { useForceUpdate, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TabContext } from '../../helpers/context';
import { Highlighter } from '../Highlighter';
import { NavigationItemProps } from '../NavigationItem';
import * as S from './styled';

export type NavigationListProps = WithSupportProps<{
  children: ReactElement<NavigationItemProps>[];
  className?: string;
}>;

export function NavigationList({ children, className, ...rest }: NavigationListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { selectedTabRef, size, setTabsWrapperRef } = useContext(TabContext);
  const forceUpdate = useForceUpdate();
  const isLeftShadow = containerRef?.current?.scrollLeft !== 0;
  const isRightShadow =
    containerRef?.current &&
    Math.ceil(containerRef.current.scrollLeft) !== containerRef.current.scrollWidth - containerRef.current.clientWidth;
  const selectedTabLeft = (selectedTabRef?.current && selectedTabRef.current.offsetLeft) || 0;
  const selectedTabWidth = (selectedTabRef?.current && selectedTabRef.current.getBoundingClientRect().width) || 0;

  useEffect(() => {
    setTabsWrapperRef(containerRef);
  }, [containerRef, setTabsWrapperRef]);

  const wheelHandler: WheelEventHandler<HTMLDivElement> = e => {
    if (containerRef?.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollLeft + e.deltaY;
    }
  };

  const scrollHandler = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      forceUpdate();
    }, 100);
  };

  return (
    <S.RelContainer className={className} {...rest}>
      <S.GroupStyledContainer ref={containerRef} onWheel={wheelHandler} onScroll={scrollHandler}>
        <S.GroupStyled data-size={size} data-test-id={'tabs__navigation-list'}>
          {children}
        </S.GroupStyled>
        {containerRef?.current && selectedTabRef?.current && (
          <Highlighter left={selectedTabLeft} width={selectedTabWidth} />
        )}
      </S.GroupStyledContainer>
      <S.LeftShadowBox data-active={isLeftShadow} />
      <S.RightShadowBox data-active={isRightShadow} />
    </S.RelContainer>
  );
}
