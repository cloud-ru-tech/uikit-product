import { Meta, StoryFn } from '@storybook/react';

import { TextField } from '@sbercloud/uikit-product-text-field';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoBlock, InfoBlockProps } from '../src';
import { LabelWithTooltip } from '../src/components/LabelWithTooltip';

export default {
  title: 'Not stable/Layout/LayoutWithGroups',
  component: InfoBlock,
} as Meta;

const Template: StoryFn<InfoBlockProps> = ({ ...args }) => <InfoBlock {...args} />;

export const layoutWithGroups = Template.bind({});

layoutWithGroups.args = {
  groups: [
    {
      title: 'Общие параметры',
      items: [
        {
          label: 'Название',
          value: <TextField text='Space' allowCopy />,
        },
        {
          label: 'Описание',
          value: <TextField text='Основной' allowCopy />,
        },
      ],
    },
    {
      title: <div>Конфигурация</div>,
      items: [
        {
          label: <LabelWithTooltip label='Название конфигурации' tooltip={{ content: 'Название конфигурации' }} />,
          value: 'Small',
        },
        {
          label: <div>vCPU</div>,
          value: '8',
        },
      ],
    },
  ],
  buttonText: 'Сохранить изменения',
  showButton: true,
};

layoutWithGroups.argTypes = {};

layoutWithGroups.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174807&t=eN8anAcYgN7ZSBEQ-0',
  },
};
