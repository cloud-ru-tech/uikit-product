import { ReactElement } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithOptionalTooltip } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
};

export const ButtonToolbarBase = ({ icon, className, ...rest }: ButtonToolbarProps) => (
  <S.StyledBaseButton className={className} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.StyledBaseButton>
);

export const ButtonToolbar = withTooltip(ButtonToolbarBase);
