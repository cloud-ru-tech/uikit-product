import { Meta, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import Readme from '../../README.md';
import { Markdown } from './components/markdown/Markdown';

const meta: Meta = {
  title: 'Welcome/Welcome',
};

export default meta;

function Template() {
  const isDark = useDarkMode();

  return <Markdown md={Readme} darkMode={isDark} />;
}

export const welcome: StoryObj = {
  render: Template,
};
