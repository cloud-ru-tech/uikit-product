import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputProps } from 'components/Input/helpers/types';

import { Input } from './Input';

export default {
  title: 'Components/Input/Default',
  component: Input,
} as Meta;

const Template: Story<InputProps> = () => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div>
      <Input
        placeholder={'Пример: Project1-bucket106'}
        value={value}
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
      <br />
      <Input
        placeholder={'Пример: Project1-bucket106'}
        value={value}
        onChange={(e): void => {
          setValue(e.target.value || '');
        }}
        allowClear
      />
      <br />
      <Input
        type='number'
        placeholder={'Пример: Project1-bucket106'}
        value={value}
        onChange={(e): void => {}}
        allowClear
        numberMin={0}
        numberMax={5}
      />
      <br />
      <Input disabled value='Some value' allowClear />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {};
