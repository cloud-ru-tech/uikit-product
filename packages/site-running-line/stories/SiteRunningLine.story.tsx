import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SiteRunningLine, SiteRunningLineProps } from '../src';

const meta: Meta = {
  title: 'Site/Running Line',
  component: SiteRunningLine,
};
export default meta;

const Template: StoryFn<SiteRunningLineProps> = ({ ...args }) => <SiteRunningLine {...args} />;

const defaultItems = ['Первый элемент', 'Второй элемент', 'Третий элемент', 'Четвёртый элемент', 'Пятый элемент'];

export const siteRunningLine: StoryObj<SiteRunningLineProps> = {
  render: Template,
  args: {
    items: defaultItems,
    separator: '|',
    duration: 30,
  },
  argTypes: {
    items: { control: false },
    separator: { control: 'text' },
    duration: { control: { type: 'number', min: 5, max: 60 } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/75iYLPOqiYsgnEbqHCVnlc/-LIB--SITE--Product-UI-Kit?node-id=29574-96169&m=dev',
    },
    docs: {
      description: {
        story: 'Наведите курсор на строку — анимация остановится. Уберите курсор — анимация продолжится.',
      },
    },
  },
};
