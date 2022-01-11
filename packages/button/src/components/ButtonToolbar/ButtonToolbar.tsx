import { cx } from '@linaria/core';
import { ReactElement } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithOptionalTooltip } from '../../types';
import * as S from './styled';

export type ButtonToolbarProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
};

export const ButtonToolbarBase = ({ icon, className, ...rest }: ButtonToolbarProps) => (
  <BaseButton className={cx(S.buttonToolbarClassName, className)} {...extractCommonButtonProps(rest)}>
    {icon}
  </BaseButton>
);

export const ButtonToolbar = withTooltip(ButtonToolbarBase);
