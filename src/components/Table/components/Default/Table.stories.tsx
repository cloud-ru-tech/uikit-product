import { Story, Meta } from '@storybook/react/types-6-0';

import { Table, ITableProp } from './Table';

export default {
  title: 'Components/Table',
  component: Table,
} as Meta;

const Template: Story<ITableProp> = args => <Table {...args} />;

export const table = Template.bind({});
table.args = {
  checkboxSelection: true,
  rowData: [
    {
      name: 'Test',
      lastModified: 1599838941,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
  ],
  columnDefs: [
    {
      headerName: 'Последнее обновление',
      field: 'lastModified',
    },
    {
      headerName: '',
      field: 'status',
      sortable: false,
    },
    {
      headerName: 'Доступ',
      field: 'access',
      colId: 'access',
    },
    {
      headerName: '',
      minWidth: 44,
      width: 44,
      sortable: false,
      resizable: false,
    },
  ],
};

table.argTypes = {};
