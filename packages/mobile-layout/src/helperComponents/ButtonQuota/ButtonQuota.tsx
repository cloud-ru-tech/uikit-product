import { useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import {
  QuotaWidget,
  QuotaWidgetMobile,
  QuotaWidgetMobileProps,
  QuotaWidgetProps,
} from '@cloud-ru/uikit-product-quota';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';

export type ButtonQuotaProps = WithLayoutType<
  Omit<QuotaWidgetProps, 'buttonProps'> | Omit<QuotaWidgetMobileProps, 'isOpen' | 'onClose'>
> &
  Pick<QuotaWidgetProps, 'buttonProps'>;

export function ButtonQuota({ layoutType, buttonProps, ...props }: ButtonQuotaProps) {
  const { t } = useLocale('MobileLayout');
  const [isOpen, setIsOpen] = useState(false);

  const exhaustedCount = props.quotas.filter(item => item.remains === 0).length;

  if (layoutType === 'mobile') {
    return (
      <>
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
          size='m'
          {...buttonProps}
          onClick={() => setIsOpen(prev => !prev)}
        />
        <QuotaWidgetMobile {...(props as QuotaWidgetMobileProps)} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return <QuotaWidget {...(props as QuotaWidgetProps)} buttonProps={{ size: 'm', ...buttonProps }} />;
}
