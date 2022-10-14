import { cx } from '@linaria/core';
import { ReactNode } from 'react';

import * as S from './styled';

type WrapperProps = {
  children: ReactNode;
  flexbox?: boolean;
};

export const Wrapper = ({ children, flexbox = false }: WrapperProps) => (
  <S.Wrapper className={cx(flexbox && S.flexboxWrapperClassname)}>{children}</S.Wrapper>
);
