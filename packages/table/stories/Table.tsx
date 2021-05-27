import { Meta, Story } from '@storybook/react/types-6-0';

import { FrameworkComponents, ITableProps, Table } from '../src';

const { Favorites } = FrameworkComponents;

export default {
  title: 'Components/Table',
  component: Table,
} as Meta;

const Template: Story<ITableProps> = args => <Table {...args} />;

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
      favorite: true,
    },
    {
      name: 'Test2',
      lastModified: 1599838941,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
      favorite: false,
    },
  ],
  columnDefs: [
    {
      width: 44,
      minWidth: 44,
      maxWidth: 44,
      headerName: '',
      field: 'favorite',
      colId: 'favorite',
      sortable: false,
      cellRenderer: 'Favorites',
    },
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
  frameworkComponents: {
    Favorites,
  },
};

table.argTypes = {};
