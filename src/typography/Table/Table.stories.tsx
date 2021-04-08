import { Story, Meta } from '@storybook/react/types-6-0';

import { TableText } from './index';

export default {
  title: 'Typography/Table',
  component: TableText,
} as Meta;

const Template: Story<{ color: string; children: string }> = ({
  children,
  ...restArgs
}) => (
  <div style={{ color: restArgs.color }}>
    <TableText {...restArgs}>{children} (TableText)</TableText>
  </div>
);

export const table = Template.bind({});
table.args = {
  children: 'Пример',
};
table.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
  children: {
    control: {
      type: 'text',
    },
  },
};
