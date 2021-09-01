import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { IntelOneApiServiceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { Radio, RadioCard, RadioCardProps, RadioGroup, RadioGroupProps, RadioProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';
import { Card } from './helpersComponents';

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

const Template: Story<RadioProps & RadioCardProps & RadioGroupProps> = ({ ...args }, { globals: { theme } }) => {
  const [value, setValue] = useState<React.ReactText>('Story1');

  return (
    <>
      <Container theme={theme}>
        <RadioGroup {...args} value={value} onChange={(value: React.ReactText) => setValue(value)}>
          {[...new Array(2)].map((_value, index) => (
            <Radio {...args} key={index} value={`Story${index}`} label={`Story${index}`} className={Item} />
          ))}
        </RadioGroup>
      </Container>

      <Container theme={theme}>
        <RadioGroup {...args} value={value} onChange={(value: React.ReactText) => setValue(value)}>
          {[...new Array(2)].map((_value, index) => {
            const currValue = `Story${index}`;
            const checked = currValue === value;
            return (
              <RadioCard {...args} key={index} value={currValue} className={Item}>
                <Card
                  icon={<IntelOneApiServiceSVG size={20} />}
                  label={`Story${index}`}
                  description='Description'
                  checked={checked}
                />
              </RadioCard>
            );
          })}
        </RadioGroup>
      </Container>
    </>
  );
};

export const radioGroup = Template.bind({});

radioGroup.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0?node-id=3457%3A46340',
  extraControlsInclude: ['value', 'name'],
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
