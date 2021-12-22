import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useRef, useState } from 'react';

import { Attention } from '@sbercloud/uikit-react-attention';
import { Button } from '@sbercloud/uikit-react-button';

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

const Note = styled.div`
  margin-top: 16px;
`;

const Template: Story<TextareaProps> = ({ ...args }) => {
  const [value, setValue] = useState(args.value || '');
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Textarea {...args} value={value} onChange={setValue} ref={ref} error={value === 'error' || args.error} />
      <Note>
        <Attention>Введите &quot;error&quot;, чтобы спровоцировать ошибку</Attention>
      </Note>
      <FocusBtn text={'Focus'} onClick={() => ref.current?.focus()} />
    </>
  );
};

export const textarea = Template.bind({});
textarea.args = {
  placeholder: 'placeholder',
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
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-MLS-%2B-CP-Design-System?node-id=4298%3A67117',
  },
};
