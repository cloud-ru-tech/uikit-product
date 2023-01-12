import { ReactNode } from 'react';

import * as S from './styled';

export type ContentProps = {
  content: ReactNode;
  disableScroll?: boolean;
};

export function Content({ content, disableScroll }: ContentProps) {
  return disableScroll ? (
    <S.Content data-test-id='modal-private__content'>{content}</S.Content>
  ) : (
    <S.StyledScroll data-test-id='modal-private__content'>{content}</S.StyledScroll>
  );
}
