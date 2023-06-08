import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { ReactText, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { Radio, RadioGroup, RadioGroupProps, RadioProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

const meta: Meta = {
  title: 'Components/Radio/Radio Group',
  component: RadioGroup,
};
export default meta;

const Container = styled.div`
  width: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
  padding: 12px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const Item = css`
  margin: 12px 0;
`;

const radios = [
  {
    value: 'Story0',
    label: 'Radio 1',
    disabled: false,
  },
  {
    value: 'Story1',
    label: 'Radio 2',
    disabled: false,
  },
  {
    value: 'Story2',
    label: 'Radio 3',
    disabled: true,
  },
];

type StoryProps = RadioProps & RadioGroupProps;

function Template({ ...args }: StoryProps) {
  const [value, setValue] = useState<ReactText>('Story1');

  return (
    <>
      <Container>
        <RadioGroup {...args} value={value} onChange={setValue}>
          {radios.map(({ value, label, disabled }) => (
            <Radio {...args} key={value} value={value} label={label} disabled={disabled} className={Item} />
          ))}
        </RadioGroup>
      </Container>
    </>
  );
}

export const radioGroup: StoryFn<StoryProps> = Template.bind({});

radioGroup.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3457%3A46340',
  extraControlsInclude: ['value', 'name', 'data-test-id'],
});

radioGroup.args = getDefaultArgs({
  value: 'Story1',
});

radioGroup.argTypes = {
  value: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
