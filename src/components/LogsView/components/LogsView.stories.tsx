import { Meta, Story } from '@storybook/react/types-6-0';
import { LogsView, ILogsViewProps } from 'components/LogsView';

export default {
  title: 'Components',
  component: LogsView,
} as Meta;

const Template: Story<ILogsViewProps> = ({ ...args }) => <LogsView {...args} />;

export const logsView = Template.bind({});
logsView.args = {
  data: {
    demo1: ['item1', 'item2'],
    demo2: ['item3'.repeat(100)],
  },
};
logsView.parameters = {};
