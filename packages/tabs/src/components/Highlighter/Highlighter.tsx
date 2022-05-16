import { useForceUpdateOnPageLoadedCompletely } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type HighlighterProps = {
  container: HTMLElement;
  selectedTab: HTMLElement;
};

export function Highlighter({ container, selectedTab }: HighlighterProps) {
  useForceUpdateOnPageLoadedCompletely();

  const left = selectedTab.getBoundingClientRect().left - container.getBoundingClientRect().left;
  const width = selectedTab.getBoundingClientRect().width;

  return <S.SelectedHighlighter data-test-id={'`tab__navigation-list__active-mark`'} left={left} width={width} />;
}
