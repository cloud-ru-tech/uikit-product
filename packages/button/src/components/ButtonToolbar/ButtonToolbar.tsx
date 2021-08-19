import { ComponentType, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonProps & {
  icon: ComponentType;
};

export const ButtonToolbar = forwardRef<HTMLButtonElement, ButtonToolbarProps>(({ icon: Icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    <Icon />
  </S.Button>
));
