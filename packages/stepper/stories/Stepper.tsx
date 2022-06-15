import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Stepper, StepsProps, useStepperContext } from '../src';

export default {
  title: 'Not stable/Stepper',
  component: Stepper.Steps,
} as Meta;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  & > * {
    margin-right: 20px;
  }
`;

const StepsView = (args: StepsProps) => {
  const { moveForward, moveToPrevStep, currentStepIndex, setValidator } = useStepperContext();

  useEffect(() => {
    setValidator(() => true);
  }, []);

  return (
    <>
      <Stepper.Steps {...args} />
      <Row>
        <Button text='Предыдущий шаг' onClick={() => moveToPrevStep(currentStepIndex - 1)} />
        <Button text='Следующий шаг' onClick={moveForward} />
      </Row>
    </>
  );
};

const Template: Story<StepsProps> = ({ ...args }) => (
  <Stepper.Context stepsCount={args.steps.length}>
    <StepsView {...args} />
  </Stepper.Context>
);

export const stepper = Template.bind({});
stepper.args = {
  steps: [
    { id: 1, name: 'Step1' },
    { id: 2, name: 'Step2' },
    { id: 3, name: 'Step3' },
    { id: 4, name: 'Step4' },
    { id: 5, name: 'Step5' },
  ],
};
stepper.argTypes = {};
stepper.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://www.figma.com/file/ymnPlgvfEn4KmoCUs2IzG3/%5BDC%5D-Data-Hub-Refactoring?node-id=225%3A9273',
  },
};
