import { ReactNode } from 'react';

import * as S from './styled';

export type ContentProps = {
  content: ReactNode;
};

export function Content({ content }: ContentProps) {
  return <S.StyledScroll data-test-id='modal-private__content'>{content}</S.StyledScroll>;
}
