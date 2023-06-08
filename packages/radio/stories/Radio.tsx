import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { Radio, RadioGroup, RadioProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Radio/Radio',
  component: Radio,
};
export default meta;

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
  padding: 12px;
`;

function Template({ ...args }: RadioProps) {
  return (
    <Container>
      <RadioGroup value={'story1'} onChange={() => {}}>
        <Radio {...args} />
      </RadioGroup>
    </Container>
  );
}

export const radio: StoryFn<RadioProps> = Template.bind({});

radio.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3457%3A46340',
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
