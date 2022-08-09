import { useInnerContextProvider } from '../../contexts/InnerContextProvider';
import { StepCircleContent } from './StepCircleContent';
import * as S from './styled';

type StepProps = {
  index: number;
  lastStepIndex: number;
  currentStepIndex: number;
  isFilled: boolean;
  hasError: boolean;
  label: string;
};

export function Step({ index, lastStepIndex, currentStepIndex, isFilled, hasError, label }: StepProps) {
  const isFirstStep = index === 0;
  const isLastStep = index === lastStepIndex;
  const isCurrentStep = index === currentStepIndex;
  const stepLeftPosition = (index / lastStepIndex) * 100;
  const { handleStepClick } = useInnerContextProvider();
  const isClickable = index < currentStepIndex + 2;

  const handleClick = () => {
    handleStepClick(index);
  };

  return (
    <S.Step
      key={index}
      leftPosition={stepLeftPosition}
      data-test-id={`stepper__step-${index}`}
      data-first-step={isFirstStep || undefined}
      data-last-step={isLastStep || undefined}
    >
      <S.StepCircle
        data-first-step={isFirstStep || undefined}
        data-last-step={isLastStep || undefined}
        data-error={hasError || undefined}
        data-filled={isFilled || undefined}
        data-current={isCurrentStep || undefined}
        data-is-clickable={isClickable || undefined}
        onClick={handleClick}
      >
        <StepCircleContent isCurrentStep={isCurrentStep} hasError={hasError} isFilled={isFilled} />
      </S.StepCircle>

      <S.StepLabel
        data-error={hasError || undefined}
        data-filled={isFilled || undefined}
        data-current={isCurrentStep || undefined}
        data-first-step={isFirstStep || undefined}
        data-last-step={isLastStep || undefined}
        data-is-clickable={isClickable || undefined}
        onClick={handleClick}
      >
        {label}
      </S.StepLabel>
    </S.Step>
  );
}
