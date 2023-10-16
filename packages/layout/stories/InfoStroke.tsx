import { Meta, StoryFn } from '@storybook/react';

import { TextField } from '@sbercloud/uikit-product-text-field';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoStroke, InfoStrokeProps, LabelInfo } from '../src';

export default {
  title: 'Not stable/Layout/InfoGroup/InfoStroke',
  component: InfoStroke,
} as Meta;

const Template: StoryFn<InfoStrokeProps> = ({ ...args }) => <InfoStroke {...args} />;

export const infoStroke = Template.bind({});

infoStroke.args = {
  label: <LabelInfo label='Название' tooltip={{ content: 'Название' }} size={LabelInfo.sizes.Large} />,
  value: <TextField text='Text' size={TextField.sizes.Large} allowCopy />,
  topDivider: true,
  bottomDivider: true,
};

infoStroke.argTypes = {};

infoStroke.parameters = {
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
