import { cx } from '@linaria/core';
import { ReactElement } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithRequiredTooltip } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonPropsWithRequiredTooltip & {
  icon: ReactElement;
};

export const ButtonToolbarBase = ({ icon, className, ...rest }: ButtonToolbarProps) => (
  <BaseButton className={cx(S.buttonToolbarClassName, className)} {...extractCommonButtonProps(rest)}>
    {icon}
  </BaseButton>
);

export const ButtonToolbar = withTooltip(ButtonToolbarBase);
