import { Meta, Story } from '@storybook/react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonRoundBig, ButtonRoundBigProps } from '../src';
import { SingleWrapper } from './helperComponents';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Button/Button Round Big',
  component: ButtonRoundBig,
} as Meta;

const Template: Story<ButtonRoundBigProps> = ({ ...args }) => (
  <SingleWrapper>
    <ButtonRoundBig {...args} title='Play' icon={<CirclePlayFilledInterfaceSVG />} />
  </SingleWrapper>
);

export const buttonRoundBig = Template.bind({});

buttonRoundBig.parameters = getDefaultParameters({
  figmaUrl: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U?node-id=1084%3A48',
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
