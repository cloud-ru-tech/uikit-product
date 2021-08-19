import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonProps & {
  icon: ReactElement;
};

export const ButtonToolbar = forwardRef<HTMLButtonElement, ButtonToolbarProps>(({ icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.Button>
));
