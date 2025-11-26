import cn from 'classnames';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { PromoTag } from '@snack-uikit/promo-tag';
import { QuestionTooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type CoveredByGrantLabelProps = {
  covered: boolean;
  className?: string;
};

export function CoveredByGrantLabel({ covered, className }: CoveredByGrantLabelProps) {
  const { t } = useLocale('PriceSummary');
  return (
    <div className={cn(styles.coveredByGrant, className)}>
      <PromoTag
        appearance={covered ? 'green' : 'neutral'}
        color='decor'
        text={covered ? t('coveredByGrant') : t('notCoveredByGrant')}
      />
      <QuestionTooltip
        tip={covered ? t('coveredByGrantTooltip') : t('notCoveredByGrantTooltip')}
        size='xs'
        placement='top'
        trigger='hover'
        tabIndex={-1}
      />
    </div>
  );
}
