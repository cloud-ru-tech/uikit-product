import { MouseEventHandler } from 'react';

import { EyeClosedSVG, EyeSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

type EyeButtonType = {
  dataVisible: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function EyeButton({ onClick, dataVisible }: EyeButtonType) {
  const { t } = useLocale('Header');

  const icon = dataVisible ? <EyeClosedSVG /> : <EyeSVG />;
  const tip = t(dataVisible ? 'financialMenuEyeButtonDataVisibleTip' : 'financialMenuEyeButtonDataHiddenTip');

  return (
    <Tooltip tip={tip} placement='top'>
      <ButtonFunction size='xs' icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
