import { useForceUpdateOnPageLoadedCompletely } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type HighlighterProps = {
  left: number;
  width: number;
};

export function Highlighter({ left, width }: HighlighterProps) {
  useForceUpdateOnPageLoadedCompletely();

  return <S.SelectedHighlighter data-test-id={'`tab__navigation-list__active-mark`'} left={left} width={width} />;
}
