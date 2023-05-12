import { Meta, StoryFn } from '@storybook/react';

import Readme from '../../../README.md';
import { Markdown } from '../markdown/Markdown';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Welcome/Welcome',
} as Meta;

const Template: StoryFn = () => <Markdown md={Readme} />;

export const welcome = Template.bind({});
welcome.args = {};
welcome.argTypes = {};
