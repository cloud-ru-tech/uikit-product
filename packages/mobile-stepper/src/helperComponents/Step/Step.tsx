import { CheckSVG, CrossSVG } from '@cloud-ru/uikit-product-icons';
import { Sun } from '@snack-uikit/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { STEP_STATE } from '../../constants';
import { StepState, StepViewData } from '../../types';
import { getTestIdBuilder } from '../../utils';
import styles from './styles.module.scss';

export type StepProps = WithSupportProps<{
  step: StepViewData;
}>;

const getStepTestId = getTestIdBuilder('_element-step');

function getContent(state: StepState) {
  switch (state) {
    case STEP_STATE.Completed:
      return <CheckSVG size={16} />;
    case STEP_STATE.Rejected:
      return <CrossSVG size={16} />;
    case STEP_STATE.Loading:
      return <Sun size='xs' />;
    default:
      return null;
  }
}

export function Step({ step, 'data-test-id': testId, ...props }: StepProps) {
  return (
    <button
      type='button'
      className={styles.step}
      onClick={step.onClick}
      disabled={!step.onClick}
      data-test-id={getStepTestId(testId)}
      data-state={step.state}
      {...extractSupportProps(props)}
    >
      <div className={styles.track} />
      <div className={styles.status}>{getContent(step.state)}</div>
    </button>
  );
}
