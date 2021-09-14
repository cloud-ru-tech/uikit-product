import { CheckboxCheckedSVG } from '@sbercloud/uikit-react-icons';

import { Sizes } from './constants';
import { Dot } from './styled';
import { InnerStep } from './types';

const getStepContent = ({
  isCurrentStep,
  hasError,
  isFilled,
  size,
}: {
  isCurrentStep: boolean;
  hasError: boolean;
  isFilled: boolean;
  size: Sizes;
}) => {
  if (size === Sizes.Small) {
    return null;
  }

  if (isCurrentStep) {
    return <Dot />;
  }

  if (hasError) {
    return null;
  }

  if (isFilled) {
    return <CheckboxCheckedSVG />;
  }

  return null;
};

const getFillRowLeftPosition = ({ steps, currentStepIndex }: { steps: InnerStep[]; currentStepIndex: number }) => {
  const stepsAmount = steps.length - 1;

  let currentPercent = (currentStepIndex / stepsAmount) * 100;

  // Для выравнивания фона с шагами мы должны округлять значения вверх, если они меньше 50 и наоборот
  currentPercent = currentPercent < 50 ? Math.ceil(currentPercent) : Math.floor(currentPercent);

  const leftPosition = `-${100 - currentPercent}%`;

  return leftPosition;
};

export { getStepContent, getFillRowLeftPosition };
