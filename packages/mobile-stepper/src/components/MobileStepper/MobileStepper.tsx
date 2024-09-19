import cn from 'classnames';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { STEP_STATE, STEPPER_SPACING } from '../../constants';
import { Step } from '../../helperComponents';
import { MobileStepperContext } from '../../MobileStepperContext';
import { MobileStepperApi, StepData, StepState, StepsValidator, StepViewData } from '../../types';
import styles from './styles.module.scss';

export type MobileStepperState = MobileStepperApi & {
  stepper: ReactElement;
};

export type MobileStepperProps = WithSupportProps<{
  /** Массив шагов */
  steps: StepData[];
  /** Индекс текущего шага по-дефолту */
  defaultCurrentStepIndex: number;
  /** Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым - индекс нового шага.  */
  validator?: StepsValidator;
  /** CSS-класс */
  className?: string;
  /**
   * Render function. Принимает аргументы: `stepper` - JSX-элемент степпера,
   * `goNext(stepIndex?: number)` - перейти на след. шаг, `goPrev(stepIndex?: number)` - перейти на пред. шаг, `resetValidation` - сбросить состояние валидации для текущего шага, `setValidator` переопределяет функцию-валидатор, которая принимает в параметры индекс текущего шага и индекс нового, `isCompleted` - окончен ли процесс, `currentStepIndex` - индекс текущего шага, `stepCount` - кол-во шагов.
   * @type ({stepper, ...api}) => ReactElement
   */
  children: (params: MobileStepperState) => ReactElement;
  /** Колбек смены текущего степа */
  onChangeCurrentStep?: (newValue: number, prevValue: number) => void;
  /** Колбек изменения завершенности */
  onCompleteChange?: (isCompleted: boolean) => void;
}>;

const DEFAULT_VALIDATOR = async () => true;

export function MobileStepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  validator: validatorProp = DEFAULT_VALIDATOR,
  ...props
}: MobileStepperProps) {
  const defaultIsCompleted = defaultCurrentStepIndex === steps.length - 1;
  const [currentStepState, setCurrentStepState] = useState<StepState>(
    defaultIsCompleted ? STEP_STATE.Completed : STEP_STATE.Current,
  );
  const [currentStepIndex, setCurrentStepIndexValue] = useState(defaultCurrentStepIndex);
  const [isCompleted, setIsCompleted] = useState(defaultIsCompleted);
  const [stepsValidator, setStepsValidator] = useState<{ value: StepsValidator }>();

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onCompleteChange?.(isCompleted);
  }, [isCompleted, onCompleteChange]);

  const setCurrentStepIndex = useCallback(
    (newValue: number) => {
      setCurrentStepIndexValue(prevValue => {
        if (prevValue !== newValue) {
          onChangeCurrentStep?.(newValue, prevValue);
        }
        return newValue;
      });
    },
    [onChangeCurrentStep],
  );

  const goNext = useCallback(
    (newStepIndexUnsafety: number = currentStepIndex + 1) => {
      if (currentStepIndex >= steps.length || isCompleted || newStepIndexUnsafety <= currentStepIndex) {
        return;
      }

      const newStepIndex = Math.min(steps.length - 1, newStepIndexUnsafety);

      setCurrentStepState(STEP_STATE.Loading);

      const validator = stepsValidator?.value || validatorProp;

      validator(currentStepIndex, newStepIndex)
        .catch(() => false)
        .then(isValid => {
          if (!isValid) {
            setCurrentStepState(STEP_STATE.Rejected);
            return;
          }

          if (currentStepIndex === steps.length - 1) {
            setCurrentStepState(STEP_STATE.Completed);
            setIsCompleted(true);
          } else {
            setCurrentStepIndex(newStepIndex);
            setCurrentStepState(STEP_STATE.Current);
          }
        });
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex, steps.length, stepsValidator?.value, validatorProp],
  );

  const goPrev = useCallback(
    (index: number = currentStepIndex - 1) => {
      if (currentStepIndex === 0 || index < 0 || index > currentStepIndex) {
        return;
      }

      if (index === currentStepIndex && !isCompleted) {
        return;
      }

      if (isCompleted) {
        setIsCompleted(false);
      }

      setCurrentStepIndex(index);
      setCurrentStepState(STEP_STATE.Current);
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex],
  );

  useEffect(() => {
    const currentStepElement = stepRefs.current[currentStepIndex];
    const container = containerRef.current;

    if (currentStepElement && container) {
      const elementLeft = currentStepElement.offsetLeft - STEPPER_SPACING;
      container.scrollTo({ left: elementLeft, behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  const stepsView: StepViewData[] = useMemo(
    () =>
      steps.map((step, index) => {
        const number = index + 1;

        if (index < currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Completed, onClick: () => goPrev(index) };
        }

        if (index === currentStepIndex) {
          return { ...step, number, state: currentStepState, onClick: isCompleted ? () => goPrev(index) : undefined };
        }

        if (index - 1 === currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Waiting, onClick: () => goNext() };
        }

        return { ...step, number, state: STEP_STATE.Waiting };
      }),
    [steps, currentStepIndex, goPrev, currentStepState, isCompleted, goNext],
  );

  const resetValidation = useCallback(() => {
    if (currentStepState === STEP_STATE.Rejected) {
      setCurrentStepState(STEP_STATE.Current);
    }
  }, [currentStepState]);

  const setValidator = useCallback((validator: StepsValidator) => {
    setStepsValidator({ value: validator });
  }, []);

  const stepper = (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={cn(styles.stepper, className)} {...extractSupportProps(props)}>
        {stepsView.map((step, index) => (
          <Step
            key={step.title + index}
            step={step}
            data-test-id={props['data-test-id']}
            hideTailLine={index === steps.length - 1}
            ref={el => (stepRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );

  const stepperApi = {
    goNext,
    goPrev,
    currentStepIndex,
    isCompleted,
    resetValidation,
    stepCount: steps.length,
    stepper,
    setValidator,
  };

  return <MobileStepperContext.Provider value={stepperApi}>{children(stepperApi)}</MobileStepperContext.Provider>;
}
