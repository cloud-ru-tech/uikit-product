import { ReactElement } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ReactElement;
};

const ButtonOverlayBase = ({ icon, className, ...rest }: ButtonOverlayProps) => (
  <S.StyledBaseButton className={className} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.StyledBaseButton>
);

export const ButtonOverlay = withTooltip(ButtonOverlayBase);
