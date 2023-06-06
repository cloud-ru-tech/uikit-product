import { ReactElement } from 'react';

import { CommonButtonProps, extractCommonButtonProps, withTooltip } from '@sbercloud/uikit-product-button-private';

import * as S from './styled';

export type ButtonOverlayProps = CommonButtonProps & {
  icon: ReactElement;
};

function ButtonOverlayBase({ icon, className, ...rest }: ButtonOverlayProps) {
  return (
    <S.StyledButtonPrivate className={className} {...extractCommonButtonProps(rest)}>
      {icon}
    </S.StyledButtonPrivate>
  );
}

export const ButtonOverlay = withTooltip(ButtonOverlayBase);
