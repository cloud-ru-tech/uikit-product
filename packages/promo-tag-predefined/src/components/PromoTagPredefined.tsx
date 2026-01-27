import { useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { extractSupportProps } from '@snack-uikit/utils';

import { PREVIEW_CONTEXT } from './constants';
import styles from './styles.module.scss';
import { PreviewContext, Variant } from './types';

export type PromoTagPredefinedProps = WithSupportProps<{
  /** Вариант промо-тега */
  variant: Variant;
  /** Контекст тега с вариантом "preview" */
  context?: PreviewContext;
  /** Настройки тултипа */
  tooltip?: Pick<TooltipProps, 'placement' | 'trigger'>;
}> &
  Pick<PromoTagProps, 'onClick'>;

export function PromoTagPredefined({
  context = PREVIEW_CONTEXT.Service,
  variant,
  tooltip,
  onClick,
  ...rest
}: PromoTagPredefinedProps) {
  const { t } = useLocale('PromoTagPredefined');

  const { tip, text, appearance } = useMemo<{
    tip: string;
    text: string;
    appearance: PromoTagProps['appearance'];
  }>(() => {
    switch (variant) {
      case 'connecting':
        return {
          text: t('connecting'),
          tip: t('tooltipConnecting'),
          appearance: 'neutral',
        };
      case 'partner':
        return {
          text: t('partner'),
          tip: t('tooltipPartner'),
          appearance: 'orange',
        };
      case 'preview':
      default: {
        return {
          text: t('preview'),
          tip: context === PREVIEW_CONTEXT.Functional ? t('tooltipPreviewFunctional') : t('tooltipPreviewService'),
          appearance: 'blue',
        };
      }
    }
  }, [context, t, variant]);

  return (
    <Tooltip {...tooltip} tip={tip} className={styles.tooltip} triggerClassName={styles.trigger} hoverDelayOpen={300}>
      <PromoTag
        text={text}
        appearance={appearance}
        onClick={onClick}
        color='decor'
        size='xxs'
        {...extractSupportProps(rest)}
      />
    </Tooltip>
  );
}
