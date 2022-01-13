import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Textarea, TextareaProps } from '../src';

export default {
  title: 'Components/Textarea',
  component: Textarea,
} as Meta;

const FocusBtn = styled(Button)`
  margin-top: 16px;
`;

const Separator = styled(Divider)`
  margin-top: 50px;
`;

const Template: Story<TextareaProps> = ({ ...args }) => {
  const [value, setValue] = useState(args.value || '');
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Textarea
        {...args}
        value={value}
        onChange={setValue}
        ref={ref}
        error={(value === 'error' && 'You have triggered error') || args.error}
      />
      <Separator />
      <FocusBtn text={'Focus'} onClick={() => ref.current?.focus()} />
    </>
  );
};

export const textarea = Template.bind({});
textarea.args = {
  placeholder: 'placeholder',
  label: 'Label',
  value: '',
  optional: true,
  maxLength: 120,
  hint: 'Введите "error", чтобы спровоцировать ошибку',
  labelTooltip: {
    content: 'Подсказка',
  },
};
textarea.argTypes = {};
textarea.parameters = {
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
