import { Meta, Story } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ButtonRoundBig, ButtonRoundBigProps } from '../src';
import { SingleWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Round Big',
  component: ButtonRoundBig,
} as Meta;

const Template: Story<ButtonRoundBigProps> = ({ ...args }) => (
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
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=212%3A0',
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
