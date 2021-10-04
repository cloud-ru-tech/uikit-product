import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITableFreeProps, TableFree } from '../src';

export default {
  title: 'Not stable/Table/Free',
  component: TableFree,
} as Meta;

const Template: Story<ITableFreeProps> = args => <TableFree {...args} />;

export const free = Template.bind({});
free.args = {
  checkboxSelection: true,
  pageSize: undefined,
  rowData: [
    {
      name: 'Test 1',
      lastModified: 1,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
    {
      name: 'Test 2',
      lastModified: 2,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
    {
      name: 'Test 3',
      lastModified: 3,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
    {
      name: 'Test 4',
      lastModified: 4,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
    {
      name: 'Test 5',
      lastModified: 5,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'success',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
      disabled: true,
    },
    {
      name: 'Test 6',
      lastModified: 6,
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

free.argTypes = {
  pageSize: {
    name: 'pageSize (does not enable dynamically, only by default after reload page)',
    control: {
      type: 'number',
    },
  },
};
free.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
