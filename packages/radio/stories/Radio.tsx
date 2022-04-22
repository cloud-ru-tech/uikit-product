import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { Radio, RadioGroup, RadioProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Radio/Radio',
  component: Radio,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
  padding: 12px;
`;

const Template: Story<RadioProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <RadioGroup value={'story1'} onChange={(value: React.ReactText) => {}}>
      <Radio {...args} />
    </RadioGroup>
  </Container>
);

export const radio = Template.bind({});

radio.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0?node-id=3457%3A46340',
  extraControlsInclude: ['disabled', 'label', 'value', 'data-test-id'],
});

radio.args = getDefaultArgs({
  disabled: false,
  value: 'story1',
  label: 'Название',
});

radio.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
