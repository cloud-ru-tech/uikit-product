import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Textarea, TextareaProps } from '../src';

const meta: Meta = {
  title: 'Components/Textarea',
  component: Textarea,
};
export default meta;

const FocusBtn = styled(Button)`
  margin-top: 16px;
`;

const Separator = styled(Divider)`
  margin-top: 50px;
`;

function Template({ ...args }: TextareaProps) {
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
}

export const textarea: StoryFn<TextareaProps> = Template.bind({});
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
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=12016%3A185323',
  },
};
