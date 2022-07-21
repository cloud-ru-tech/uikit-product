import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { Content, Wrapper } from './styled';

type HeaderBalanceTooltipFoldableProps = {
  open: boolean;
  children: ReactNode;
  fallback: ReactNode;
};

export function HeaderBalanceTooltipFoldable({ open, children, fallback }: HeaderBalanceTooltipFoldableProps) {
  const [childrenWidth, setChildrenWidth] = useState<string | number>('auto');
  const [fallbackWidth, setFallbackWidth] = useState<string | number>('auto');
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const isChildrenContentVisible = open || isAnimationInProgress;

  function getContentWidth(content: HTMLElement) {
    return content.getBoundingClientRect().width;
  }

  function setChildrenContent(content: HTMLElement | null) {
    if (content !== null) {
      setChildrenWidth(getContentWidth(content));
    }
  }

  function setFallbackContent(content: HTMLElement | null) {
    if (content !== null) {
      setFallbackWidth(getContentWidth(content));
    }
  }

  useLayoutEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );

  useLayoutEffect(() => {
    if (isAnimationInProgress) {
      return;
    }

    const wrapper = wrapperRef.current as HTMLElement;
    const animations = wrapper.getAnimations();

    if (animations.length === 0) {
      return;
    }

    setIsAnimationInProgress(true);
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (isMountedRef.current) {
        setIsAnimationInProgress(false);
      }
    });
  }, [isAnimationInProgress, open]);

  return (
    <Wrapper width={open ? childrenWidth : fallbackWidth} ref={wrapperRef}>
      <Content data-hidden={!isChildrenContentVisible || undefined} ref={setChildrenContent}>
        {children}
      </Content>
      <Content data-hidden={isChildrenContentVisible || undefined} ref={setFallbackContent}>
        {fallback}
      </Content>
    </Wrapper>
  );
}
