import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITextareaProps, Textarea } from '../src';

export default {
  title: 'Not stable/Input',
  component: Textarea,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<ITextareaProps> = ({ ...args }) => <Textarea {...args} />;

export const textarea = Template.bind({});
textarea.args = {};
textarea.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
