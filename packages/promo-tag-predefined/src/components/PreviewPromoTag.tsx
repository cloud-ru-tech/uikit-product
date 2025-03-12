import { useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { PREVIEW_PROMO_TAG_CONTEXT } from './constants';
import styles from './styles.module.scss';
import { PreviewPromoTagContext } from './types';

export type PreviewPromoTagProps = {
  context?: PreviewPromoTagContext;
} & Pick<TooltipProps, 'placement' | 'trigger'>;

export function PreviewPromoTag({ context = PREVIEW_PROMO_TAG_CONTEXT.Service, ...props }: PreviewPromoTagProps) {
  const { t } = useLocale('PromoTagPredefined');

  const text = useMemo(
    () => (context === PREVIEW_PROMO_TAG_CONTEXT.Functional ? t('tooltipFunctional') : t('tooltipService')),
    [context, t],
  );

  return (
    <Tooltip tip={text} {...props} className={styles.tooltip} triggerClassName={styles.trigger}>
      <PromoTag text={t('preview')} appearance='blue' />
    </Tooltip>
  );
}
