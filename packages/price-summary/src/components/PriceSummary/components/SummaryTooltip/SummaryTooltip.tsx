import { SyntheticEvent } from 'react';

import { AdaptiveTooltip, QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { QuestionSVG } from '@snack-uikit/icons';

import styles from './styles.module.scss';

type SummaryTooltipProps = WithLayoutType<{
  tip: QuestionTooltipProps['tip'];
  label: string;
}>;

export function SummaryTooltip({ tip, label, layoutType }: SummaryTooltipProps) {
  const handleStopPropagation = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <AdaptiveTooltip
      tip={tip}
      layoutType={layoutType}
      trigger={layoutType === 'mobile' ? 'click' : 'hoverAndFocus'}
      triggerClassName={styles.tooltip}
      disableSpanWrapper
    >
      <button type='button' className={styles.tooltip} aria-label={label} onClick={handleStopPropagation}>
        <QuestionSVG size={16} aria-hidden />
      </button>
    </AdaptiveTooltip>
  );
}
