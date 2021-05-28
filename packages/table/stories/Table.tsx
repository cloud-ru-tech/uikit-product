import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FrameworkComponents, ITableProps, Table } from '../src';

const { Favorites } = FrameworkComponents;

export default {
  title: 'Components/Table',
  component: Table,
  decorators: [addReadme, withDesign],
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
table.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
