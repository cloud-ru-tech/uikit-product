import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonPrimaryVariant, ButtonSecondaryVariant } from '@cloud-ru/uikit-product-page-layout';

export function useGetButtonLabel() {
  const { t } = useLocale('MobileLayout');

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(variant);
  };
}
