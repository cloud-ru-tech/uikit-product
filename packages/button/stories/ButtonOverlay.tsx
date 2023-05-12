import { Meta, StoryFn } from '@storybook/react';

import { EditInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonOverlay, ButtonOverlayProps } from '../src';
import { SingleWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Overlay',
  component: ButtonOverlay,
} as Meta;

const Template: StoryFn<ButtonOverlayProps> = ({ ...args }) => (
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
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11464%3A168649',
});

buttonOverlay.args = getDefaultArgs();
