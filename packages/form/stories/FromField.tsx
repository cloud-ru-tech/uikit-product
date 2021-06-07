import { styled } from '@linaria/react';
import { Input } from '@sbercloud/uikit-react-input';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FormField, FormFieldProps } from '../src';

const { COLORS_DRAWER } = EXPORT_VARS;

export default {
  title: 'Components/Form',
  component: FormField,
  decorators: [addReadme, withDesign],
} as Meta;

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(${COLORS_DRAWER.BACKGROUND});
`;

const Template: Story<FormFieldProps> = ({ label, hint, error, required, description }) => {
  const [value, setValue] = useState(8);

  return (
    <Wrapper>
      <FormField label={label} hint={hint} error={error} required={required} description={description}>
        <Input type='number' value={value} onChange={e => setValue(Number(e.target.value))} error={Boolean(error)} />
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
  description: {
    control: {
      type: 'text',
    },
  },
  error: {
    control: {
      type: 'text',
    },
  },
  required: {
    control: {
      type: 'boolean',
    },
  },
};
formField.args = {
  label: 'Произвольное число',
  hint: 'Подсказка',
  description:
    'Можно использовать строчные буквы латинского алфавита (a-z); цифры (0-9); символ тире (-). Начинаться обязательно должно с буквы, заканчиваться может буквой или цифрой, максимум 16 символов. Например: test-1',
  error: 'Некорректный формат',
};
formField.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/TEMP-DESIGN-SYSTEM?node-id=388%3A9820',
  },
};
