import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileModal } from '@cloud-ru/uikit-product-mobile-modal';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { QuotaWidgetPropsBase } from '../../types';

export type QuotaWidgetMobileProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Флаг открытия модального окна */
    isOpen: boolean;
    /** Колбек на закрытие модального окна */
    onClose: () => void;
  }
>;

export function QuotaWidgetMobile({
  quotas,
  disableSorting,
  isLoading,
  isError,
  onRefresh,
  projectName,
  canEditQuota,
  isOpen,
  onClose,
  onIncreaseQuotaClick,
  hideIncreaseQuotaButton,
  ...props
}: QuotaWidgetMobileProps) {
  const { t } = useLocale('Quota');

  return (
    // @ts-expect-error no approve button needed
    <MobileModal
      {...props}
      closeButtonEnabled
      open={isOpen}
      onClose={onClose}
      title={t('quotas')}
      subtitle={projectName}
      cancelButton={
        isError || !canEditQuota || hideIncreaseQuotaButton
          ? undefined
          : {
              appearance: 'neutral',
              label: t('increaseQuota'),
              onClick: onIncreaseQuotaClick,
            }
      }
      content={
        <QuotaCardsGrid
          quotas={quotas}
          disableSorting={disableSorting}
          isLoading={isLoading}
          isError={isError}
          onRefresh={onRefresh}
          isMobile
        />
      }
    />
  );
}
