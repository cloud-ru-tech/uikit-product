import { Meta, StoryFn } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonRoundBig, ButtonRoundBigProps } from '../src';
import { SingleWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Round Big',
  component: ButtonRoundBig,
} as Meta;

const Template: StoryFn<ButtonRoundBigProps> = ({ ...args }: ButtonRoundBigProps) => (
  <SingleWrapper>
    <ButtonRoundBig
      {...args}
      tooltip={{ content: 'Play', placement: ButtonRoundBig.placements.Top }}
      disabledTooltip={{ content: 'Unavailable', placement: ButtonRoundBig.placements.Top }}
      icon={<CirclePlayFilledInterfaceSVG />}
    />
  </SingleWrapper>
);

export const buttonRoundBig = Template.bind({});

buttonRoundBig.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11464%3A168649',
  extraControlsInclude: ['text'],
});

buttonRoundBig.args = getDefaultArgs({ text: 'Button text' });

buttonRoundBig.argTypes = {
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
