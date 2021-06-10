import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { LogsView, LogsViewProps } from '../src';

export default {
  title: 'Not stable/Logs View',
  component: LogsView,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<LogsViewProps> = ({ ...args }) => <LogsView {...args} />;

export const logsView = Template.bind({});
logsView.args = {
  data: {
    demo1: ['item1', 'item2'],
    demo2: ['item3'.repeat(100)],
  },
};
logsView.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
