import { MouseEventHandler } from 'react';

import { EyeClosedSVG, EyeSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { textProvider, Texts } from '../../../../helpers';

type EyeButtonType = {
  dataVisible: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function EyeButton({ onClick, dataVisible }: EyeButtonType) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const icon = dataVisible ? <EyeClosedSVG /> : <EyeSVG />;
  const tip = textProvider(
    languageCode,
    dataVisible ? Texts.FinancialMenuEyeButtonDavaVisibleTip : Texts.FinancialMenuEyeButtonDataHiddenTip,
  );

  return (
    <Tooltip tip={tip} placement='top'>
      <ButtonFunction size='xs' icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
