import { ReactNode, useEffect, useState } from 'react';
import useTransition from 'react-transition-state';

import { useForceUpdateOnPageLoadedCompletely } from '@sbercloud/uikit-product-utils';

import { TRANSITION_DURATION } from './constants';
import * as S from './styled';

export type HeaderBalanceTooltipFoldableProps = {
  open: boolean;
  children: ReactNode;
  fallback: ReactNode;
};

export function HeaderBalanceTooltipFoldable({ open, children, fallback }: HeaderBalanceTooltipFoldableProps) {
  const [childrenWidth, setChildrenWidth] = useState<string | number>('auto');
  const [fallbackWidth, setFallbackWidth] = useState<string | number>('auto');
  const [state, toggle] = useTransition({ initialEntered: open, timeout: TRANSITION_DURATION });
  const isChildrenVisible = state.isEnter || !state.isResolved;

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

  useForceUpdateOnPageLoadedCompletely();
  useEffect(() => toggle(open), [open]);

  return (
    <S.Wrapper width={open ? childrenWidth : fallbackWidth}>
      <S.Content data-hidden={!isChildrenVisible || undefined} ref={setChildrenContent}>
        {children}
      </S.Content>
      <S.Content data-hidden={isChildrenVisible || undefined} ref={setFallbackContent}>
        {fallback}
      </S.Content>
    </S.Wrapper>
  );
}
