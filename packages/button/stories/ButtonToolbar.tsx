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
    tooltip={{ content: 'Add', placement: ButtonToolbar.placements.Bottom }}
    disabledTooltip={{ content: 'Unavailable', placement: ButtonToolbar.placements.Bottom }}
    icon={<CircleAddInterfaceSVG />}
  />
);

export const buttonToolbar = Template.bind({});

buttonToolbar.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=6471%3A89335',
});

buttonToolbar.args = getDefaultArgs();
