import { ReactNode } from 'react';

import { Variant } from '../../../src/components/constants';
import * as S from './styled';

type WrapperProps = {
  children: ReactNode;
  variant?: Variant;
};

export const ThemeWrapper = ({ children, variant = Variant.Primary }: WrapperProps) => (
  <S.Wrapper data-variant={variant}>{children}</S.Wrapper>
);
