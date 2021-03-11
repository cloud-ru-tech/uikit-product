import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RadioGroup } from './RadioGroup';
import { Radio } from '../Default';

export default {
  title: 'Components/Radio',
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
          key={index}
          value={`story${index}`}
          label={`story${index}`}
          description={`description${index}`}
          {...args}
        />
      ))}
    </RadioGroup>
  );
};

export const radioGroup = Template.bind({});
radioGroup.args = {};
radioGroup.parameters = {};
