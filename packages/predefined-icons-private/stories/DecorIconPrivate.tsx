import { Meta, Story } from '@storybook/react/types-6-0';

import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedDecorIconPrivate, PredefinedDecorIconPrivateProps } from '../src';

export default {
  title: 'Components/Icons/Predefined/Predefined Decor Icon Private',
  component: PredefinedDecorIconPrivate,
} as Meta;

const Template: Story<PredefinedDecorIconPrivateProps> = ({ ...args }) => (
  <div>
    <PredefinedDecorIconPrivate {...args} />
  </div>
);

export const predefinedDecorIconPrivate = Template.bind({});
predefinedDecorIconPrivate.args = {
  icon: <QuestionSmallOutlineInterfaceSVG />,
};
predefinedDecorIconPrivate.argTypes = {};
predefinedDecorIconPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=8381%3A105892',
  },
  badges: [BADGE.BETA, BADGE.PRIVATE],
};
