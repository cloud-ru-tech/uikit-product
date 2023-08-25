import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '@sbercloud/uikit-product-button';
import { InputCommon } from '@sbercloud/uikit-product-input';
import { NotificationType, openNotification } from '@sbercloud/uikit-product-notification';
import { NotificationBigStatus } from '@sbercloud/uikit-product-notification/src/components/NotificationBig/constants';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Stepper, StepsProps, useStepperContext } from '../src';

const meta: Meta = {
  title: 'Components/Stepper',
  component: Stepper.Steps,
};
export default meta;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  & > * {
    margin-right: 20px;
  }
`;

const FIRST_STEP_FIELD_NAME = 'firstStep';
const SECOND_STEP_FIELD_NAME = 'secondStep';
const THIRD_STEP_FIELD_NAME = 'thirdStep';

type FormValues = {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
};

function StepsView({ steps, className }: StepsProps) {
  const { moveForward, moveToPrevStep, currentStepIndex, setCurrentStep, clearErrors, raiseCurrentStepError } =
    useStepperContext();
  const formMethods = useForm<FormValues>();

  const clearAllErrors = () => {
    formMethods.clearErrors();
    clearErrors();
  };

  const firstStepField = formMethods.watch(FIRST_STEP_FIELD_NAME);
  const secondStepField = formMethods.watch(SECOND_STEP_FIELD_NAME);
  const thirdStepField = formMethods.watch(THIRD_STEP_FIELD_NAME);

  const handleSubmit = async () => {
    if (await formMethods.trigger(THIRD_STEP_FIELD_NAME)) {
      openNotification({
        type: NotificationType.Big,
        notificationProps: {
          title: 'success',
          description: `first step field = ${firstStepField}, second step field = ${secondStepField}, third step field = ${thirdStepField}`,
          status: NotificationBigStatus.Success,
        },
      });
    } else {
      raiseCurrentStepError();
    }
  };

  const handleSetFirstStep = () => {
    setCurrentStep(0);
  };

  const handleSetLastStep = () => {
    setCurrentStep(steps.length - 1);
  };

  return (
    <FormProvider {...formMethods}>
      <Stepper.Steps steps={steps} className={className} data-test-id={'stepper-wrapper'} />
      <Row>
        <Button
          text='Предыдущий шаг'
          onClick={() => moveToPrevStep(currentStepIndex - 1)}
          data-test-id={'move-backward'}
        />
        <Button text='Следующий шаг' onClick={moveForward} data-test-id={'move-forward'} />
        <Button text='Очистить ошибки' onClick={clearAllErrors} data-test-id={'clear-errors'} />
        <Button
          text='Перейти на первый шаг'
          onClick={handleSetFirstStep}
          disabled={currentStepIndex === 0}
          data-test-id={'move-first-step'}
        />
        <Button
          text='Перейти на последний шаг'
          onClick={handleSetLastStep}
          disabled={currentStepIndex === steps.length - 1}
          data-test-id={'move-last-step'}
        />
        {currentStepIndex === steps.length - 1 && (
          <Button text='Отправить' onClick={handleSubmit} data-test-id={'submit'} />
        )}
      </Row>
    </FormProvider>
  );
}

function Template({ ...args }: StepsProps) {
  return (
    <Stepper.Context stepsCount={args.steps.length}>
      <StepsView {...args} />
    </Stepper.Context>
  );
}

function FirstStepContent() {
  const { watch, setError, clearErrors: clearFormErrors } = useFormContext();
  const { setValidator, clearErrors: clearStepperErrors } = useStepperContext();
  const firstStepField = watch(FIRST_STEP_FIELD_NAME);

  useEffect(() => {
    setValidator(() => {
      if (firstStepField === '1') {
        setError(FIRST_STEP_FIELD_NAME, { type: 'validate', message: 'error' });
        return false;
      }

      return true;
    });

    if (firstStepField !== '1') {
      clearFormErrors(FIRST_STEP_FIELD_NAME);
      clearStepperErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstStepField]);

  return (
    <div>
      <h1 data-test-id={'step-1-content'}>Step 1 content</h1>

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputCommon
            onChange={onChange}
            value={value}
            error={error?.message}
            label={'type 1 to make step invalid'}
            data-test-id={'first-step-input'}
          />
        )}
        name={FIRST_STEP_FIELD_NAME}
        defaultValue={''}
      />
    </div>
  );
}

function SecondStepContent() {
  const { watch, setError, clearErrors: clearFormErrors } = useFormContext();
  const { setValidator, clearErrors: clearStepperErrors } = useStepperContext();
  const secondStepField = watch(SECOND_STEP_FIELD_NAME);

  useEffect(() => {
    setValidator(() => {
      if (secondStepField === '2') {
        setError(SECOND_STEP_FIELD_NAME, { type: 'validate', message: 'error' });
        return false;
      }

      return true;
    });

    if (secondStepField !== '2') {
      clearFormErrors(SECOND_STEP_FIELD_NAME);
      clearStepperErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondStepField]);

  return (
    <div>
      <h1 data-test-id={'step-2-content'}> Step 2 content </h1>

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputCommon
            onChange={onChange}
            value={value}
            error={error?.message}
            label={'type 2 to make step invalid'}
            data-test-id={'second-step-input'}
          />
        )}
        name={SECOND_STEP_FIELD_NAME}
        defaultValue={''}
      />
    </div>
  );
}

function ThirdStepContent() {
  const { watch, setError, clearErrors: clearFormErrors } = useFormContext();
  const { setValidator, clearErrors: clearStepperErrors } = useStepperContext();
  const thirdStepField = watch(THIRD_STEP_FIELD_NAME);

  useEffect(() => {
    setValidator(() => {
      if (thirdStepField === '3') {
        setError(THIRD_STEP_FIELD_NAME, { type: 'validate', message: 'error' });
        return false;
      }

      return true;
    });

    if (thirdStepField !== '3') {
      clearFormErrors(THIRD_STEP_FIELD_NAME);
      clearStepperErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thirdStepField]);

  return (
    <div>
      <h1 data-test-id={'step-3-content'}> Step 3 content </h1>

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputCommon
            onChange={onChange}
            value={value}
            error={error?.message}
            label={'type 3 to make step invalid'}
            data-test-id={'third-step-input'}
          />
        )}
        name={THIRD_STEP_FIELD_NAME}
        defaultValue={''}
        rules={{ validate: value => value !== '3' || 'error' }}
      />
    </div>
  );
}

export const stepper: StoryFn<StepsProps> = Template.bind({});
stepper.args = {
  steps: [
    { label: 'Step1', content: <FirstStepContent />, id: '1' },
    { label: 'Step2', content: <SecondStepContent />, id: '2' },
    { label: 'Step3', content: <ThirdStepContent />, id: '3' },
  ],
};

stepper.argTypes = {};

stepper.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=54252%3A255653',
  },
};
