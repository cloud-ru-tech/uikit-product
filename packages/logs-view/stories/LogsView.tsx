import { Meta, Story } from '@storybook/react/types-6-0';

import { LogsView, LogsViewProps } from '../src';

export default {
  title: 'Components',
  component: LogsView,
} as Meta;

const Template: Story<LogsViewProps> = ({ ...args }) => <LogsView {...args} />;

export const logsView = Template.bind({});
logsView.args = {
  data: {
    demo1: ['item1', 'item2'],
    demo2: ['item3'.repeat(100)],
  },
};
logsView.parameters = {};
