import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonPrimaryVariant, ButtonSecondaryVariant } from '@sbercloud/uikit-product-page-layout';

export function useGetButtonLabel() {
  const { t } = useLocale('MobileLayout');

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(variant);
  };
}
