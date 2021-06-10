import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyButton, CopyButtonProps } from '../src';

export default {
  title: 'Not stable/Button/Copy Button',
  component: CopyButton,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<CopyButtonProps> = ({ ...args }) => <CopyButton {...args} />;

export const copyButton = Template.bind({});
copyButton.args = {
  text: 'Copy text',
};
copyButton.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
