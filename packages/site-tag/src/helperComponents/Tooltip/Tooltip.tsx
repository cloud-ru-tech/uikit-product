import { ReactNode } from 'react';

import { QuestionTooltip } from '@snack-uikit/tooltip';

import { Appearance } from '../../types';
import styles from './styles.module.scss';

export type TooltipProps = {
  tip?: ReactNode;
  appearance: Appearance;
};

export function Tooltip({ tip, appearance }: TooltipProps) {
  return (
    <QuestionTooltip
      data-color='blue'
      className={styles.tooltip}
      size='xs'
      tip={tip}
      trigger='hover'
      triggerSupportProps={{
        'data-appearance': appearance,
        'data-test-id': 'tag__tooltip',
      }}
    />
  );
}
