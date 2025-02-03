import { ReactNode } from 'react';

import { QuestionTooltip } from '@snack-uikit/tooltip';
import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE } from '../constants';
import styles from './styles.module.scss';

export type TooltipProps = {
  tip?: ReactNode;
  appearance: ValueOf<typeof APPEARANCE>;
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
