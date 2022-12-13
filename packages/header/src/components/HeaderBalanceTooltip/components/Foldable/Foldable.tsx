import { ReactNode, useEffect, useState } from 'react';
import useTransition from 'react-transition-state';

import { useForceUpdateOnPageLoadedCompletely } from '@sbercloud/uikit-product-utils';

import { TRANSITION_DURATION } from './constants';
import * as S from './styled';

export type FoldableProps = {
  open: boolean;
  children: ReactNode;
  fallback: ReactNode;
  onOpen(): void;
  onClose(): void;
};

export function Foldable({ open, children, fallback, onOpen, onClose }: FoldableProps) {
  const [childrenWidth, setChildrenWidth] = useState<string | number>('auto');
  const [fallbackWidth, setFallbackWidth] = useState<string | number>('auto');
  const [state, toggle] = useTransition({
    initialEntered: open,
    timeout: TRANSITION_DURATION,
    onStateChange(event) {
      if (event.current.status === 'entering') {
        onOpen();
        return;
      }

      if (event.current.status === 'exited') {
        onClose();
        return;
      }
    },
  });

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
