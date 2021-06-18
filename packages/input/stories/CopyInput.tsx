import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyInput, CopyInputProps } from '../src';

export default {
  title: 'Not stable/Input/Copy Input',
  component: CopyInput,
} as Meta;

const Template: Story<CopyInputProps> = ({ ...args }) => <CopyInput {...args} />;

export const copyInput = Template.bind({});
copyInput.args = {
  label: '',
  security: false,
  labelMinWidth: '0px',
  value: 'Пример: Project1-bucket106',
};
copyInput.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=4876%3A635',
  },
};
