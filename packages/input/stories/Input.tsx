import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import { H3_STYLES } from '@sbercloud/uikit-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Input, InputProps } from '../src';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 48px;
`;

const Separator = styled(Divider)`
  margin: 50px 0;
`;

const Title = styled.h3`
  ${H3_STYLES};
`;

const Template: Story<InputProps & { showMoreButton: boolean }> = ({ showMoreButton, ...args }) => {
  const [value, setValue] = useState(args.value);
  const [number, setNumber] = useState('0');
  const [password, setPassword] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setValue(args.value), [args.value]);
  const { register, handleSubmit, setValue: formSetValue, formState } = useFormContext();
  const { errors } = formState;

  return (
    <>
      <Block>
        <Input
          {...args}
          error={value === 'error' ? 'You have triggered error' : args.error}
          value={value}
          onChange={setValue}
          moreButton={
            showMoreButton ? { onClick: () => alert('More button clicked!'), tooltipText: 'Menu' } : undefined
          }
          ref={inputRef}
        />
        <Button text={'Focus'} onClick={() => inputRef.current?.focus()} />
      </Block>
      <Separator />
      <Block>
        <Title>Password input</Title>
        <Input
          {...register('password', {
            required: 'Should not be empty',
            pattern: {
              value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
              message: 'Password is too simple, Min length 6, digit, special character, lower and capital characters',
            },
          })}
          placeholder={'password'}
          value={password}
          error={errors?.['password']?.message}
          onChange={x => {
            setPassword(x);
            formSetValue('password', x);
          }}
          type={Input.types.Password}
        />
        <Button
          text={'Validate'}
          onClick={handleSubmit(
            ({ password }) => alert(`"${password}" valid`),
            ({ password }) => alert(password.message),
          )}
        />
      </Block>
      <Separator />
      <Block>
        <Title>Number input [text type]</Title>
        <Input
          {...register('number', {
            required: 'Should not be empty',
            pattern: {
              value: /^[0-9]+$/g,
              message: 'Not a number',
            },
            min: { value: 0, message: 'At least 0' },
            max: { value: 255, message: 'At max 255' },
          })}
          placeholder={'0-255'}
          value={number.toString()}
          error={errors?.['number']?.message}
          onChange={x => {
            setNumber(x);
            formSetValue('number', x, { shouldValidate: true });
          }}
          type={Input.types.Text}
        />
      </Block>
    </>
  );
};

export const input = Template.bind({});
input.args = {
  value: '',
  label: 'Controlled via Controls',
  labelTooltip: {
    content: 'Доступны в шторке сторибука',
  },
  optional: true,
  hint: 'Введите "error", чтобы спровоцировать ошибку',
  maxLength: 50,
  placeholder: 'placeholder',
};
input.argTypes = {
  showMoreButton: {
    type: 'boolean',
    defaultValue: false,
    name: '[Stories]: Show or not More Button',
  },
  type: {
    options: [Input.types.Text, Input.types.Password],
    control: 'radio',
  },
};
input.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=1106%3A23348',
  },
};
