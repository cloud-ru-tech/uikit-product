import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCard, ToggleGroup, ToggleGroupProps } from '../src';

export default {
  title: 'Components/Toggle Group/Toggle Group',
  component: ToggleGroup,
} as Meta;

const Template: Story<ToggleGroupProps> = args => {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup {...args} value={value} onChange={setValue}>
      <ToggleCard
        value={1}
        title='Базовые образы'
        description='Готовые Docker-образы с популярными инструментами для обучения и инференса'
        data-test-id='basic-images-card-1'
      />
      <ToggleCard
        value={2}
        title='Модели'
        description='Доступные для дообучения и инференса'
        data-test-id='models-card-1'
      />
      <ToggleCard
        value={3}
        title='Контейнеры'
        description='С популярными библиотеками и инструментами'
        data-test-id='containers-card-1'
      />
      <ToggleCard
        value={4}
        title='Базовые образы'
        description='Готовые Docker-образы с популярными инструментами для обучения и инференса'
        disabled
        data-test-id='basic-images-card-2'
      />
      <ToggleCard
        value={5}
        title='Модели'
        description='Доступные для дообучения и инференса'
        data-test-id='models-card-2'
      />
      <ToggleCard
        value={6}
        title='Контейнеры'
        description='С популярными библиотеками и инструментами'
        data-test-id='containers-card-2'
      />
    </ToggleGroup>
  );
};

export const toggleGroup = Template.bind({});
toggleGroup.args = { mode: ToggleGroup.mode.Checkbox, breakpoint: 250 };
toggleGroup.argTypes = {};
toggleGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=12824%3A200633',
  },
};
