import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS_GENERAL } from 'theme/color/vars';
import { TableText, TTableProps } from './index';

export default {
  title: 'Typography/Table',
  component: TableText,
} as Meta;

const Template: Story<TTableProps & { children: string }> = args => (
  <div>
    <TableText {...args}>{args.children} (TableText)</TableText>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: `var(${COLORS_GENERAL.TEXT})`,
  children: 'Пример',
};

Default.argTypes = {
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
