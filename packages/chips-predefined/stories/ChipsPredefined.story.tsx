import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipsToggleIndicator, ChipsToggleIndicatorProps } from '../src';

const meta: Meta = {
  title: 'Console/Chips Predefined',
  component: ChipsToggleIndicator,
};
export default meta;

const tipProps = {
  availableTip: 'Доступное значение в рамках флейвора',
  disabledTip: (
    <span>
      Квота исчерпана, значение недоступно. <ins>Увеличить</ins>
    </span>
  ),
};

const Template: StoryFn<ChipsToggleIndicatorProps> = ({ ...args }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        gap: '4px',
      }}
    >
      <ChipsToggleIndicator {...args} checked={isChecked} onChange={setIsChecked} />
      <ChipsToggleIndicator label='24' onChange={() => {}} checked={true} {...tipProps} available />
      <ChipsToggleIndicator label='32' onChange={() => {}} checked={false} {...tipProps} />
      <ChipsToggleIndicator label='64-256' onChange={() => {}} checked={false} {...tipProps} disabled />
    </div>
  );
};

export const chipsPredefined: StoryObj<ChipsToggleIndicatorProps> = {
  render: Template,
  args: {
    label: '16',
    ...tipProps,
    available: true,
    disabled: false,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/z85sLht8LcHu8nk9LnF5Lr/Product-UI-Kit?node-id=34427-8434',
    },
  },
};
