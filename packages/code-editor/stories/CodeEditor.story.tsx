import { Meta, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import { Markdown } from '../../../storybook/stories/components/markdown/Markdown';
import Doc from '../README.md';

const meta: Meta = {
  title: 'Console/Code Editor',
};
export default meta;

function Template() {
  const isDark = useDarkMode();

  return <Markdown md={Doc} darkMode={isDark} />;
}

export const CodeEditor: StoryObj = {
  render: Template,
};
