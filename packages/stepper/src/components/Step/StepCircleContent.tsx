import { CheckboxChecked, Dot } from './styled';

type StepCircleContentProps = {
  isCurrentStep: boolean;
  hasError: boolean;
  isFilled: boolean;
};

export function StepCircleContent({ isCurrentStep, hasError, isFilled }: StepCircleContentProps) {
  if (hasError) {
    return null;
  }

  if (isCurrentStep) {
    return <Dot />;
  }

  if (isFilled) {
    return <CheckboxChecked data-test-id={'stepper__step__completed'} />;
  }

  return null;
}
