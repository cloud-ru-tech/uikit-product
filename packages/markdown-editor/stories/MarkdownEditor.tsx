import { styled } from '@linaria/react';
import { useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MarkdownEditor, MarkdownEditorProps } from '../src';

export default {
  title: 'Not stable/Markdown Editor',
  component: MarkdownEditor,
} as Meta;

const Wrapper = styled.div`
  height: 500px;
`;

const markdownText = `# Heading

Text that is not a quote

> Text that is a quote

1. First list item
   - First nested list item
     - Second nested list item
`;

const Template: Story<MarkdownEditorProps> = ({ ...args }) => {
  const [value, setValue] = useState<string>(markdownText);

  return (
    <Wrapper>
      <MarkdownEditor {...args} value={value} onChange={setValue} />
    </Wrapper>
  );
};

export const markdownEditor = Template.bind({});
markdownEditor.args = {
  mode: MarkdownEditor.modes.View,
};
markdownEditor.argTypes = {
  value: {
    control: false,
  },
  onChange: {
    control: false,
  },
  mode: {
    options: Object.values(MarkdownEditor.modes),
    control: {
      type: 'radio',
    },
  },
};
markdownEditor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
