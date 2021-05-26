import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { IRadioProps, Radio } from '../src';

const { COLORS_DRAWER } = EXPORT_VARS;

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
radio.parameters = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};
