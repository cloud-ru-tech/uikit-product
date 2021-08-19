import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ReactElement;
};

export const ButtonOverlay = forwardRef<HTMLButtonElement, ButtonOverlayProps>(({ icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.Button>
));
