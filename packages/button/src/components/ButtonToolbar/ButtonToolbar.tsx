import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithRequiredTooltip } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonPropsWithRequiredTooltip & {
  icon: ReactElement;
};

export const ButtonToolbarBase = forwardRef<HTMLButtonElement, ButtonToolbarProps>(({ icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.Button>
));

export const ButtonToolbar = withTooltip(ButtonToolbarBase);
