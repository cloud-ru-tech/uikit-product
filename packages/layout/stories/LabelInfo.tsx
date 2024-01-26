import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { LabelInfo, LabelInfoProps } from '../src';
import { Size } from '../src/components/LabelInfo/constants';

const meta: Meta = {
  title: 'Not stable/Layout/InfoGroup/LabelInfo',
  component: LabelInfo,
};
export default meta;

const Template = ({ ...args }: LabelInfoProps) => <LabelInfo {...args} />;

export const labelInfo: StoryFn<LabelInfoProps> = Template.bind({});

labelInfo.args = {
  label: 'Название',
  tooltip: { content: 'Tooltip' },
  size: Size.Small,
};

labelInfo.argTypes = {};

labelInfo.parameters = {
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
