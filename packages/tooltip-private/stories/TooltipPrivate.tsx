import { styled } from '@linaria/react';
import { Text2 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TooltipPrivate, TooltipPrivateProps } from '../src';

export default {
  title: 'Not stable/TooltipPrivate/Tooltip Private',
  component: TooltipPrivate,
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const Template: Story<TooltipPrivateProps> = ({ ...args }) => (
  <TooltipWrapper>
    <TooltipPrivate {...args}>
      <Text2>Basic</Text2>
    </TooltipPrivate>
  </TooltipWrapper>
);

export const tooltipPrivate = Template.bind({});
tooltipPrivate.args = {
  tooltip: 'Здесь будут показаны примененные фильтры',
};
tooltipPrivate.argTypes = {};
tooltipPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
};
