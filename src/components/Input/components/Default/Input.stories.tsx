import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IInputProps } from 'components/Input/helpers/types';

import { Input } from './Input';

export default {
  title: 'Components/Input/Default',
  component: Input,
} as Meta;

const Template: Story<IInputProps> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Input
      {...args}
      placeholder='Пример: Project1-bucket106'
      value={value}
      onChange={(e): void => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
