import { ComponentType, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ComponentType;
};

export const ButtonOverlay = forwardRef<HTMLButtonElement, ButtonOverlayProps>(({ icon: Icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    <Icon />
  </S.Button>
));
