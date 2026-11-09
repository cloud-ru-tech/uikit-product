import cn from 'classnames';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Tooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type CoveredByGrantLabelProps = WithLayoutType<{
  covered: boolean;
  className?: string;
}>;

export function CoveredByGrantLabel({ covered, className, layoutType }: CoveredByGrantLabelProps) {
  const { t } = useLocale('PriceSummary');
  return (
    <Tooltip
      tip={covered ? t('coveredByGrantTooltip') : t('notCoveredByGrantTooltip')}
      placement='top'
      trigger={layoutType === 'mobile' ? 'click' : 'hoverAndFocus'}
      triggerClassName={styles.coveredByGrant}
    >
      <button type='button' className={cn(styles.coveredByGrant, className)}>
        <PromoTag
          size='xxs'
          appearance={covered ? 'green' : 'neutral'}
          color='decor'
          text={covered ? t('coveredByGrant') : t('notCoveredByGrant')}
        />
      </button>
    </Tooltip>
  );
}
