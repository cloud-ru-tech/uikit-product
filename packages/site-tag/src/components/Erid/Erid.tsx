import { Tooltip } from '@snack-uikit/tooltip';
import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE_ERID } from './constants';
import styles from './styles.module.scss';

type Appearance = ValueOf<typeof APPEARANCE_ERID>;

export type EridProps = {
  /** Текст в tooltip */
  tip: string;
  /** CSS-класс */
  className?: string;
  /** Внешний вид Erid */
  appearance: Appearance;
};

export function Erid({ tip, className, appearance }: EridProps) {
  return (
    <Tooltip triggerClassName={className} tip={tip}>
      <span
        data-appearance={appearance}
        className={styles.root}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <span className={styles.label}>Реклама</span>
      </span>
    </Tooltip>
  );
}
