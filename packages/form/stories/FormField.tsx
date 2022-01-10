import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { SimpleInput } from '@sbercloud/uikit-react-input-private';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FormField, FormFieldProps } from '../src';

const { COLORS_DRAWER } = DEPRECATED_EXPORT_VARS;

export default {
  title: 'Not stable/Form/Form Field',
  component: FormField,
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
        <SimpleInput value={value.toString()} onChange={x => setValue(Number(x))} error={Boolean(error)} />
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
  hint: {
    content: 'Подсказка',
    link: {
      text: 'link',
      href: 'https://yandex.com',
    },
  },
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
