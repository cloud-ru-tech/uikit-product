import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';

type RechargeButtonProps = {
  onClick?(): void;
  className?: string;
};

export function RechargeButton({ onClick, className }: RechargeButtonProps) {
  const { languageCode } = useLanguage();

  return (
    <ButtonIcon
      className={className}
      variant={ButtonIcon.variants.Color}
      icon={<CircleAddInterfaceSVG />}
      onClick={onClick}
      tooltip={{ content: textProvider(languageCode, Texts.HeaderBalanceTooltipRecharge) }}
      data-test-id='header-balance-tooltip__recharge-button'
    />
  );
}
