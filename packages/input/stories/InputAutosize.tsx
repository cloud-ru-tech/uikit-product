import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { IAutosizeInputProps, InputAutosize } from '../src';

export default {
  title: 'Components/Input',
  component: InputAutosize,
} as Meta;

const Template: Story<IAutosizeInputProps> = () => {
  const [inputValue, setValue] = useState<string>();

  return (
    <InputAutosize
      name='form-field-name'
      value={inputValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
      }}
    />
  );
};

export const inputAutosize = Template.bind({});
inputAutosize.args = {};
inputAutosize.parameters = {};
