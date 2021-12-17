import { cx } from '@linaria/core';
import { ReactElement } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ReactElement;
};

const ButtonOverlayBase = ({ icon, className, ...rest }: ButtonOverlayProps) => (
  <BaseButton className={cx(S.buttonOverlayClassName, className)} {...extractCommonButtonProps(rest)}>
    {icon}
  </BaseButton>
);

export const ButtonOverlay = withTooltip(ButtonOverlayBase);
