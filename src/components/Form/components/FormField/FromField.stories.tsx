import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { Input } from 'components';

import { COLORS_DRAWER } from 'theme/color/vars';

import { FormField } from './FormField';

export default {
  title: 'Components/Form',
  component: FormField,
} as Meta;

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(${COLORS_DRAWER.BACKGROUND});
`;

const Template: Story = ({ label, hint, error }) => {
  const [value, setValue] = useState(8);

  return (
    <Wrapper>
      <FormField label={label} hint={hint} error={error}>
        <Input
          type='number'
          value={value}
          onChange={e => setValue(Number(e.target.value))}
        />
      </FormField>
    </Wrapper>
  );
};

export const formField = Template.bind(null);
formField.argTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  hint: {
    control: {
      type: 'text',
    },
  },
  error: {
    control: {
      type: 'text',
    },
  },
};
formField.args = {
  label: 'Произвольное число',
  hint: 'Подсказка',
  error: 'Некорректный формат',
};
