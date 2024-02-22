import { PaginationSlider } from '@snack-uikit/pagination';

import styles from './styles.module.scss';

type StepsProps = {
  stepsCount: number;
  currentStep: number;
};

function noop() {}

export function Steps({ currentStep, stepsCount }: StepsProps) {
  return (
    <PaginationSlider
      page={currentStep + 1}
      data-test-id='tour-pagination'
      onChange={noop}
      total={stepsCount}
      className={styles.noPointerEvents}
    />
  );
}
