import { Meta, Story } from '@storybook/react';

import { CircleAddInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonToolbar, ButtonToolbarProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Toolbar',
  component: ButtonToolbar,
} as Meta;

const Template: Story<ButtonToolbarProps> = ({ ...args }) => (
  <ButtonToolbar
    {...args}
    tooltip='Add'
    disabledTooltip='Unavailable'
    tooltipPlacement={ButtonToolbar.placements.Bottom}
    icon={<CircleAddInterfaceSVG />}
  />
);

export const buttonToolbar = Template.bind({});

buttonToolbar.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1098%3A22594',
});

buttonToolbar.args = getDefaultArgs();
