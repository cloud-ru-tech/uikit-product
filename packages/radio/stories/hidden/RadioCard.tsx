import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { IntelOneApiServiceSVG, ModelInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { RadioCard, RadioCardProps, RadioGroup } from '../../src';
import { getDefaultArgs, getDefaultParameters } from '../helpers';
import { Card, CardDisplay, CardExtended } from '../helpersComponents';

export default {
  title: 'Not stable/Radio/Radio Card',
  component: RadioCard,
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
`;

const Item = css`
  margin: 12px 0;
`;

const radioGroupValue = 'story1';

const Template: Story<RadioCardProps & { checked: boolean }> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <RadioGroup value={radioGroupValue} onChange={(value: React.ReactText) => {}}>
      <RadioCard {...args} value={args.checked ? radioGroupValue : args.value} className={Item}>
        <Card
          icon={<IntelOneApiServiceSVG size={20} />}
          label='Title'
          description='Description'
          disabled={args.disabled}
          checked={args.value === radioGroupValue}
        />
      </RadioCard>

      <RadioCard {...args} value={args.checked ? radioGroupValue : args.value} className={Item}>
        <CardDisplay
          icon={<ModelInterfaceSVG size={32} />}
          label='Model'
          disabled={args.disabled}
          checked={args.value === radioGroupValue}
        />
      </RadioCard>

      <RadioCard {...args} value={args.checked ? radioGroupValue : args.value} className={Item}>
        <CardExtended
          title='Title'
          label='Value'
          description='Description'
          disabled={args.disabled}
          checked={args.value === radioGroupValue}
        />
      </RadioCard>
    </RadioGroup>
  </Container>
);

export const radioCard = Template.bind({});

radioCard.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0?node-id=3457%3A46340',
  extraControlsInclude: ['value', 'disabled', 'checked'],
});

radioCard.args = getDefaultArgs({
  disabled: false,
  checked: false,
  value: 'story0',
});

radioCard.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  value: {
    control: {
      required: true,
      type: 'text',
    },
  },
  checked: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
  },
};
