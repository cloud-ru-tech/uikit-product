import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { useStepperContext } from '../Context';
import { Sizes } from './constants';
import { getFillRowLeftPosition, getStepContent } from './helpers';
import { Step, StepCircle, StepName, StepperBackgroundRow, StepperFilledRow, StepperWrap } from './styled';
import { InnerStep as InnerStepType, Step as StepType } from './types';

export type StepsProps = {
  steps: StepType[];
  size?: Sizes;
  className?: string;
};

export function Steps({ steps, className, size = Sizes.Big, ...rest }: WithSupportProps<StepsProps>) {
  const { moveForward, moveToPrevStep, currentStepIndex, validateCurrentStep } = useStepperContext();
  const lastSelectedStepIndex = useRef(0);
  const [innerSteps, setInnerSteps] = useState<InnerStepType[]>(
    steps.map(step => ({ ...step, isFilled: false, hasError: false })),
  );

  const handleStepClick = useCallback(
    (clickedStepIndex: number, clickedStepId: number) => () => {
      const nextStepIndex = currentStepIndex + 1;

      // Если пользователь идет назад
      if (clickedStepIndex < currentStepIndex) {
        // Устанавливаем последний выбранный шаг на тот, на который переключился пользователь
        lastSelectedStepIndex.current = clickedStepIndex;
        // Сбрасываем состояния для всех последующих шагов, после выбранного шага
        setInnerSteps([
          ...innerSteps.slice(0, clickedStepIndex),
          ...innerSteps.slice(clickedStepIndex).map(step => ({ ...step, isFilled: false, hasError: false })),
        ]);

        // Устанавливаем текущий шаг на тот, который был кликнут
        moveToPrevStep(clickedStepIndex);
        return;
      }

      // Если пользователь идет вперед
      if (clickedStepIndex === nextStepIndex) {
        const isCurrentStepValid = validateCurrentStep(clickedStepId);

        if (isCurrentStepValid) {
          // Обновляем текущий шаг в состояние "заполнен"
          const updatedCurrentStep = { ...innerSteps[currentStepIndex], isFilled: true, hasError: false };
          // Устанавливаем последний выбранный шаг на тот, на который переключился пользователь
          lastSelectedStepIndex.current = clickedStepIndex;

          // Обновляем список шагов
          setInnerSteps([
            ...innerSteps.slice(0, currentStepIndex),
            updatedCurrentStep,
            ...innerSteps.slice(nextStepIndex),
          ]);

          // Идем на следующий шаг
          moveForward();
          return;
        }

        // Обновляем текущий шаг в состояние ошибки
        const updatedCurrentStep = { ...innerSteps[currentStepIndex], isFilled: false, hasError: true };
        // Устанавливаем последний выбранный шаг на этот, т.к. переход не должен произойти из-за ошибки
        lastSelectedStepIndex.current = currentStepIndex;

        // Обновляем список шагов
        setInnerSteps([
          ...innerSteps.slice(0, currentStepIndex),
          updatedCurrentStep,
          ...innerSteps.slice(nextStepIndex),
        ]);
      }
    },
    [validateCurrentStep, innerSteps, currentStepIndex],
  );

  useEffect(() => {
    // Если шаг в контексте равен последнему нашему шагу, то мы просто игнорируем это изменение
    if (currentStepIndex === lastSelectedStepIndex.current) {
      return;
    }

    // Если пользователь ушел назад
    if (currentStepIndex < lastSelectedStepIndex.current) {
      lastSelectedStepIndex.current = currentStepIndex;
      // Сбрасываем состояния для всех последующих шагов, после выбранного шага
      setInnerSteps([
        ...innerSteps.slice(0, currentStepIndex),
        ...innerSteps.slice(currentStepIndex).map(step => ({ ...step, isFilled: false, hasError: false })),
      ]);
      return;
    }

    // Если пользователь ушел вперед, то мы должны проверить тот шаг, на котором он был
    const stepIndex = lastSelectedStepIndex.current;
    const isCurrentStepValid = validateCurrentStep(innerSteps[stepIndex]?.id);

    if (isCurrentStepValid) {
      // Обновляем шаг, на котором был пользователь
      const updatedCurrentStep = { ...innerSteps[stepIndex], isFilled: true, hasError: false };

      // Обновляем список шагов
      setInnerSteps([...innerSteps.slice(0, stepIndex), updatedCurrentStep, ...innerSteps.slice(stepIndex + 1)]);
      // Обновляем последний выбранный шаг
      lastSelectedStepIndex.current = currentStepIndex;
    } else {
      // Обновляем шаг, на котором был пользователь
      const updatedCurrentStep = { ...innerSteps[stepIndex], isFilled: false, hasError: true };

      // Обновляем список шагов, сбрасываем все последующие шаги в состояние не заполнен
      setInnerSteps([
        ...innerSteps.slice(0, stepIndex),
        updatedCurrentStep,
        ...innerSteps.slice(stepIndex + 1).map(step => ({ ...step, isFilled: false, hasError: false })),
      ]);
      // Возвращаем пользователя назад
      moveToPrevStep(lastSelectedStepIndex.current);
    }
  }, [currentStepIndex]);

  const fillRowLeftPosition = useMemo(() => {
    const leftPosition = getFillRowLeftPosition({ steps: innerSteps, currentStepIndex });

    return leftPosition;
  }, [currentStepIndex, innerSteps]);

  const stepsAmount = steps.length - 1;

  return (
    <StepperWrap className={className} data-size={size} {...extractSupportProps(rest)}>
      <StepperBackgroundRow>
        <StepperFilledRow fillRowLeftPosition={fillRowLeftPosition} />
      </StepperBackgroundRow>
      {innerSteps.map(({ name, isFilled, hasError, id }, index) => {
        const isFirstStep = index === 0;
        const isLastStep = index === stepsAmount;
        const isCurrentStep = index === currentStepIndex;
        const stepLeftPosition = `${(index / stepsAmount) * 100}%`;
        const stepContent = getStepContent({ size, isCurrentStep, isFilled, hasError });

        return (
          <Step
            key={id}
            leftPosition={stepLeftPosition}
            data-size={size}
            data-test-step-id={id}
            data-first-step={isFirstStep || undefined}
            data-last-step={isLastStep || undefined}
            onClick={handleStepClick(index, id)}
          >
            <StepCircle
              data-size={size}
              data-error={hasError || undefined}
              data-filled={isFilled || undefined}
              data-current={isCurrentStep || undefined}
            >
              {stepContent}
            </StepCircle>
            <StepName
              data-error={hasError || undefined}
              data-filled={isFilled || undefined}
              data-current={isCurrentStep || undefined}
            >
              {name}
            </StepName>
          </Step>
        );
      })}
    </StepperWrap>
  );
}

Steps.sizes = Sizes;

export type { StepType };
