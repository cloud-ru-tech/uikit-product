import { Meta, StoryFn } from '@storybook/react';

import { InputCommon } from '@sbercloud/uikit-product-input';
import { TextField } from '@sbercloud/uikit-product-text-field';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoGroup, InfoGroupProps, LabelInfo } from '../src';

export default {
  title: 'Snack UIkit/Layout/InfoGroup/InfoGroup',
  component: InfoGroup,
} as Meta;

const Template: StoryFn<InfoGroupProps> = ({ ...args }) => <InfoGroup {...args} />;

export const infoGroup = Template.bind({});

infoGroup.args = {
  items: [
    {
      label: <LabelInfo size='l' label='Название' tip={'Название'} />,
      value: <TextField size={TextField.sizes.Large} text='Space' allowCopy />,
    },
    {
      label: <LabelInfo size='l' label='Описание' />,
      value: <InputCommon size={InputCommon.sizes.Large} value={'Some text'} onChange={() => {}} />,
    },
    {
      label: <LabelInfo label='Название конфигурации, длинный текст' tip={'Название конфигурации'} />,
      value: 'Small',
    },
    {
      label: <LabelInfo label='vCPU' />,
      value: '0.1 vCPU – 128 MB',
    },
  ],
  buttonText: 'Сохранить изменения',
  showButton: true,
};

infoGroup.argTypes = {};

infoGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174807&t=eN8anAcYgN7ZSBEQ-0',
  },
};
