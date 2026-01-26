import { Meta, StoryObj } from '@storybook/react';

import { Markdown } from '../../../storybook/stories/components/markdown/Markdown';
import Doc from '../README.md';

const meta: Meta = {
  title: 'Console/Code Editor',
};
export default meta;

function Template() {
  return <Markdown md={Doc} />;
}

export const CodeEditor: StoryObj = {
  render: Template,
};
