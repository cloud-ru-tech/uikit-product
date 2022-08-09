import { useEffect, useMemo } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { MIN_DISTANCE_BETWEEN_STEPS, MIN_STEPS_WIDTH } from '../../constants/Step';
import { useInnerContextProvider } from '../../contexts/InnerContextProvider';
import { useOuterContextProvider } from '../../contexts/OuterContextProvider';
import { Step } from '../Step/Step';
import { StepperProps } from '../types';
import * as S from './styled';

export function Stepper({ steps, className, ...rest }: WithSupportProps<StepperProps>) {
  const { currentStepIndex } = useOuterContextProvider();
  const minStepperWidth = MIN_STEPS_WIDTH * steps.length + MIN_DISTANCE_BETWEEN_STEPS * (steps.length - 1);
  const lastStepIndex = steps.length - 1;
  const { innerSteps, setInnerSteps } = useInnerContextProvider();

  useEffect(() => {
    setInnerSteps(steps.map(step => ({ ...step, isFilled: false, hasError: false })));
  }, [setInnerSteps, steps]);

  const fillRowLeftPosition = useMemo(() => {
    const stepsAmount = steps.length - 1;

    let currentPercent = (currentStepIndex / stepsAmount) * 100;

    // Для выравнивания фона с шагами мы должны округлять значения вверх, если они меньше 50 и наоборот
    currentPercent = currentPercent < 50 ? Math.ceil(currentPercent) : Math.floor(currentPercent);

    return 100 - currentPercent;
  }, [currentStepIndex, steps]);

  return (
    <>
      <S.StepperWrapper className={className} {...extractSupportProps(rest)} minWidth={minStepperWidth}>
        <S.StepperBackgroundRow>
          <S.StepperFilledRow fillRowLeftPosition={fillRowLeftPosition} />
        </S.StepperBackgroundRow>

        {innerSteps.map(({ label, isFilled, hasError, id }, index) => (
          <Step
            key={id}
            index={index}
            lastStepIndex={lastStepIndex}
            currentStepIndex={currentStepIndex}
            isFilled={isFilled}
            hasError={hasError}
            label={label}
          />
        ))}
      </S.StepperWrapper>
      {steps[currentStepIndex].content}
    </>
  );
}
