import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useRef } from 'react';

import { useOuterContextProvider } from './OuterContextProvider';
import { InnerStep as InnerStepType } from './types';

type InnerContext = {
  validateCurrentStep(step: number): boolean;
  setErrorCleaner(clearErrors: () => void): void;
  setCurrentStepIndex(stepIndex: number): void;
  setCurrentStepHandler(handleSetStep: (stepToSet: number) => void): void;
  setStepClickHandler(handleStepClick: (stepIndex: number) => void): void;
  handleStepClick(stepIndex: number): void;
  innerSteps: InnerStepType[];
  setInnerSteps: Dispatch<SetStateAction<InnerStepType[]>>;
};

const InnerStepperContext = createContext<InnerContext>({
  setErrorCleaner() {},
  validateCurrentStep: () => true,
  setStepClickHandler() {},
  handleStepClick() {},
  setCurrentStepIndex() {},
  setCurrentStepHandler() {},
  innerSteps: [],
  setInnerSteps() {},
});

export const useInnerContextProvider = () => useContext(InnerStepperContext);

type InnerContextProviderProps = InnerContext & { children: ReactNode };

export function InnerContextProvider({
  children,
  validateCurrentStep,
  setErrorCleaner,
  setStepClickHandler,
  handleStepClick,
  setCurrentStepIndex,
  setCurrentStepHandler,
  innerSteps,
  setInnerSteps,
}: InnerContextProviderProps) {
  const { currentStepIndex, stepsCount } = useOuterContextProvider();
  const lastSelectedStepIndex = useRef(0);

  useEffect(() => {
    setErrorCleaner(() => {
      setInnerSteps(prevInnerSteps => [
        ...prevInnerSteps.slice(0, currentStepIndex),
        ...prevInnerSteps.slice(currentStepIndex).map(step => ({ ...step, hasError: false })),
      ]);
    });
  }, [innerSteps, currentStepIndex, setErrorCleaner, setInnerSteps]);

  const moveToPreviousStep = useCallback(
    (clickedStepIndex: number) => {
      lastSelectedStepIndex.current = clickedStepIndex;
      setInnerSteps(prevInnerSteps => [
        ...prevInnerSteps.slice(0, clickedStepIndex),
        ...prevInnerSteps.slice(clickedStepIndex).map(step => ({ ...step, isFilled: false, hasError: false })),
      ]);

      setCurrentStepIndex(clickedStepIndex);
    },
    [setCurrentStepIndex, setInnerSteps],
  );

  const moveToNextStep = useCallback(
    ({ clickedStepIndex, nextStepIndex }: { clickedStepIndex: number; nextStepIndex: number }) => {
      const updatedCurrentStep = { ...innerSteps[currentStepIndex], isFilled: true, hasError: false };
      lastSelectedStepIndex.current = clickedStepIndex;

      setInnerSteps(prevInnerSteps => [
        ...prevInnerSteps.slice(0, currentStepIndex),
        updatedCurrentStep,
        ...prevInnerSteps.slice(nextStepIndex),
      ]);

      setCurrentStepIndex(nextStepIndex);
    },
    [currentStepIndex, innerSteps, setCurrentStepIndex, setInnerSteps],
  );

  const stepClickHandler = useCallback(
    (clickedStepIndex: number) => {
      const nextStepIndex = currentStepIndex + 1;

      if (clickedStepIndex < currentStepIndex) {
        moveToPreviousStep(clickedStepIndex);
        return;
      }

      if (clickedStepIndex === nextStepIndex) {
        const isCurrentStepValid = validateCurrentStep(currentStepIndex);

        if (isCurrentStepValid) {
          moveToNextStep({ clickedStepIndex, nextStepIndex });
          return;
        }

        const updatedCurrentStep = { ...innerSteps[currentStepIndex], isFilled: false, hasError: true };
        lastSelectedStepIndex.current = currentStepIndex;

        setInnerSteps(prevInnerSteps => [
          ...prevInnerSteps.slice(0, currentStepIndex),
          updatedCurrentStep,
          ...prevInnerSteps.slice(nextStepIndex),
        ]);
      }
    },
    [currentStepIndex, moveToPreviousStep, validateCurrentStep, innerSteps, setInnerSteps, moveToNextStep],
  );

  const setCurrentStep = useCallback(
    (stepToSet: number) => {
      if (stepToSet > currentStepIndex) {
        const stepToMove = stepToSet > stepsCount - 1 ? stepsCount - 1 : stepToSet;

        const isStepValid = validateCurrentStep(currentStepIndex);

        if (isStepValid) {
          moveToNextStep({ clickedStepIndex: stepToMove, nextStepIndex: stepToMove });
          return;
        }

        const updatedCurrentStep = { ...innerSteps[currentStepIndex], isFilled: false, hasError: true };
        lastSelectedStepIndex.current = currentStepIndex;

        setInnerSteps(prevInnerSteps => [
          ...prevInnerSteps.slice(0, currentStepIndex),
          updatedCurrentStep,
          ...prevInnerSteps.slice(currentStepIndex + 1),
        ]);
      } else if (stepToSet >= 0) {
        moveToPreviousStep(stepToSet);
      }
    },
    [currentStepIndex, stepsCount, validateCurrentStep, innerSteps, setInnerSteps, moveToNextStep, moveToPreviousStep],
  );

  useEffect(() => {
    setStepClickHandler(stepClickHandler);
  }, [setStepClickHandler, stepClickHandler]);

  useEffect(() => {
    setCurrentStepHandler(setCurrentStep);
  }, [setCurrentStep, setCurrentStepHandler]);

  return (
    <InnerStepperContext.Provider
      value={{
        setErrorCleaner,
        validateCurrentStep,
        setStepClickHandler,
        setCurrentStepHandler,
        handleStepClick,
        setCurrentStepIndex,
        innerSteps,
        setInnerSteps,
      }}
    >
      {children}
    </InnerStepperContext.Provider>
  );
}
