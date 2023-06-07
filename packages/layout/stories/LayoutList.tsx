import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoBlock, InfoBlockProps } from '../src';
import { LabelWithTooltip } from '../src/components/LabelWithTooltip';

export default {
  title: 'Not stable/Layout/LayoutList',
  component: InfoBlock,
} as Meta;

const Template: StoryFn<InfoBlockProps> = ({ ...args }) => <InfoBlock {...args} />;

export const LayoutList = Template.bind({});

LayoutList.args = {
  groups: [
    {
      title: 'Заголовок',
      items: [
        {
          label: <LabelWithTooltip label='Размер, ГБ' tooltip={{ content: 'Размер, ГБ' }} />,
          value: '10',
        },
        {
          label: 'Название',
          value: 'Test',
        },
        {
          label: 'Название конфигурации',
          value: 'Small',
        },
      ],
    },
  ],
  buttonText: 'Сохранить изменения',
  showButton: true,
};

LayoutList.argTypes = {};

LayoutList.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174807&t=eN8anAcYgN7ZSBEQ-0',
  },
};
