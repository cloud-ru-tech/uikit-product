import { useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { Dropdown } from '@snack-uikit/dropdown';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';

import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { QuotaWidgetPropsBase } from '../../types';
import { ProjectHeader } from './components/ProjectHeader';
import styles from './styles.module.scss';

export type QuotaWidgetProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Ссылка на страницу квот по проекту */
    quotasUrl: string;
    /** Колбек клика по ссылке на страницу квот по проекту */
    onQuotasUrlClick?: () => void;
    /** Свойства кнопки открытия виджета */
    buttonProps?: Pick<ButtonFunctionProps, 'size' | 'className' | 'fullWidth' | 'label' | 'appearance' | 'disabled'>;
  }
>;

export function QuotaWidget({
  quotas,
  disableSorting,
  isLoading,
  isError,
  onRefresh,
  projectName,
  quotasUrl,
  canEditQuota,
  hideIncreaseQuotaButton,
  onIncreaseQuotaClick,
  onWidgetOpen,
  onQuotasUrlClick,
  buttonProps,
  ...props
}: QuotaWidgetProps) {
  const { t } = useLocale('Quota');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      onWidgetOpen?.();
    }
  };

  const exhaustedCount = quotas.filter(item => item.remains === 0).length;

  return (
    <Dropdown
      {...props}
      placement='bottom-end'
      open={isOpen}
      onOpenChange={handleOpenChange}
      content={
        <div className={styles.content}>
          <ProjectHeader
            projectName={projectName}
            quotasUrl={quotasUrl}
            canEditQuota={canEditQuota}
            isError={isError}
            onIncreaseQuotaClick={onIncreaseQuotaClick}
            hideIncreaseQuotaButton={hideIncreaseQuotaButton}
            onQuotasUrlClick={onQuotasUrlClick}
          />

          <QuotaCardsGrid
            quotas={quotas}
            disableSorting={disableSorting}
            isLoading={isLoading}
            isError={isError}
            onRefresh={onRefresh}
          />
        </div>
      }
    >
      <ButtonFunction
        label={t('quotas')}
        icon={isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
        counter={
          exhaustedCount > 0
            ? {
                value: exhaustedCount,
                appearance: 'red',
              }
            : undefined
        }
        size='s'
        {...buttonProps}
      />
    </Dropdown>
  );
}
