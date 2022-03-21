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
    <ButtonOverlay
      {...args}
      tooltip={{ content: 'Edit', placement: ButtonOverlay.placements.Bottom }}
      disabledTooltip={{ content: 'Unavailable', placement: ButtonOverlay.placements.Bottom }}
      icon={<EditInterfaceSVG />}
    />
  </SingleWrapper>
);

export const buttonOverlay = Template.bind({});

buttonOverlay.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
});

buttonOverlay.args = getDefaultArgs();
