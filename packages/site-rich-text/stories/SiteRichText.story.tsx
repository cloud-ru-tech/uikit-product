import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { RichText, RichTextProps } from '../src';
import { RICH_TEXT } from './constants';

const meta: Meta = {
  title: 'Site/Rich Text',
  component: RichText,
};
export default meta;

const Template: StoryFn<RichTextProps> = ({ ...args }) => <RichText {...args} />;

export const richText: StoryObj<RichTextProps> = {
  render: Template,
  args: {
    richText: RICH_TEXT,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
