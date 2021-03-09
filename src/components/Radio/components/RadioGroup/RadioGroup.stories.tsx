import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RadioGroup } from './RadioGroup';
import { Radio } from '../Default';

export default {
  title: 'Components/RadioGroup',
  component: Radio,
} as Meta;

const Template: Story = ({ children, ...args }) => {
  const [value, setValue] = useState('story2');

  return (
    <RadioGroup
      name='stories'
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
    >
      {[...new Array(3)].map((_value, index) => (
        <Radio
          {...args}
          key={index}
          value={`story${index}`}
          label={`story${index}`}
          description={`description${index}`}
        />
      ))}
    </RadioGroup>
  );
};

export const RadioGroupTemplate = Template.bind({});

RadioGroupTemplate.args = {};

RadioGroupTemplate.parameters = {};
