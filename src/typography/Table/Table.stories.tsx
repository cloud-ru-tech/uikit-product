import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS_GENERAL } from 'theme/color/vars';
import { TableText, TTableProps } from './index';

export default {
  title: 'Typography/Table',
  component: TableText,
} as Meta;

const Template: Story<TTableProps & { children: string }> = ({
  children,
  ...restArgs
}) => (
  <div>
    <TableText {...restArgs}>{children} (TableText)</TableText>
  </div>
);

export const table = Template.bind({});
table.args = {
  color: `var(${COLORS_GENERAL.TEXT})`,
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
