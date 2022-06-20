import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { Radio, RadioGroup, RadioGroupProps, RadioProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Radio/Radio Group',
  component: RadioGroup,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
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

const Template: Story<RadioProps & RadioGroupProps> = ({ ...args }, { globals: { theme } }) => {
  const [value, setValue] = useState<React.ReactText>('Story1');

  return (
    <>
      <Container theme={theme}>
        <RadioGroup {...args} value={value} onChange={setValue}>
          {radios.map(({ value, label, disabled }) => (
            <Radio {...args} key={value} value={value} label={label} disabled={disabled} className={Item} />
          ))}
        </RadioGroup>
      </Container>
    </>
  );
};

export const radioGroup = Template.bind({});

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
