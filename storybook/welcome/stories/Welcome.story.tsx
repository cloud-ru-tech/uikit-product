import { Meta, StoryObj } from '@storybook/react';

import Readme from '../../../README.md';
import { Markdown } from '../markdown/Markdown';

const meta: Meta = {
  title: 'Welcome/Welcome',
};
// eslint-disable-next-line import/no-default-export
export default meta;

function Template() {
  return <Markdown md={Readme} />;
}

export const welcome: StoryObj = {
  render: Template,
};
