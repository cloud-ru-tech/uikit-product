import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ReactElement;
};

const ButtonOverlayBase = forwardRef<HTMLButtonElement, ButtonOverlayProps>(({ icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.Button>
));

export const ButtonOverlay = withTooltip(ButtonOverlayBase);
