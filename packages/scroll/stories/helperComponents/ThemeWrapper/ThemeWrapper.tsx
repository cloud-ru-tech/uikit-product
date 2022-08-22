import { cx } from '@linaria/core';
import { ReactNode } from 'react';

import { Variants } from '../../../src/components/constants';
import * as S from './styled';

type WrapperProps = {
  children: ReactNode;
  showWrapperPadding: boolean;
  variant?: Variants;
  flexbox?: boolean;
};

export const ThemeWrapper = ({
  children,
  showWrapperPadding,
  variant = Variants.Primary,
  flexbox = false,
}: WrapperProps) => (
  <S.Wrapper
    data-variant={variant}
    className={cx(flexbox && S.flexboxWrapperClassname, showWrapperPadding && S.paddingWrapperClassname)}
  >
    {children}
  </S.Wrapper>
);
