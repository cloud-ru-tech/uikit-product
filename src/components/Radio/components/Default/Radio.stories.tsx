import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { COLORS_DRAWER } from 'theme/color/vars';

import { Radio, IRadioProps } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
} as Meta;

const Wrapper = styled.div`
  background-color: var(${COLORS_DRAWER.BACKGROUND});
  padding: 10px;
`;

const Template: Story<IRadioProps> = ({ ...args }) => (
  <Wrapper>
    <Radio {...args} />
  </Wrapper>
);

export const radio = Template.bind({});
radio.args = {
  value: 'story1',
  label: 'story1',
};
radio.parameters = {};
