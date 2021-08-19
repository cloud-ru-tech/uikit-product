import { Meta, Story } from '@storybook/react';

import { EditInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonOverlay, ButtonOverlayProps } from '../src';
import { SingleWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Overlay',
  component: ButtonOverlay,
} as Meta;

const Template: Story<ButtonOverlayProps> = ({ ...args }) => (
  <SingleWrapper>
    <ButtonOverlay {...args} title='Edit' icon={EditInterfaceSVG} />
  </SingleWrapper>
);

export const buttonOverlay = Template.bind({});

buttonOverlay.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1103%3A24006',
});

buttonOverlay.args = getDefaultArgs();
