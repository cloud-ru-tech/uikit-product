import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Divider, DividerProps } from '../src';

export default {
  title: 'Not stable/Divider',
  component: Divider,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<DividerProps> = ({ ...args }) => <Divider {...args} />;

export const divider = Template.bind({});
divider.args = {
  color: 'dark',
};
divider.argTypes = {
  color: {
    control: {
      type: 'radio',
      options: ['dark', 'middle', 'light'],
    },
  },
};
divider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
