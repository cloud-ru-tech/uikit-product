import { Meta, StoryObj } from '@storybook/react';
import { HeaderContext } from '@tanstack/react-table';
import { useMemo } from 'react';

import { TagRow, TagRowProps } from '@snack-uikit/tag';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileTable, MobileTableProps } from '../src';
import { STORY_TEST_IDS } from './constants';
import { generateRows, numberFormatter } from './helpers';
import { Filters, StubData } from './types';

const meta: Meta = {
  title: 'Mobile/Table',
  component: MobileTable,
};
export default meta;

type Props = MobileTableProps<StubData, Filters>;

type StoryProps = Props & {
  rowsAmount: number;
  showActionsColumn?: boolean;
};

const renderHeader = (ctx: HeaderContext<StubData, unknown>) => `Table column №${ctx.column.id}`;
const accessorFn = (key: keyof StubData) => (row: StubData) =>
  `Cell ${Math.trunc(Number(row[key]) / 5) + 1}.${(Number(row[key]) % 5) + 1}`;

const tags: TagRowProps['items'] = [
  { label: 'tag1xxx', appearance: 'red' },
  { label: 'tag2x', appearance: 'yellow' },
  { label: 'tag3xxxxx', appearance: 'orange' },
  { label: 'tag4xx', appearance: 'green' },
  { label: 'tag5xxx', appearance: 'blue' },
  { label: 'tag6x', appearance: 'pink' },
];

const columnFilters: Props['columnFilters'] = {
  filters: [
    {
      id: 'single',
      type: 'single',
      label: 'Single',
      pinned: true,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      id: 'multiple',
      type: 'multiple',
      label: 'Multiple',
      pinned: true,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      id: 'single2',
      type: 'single',
      label: 'Single with apply button',
      autoApply: false,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      id: 'multiple2',
      type: 'multiple',
      label: 'Multiple with apply button',
      autoApply: false,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      id: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      id: 'time',
      type: 'time',
      label: 'Time',
    },
  ],
};

const columnDefinitions: Props['columnDefinitions'] = [
  {
    id: '1',
    accessorKey: 'col1',
    accessorFn: accessorFn('col1'),
    header: renderHeader,
    size: 140,
    enableSorting: true,
    enableResizing: true,
    sortDescFirst: true,
    pinned: 'left',
  },
  {
    id: '2',
    accessorKey: 'col2',
    accessorFn: accessorFn('col2'),
    header: renderHeader,
    size: 200,
    minSize: 150,
    maxSize: 300,
    pinned: 'left',
    enableSorting: true,
    enableResizing: true,
  },
  {
    id: '3',
    accessorKey: 'col3',
    accessorFn: accessorFn('col3'),
    header: renderHeader,
    minSize: 110,
    sortDescFirst: true,
    enableResizing: true,
  },
  {
    id: '4',
    accessorKey: 'col4',
    accessorFn: accessorFn('col4'),
    header: renderHeader,
    enableSorting: true,
    enableResizing: true,
  },
  {
    id: '6',
    accessorKey: 'col6',
    cell: cell => numberFormatter.format(cell.getValue<number>()),
    header: renderHeader,
    size: 150,
    headerAlign: 'right',
    align: 'right',
    enableSorting: true,
    enableResizing: false,
  },
  {
    id: '7',
    accessorKey: 'col7',
    cell: () => <TagRow items={tags} rowLimit={1} />,
    header: renderHeader,
    size: 230,
  },
  {
    id: '8',
    accessorKey: 'date',
    header: renderHeader,
    enableSorting: true,
    enableResizing: true,
    size: 146,
    align: 'right',
    pinned: 'right',
    sortingFn: (a, b) => a.original.date - b.original.date,
    accessorFn: row =>
      new Date(row.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
  },
];

function Template({ rowsAmount, columnDefinitions, showActionsColumn, className, ...args }: StoryProps) {
  const data = useMemo(() => generateRows(rowsAmount), [rowsAmount]);

  const columns = useMemo(() => {
    const colDefs = [...columnDefinitions];

    if (showActionsColumn) {
      const handleRowActionClick = ({ rowId, itemId }: { rowId: string; itemId: string }) => {
        toaster.userAction.success({
          label: `${rowId} ${itemId}`,
          'data-test-id': STORY_TEST_IDS.toaster,
        });
      };

      colDefs.push(
        MobileTable.getRowActionsColumnDef({
          pinned: true,
          actionsGenerator: cell => [
            {
              id: 'action-1',
              content: { option: 'action 1' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-1' }),
              'data-test-id': 'test-custom',
            },
            {
              id: 'action-2',
              content: { option: 'action 2' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-2' }),
            },
            {
              id: 'action-3',
              content: { option: 'action 3' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-3' }),
            },
            {
              id: 'group-1',
              type: 'group',
              items: [
                {
                  id: 'action-4',
                  content: { option: 'action 4' },
                  onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-4' }),
                },
              ],
              divider: true,
            },
          ],
        }),
      );
    }

    return colDefs;
  }, [columnDefinitions, showActionsColumn]);

  return <MobileTable {...args} columnDefinitions={columns} data={data} className={className} />;
}

export const table: StoryObj<StoryProps> = {
  render: Template,

  args: {
    headlineId: '1',
    rowsAmount: 35,
    data: [],
    columnDefinitions,
    columnFilters,
    showActionsColumn: true,
  },

  argTypes: {
    rowsAmount: {
      name: '[Stories]: Amount of rows within the table',
      description: 'demonstration purposes only, this parameter does not exist in component',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    showActionsColumn: {
      name: '[Stories]: Show RowActions',
      control: {
        type: 'boolean',
      },
    },
  },

  parameters: {
    controls: { expanded: true },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=14642-14473&t=8dfUAMrMM572CoFw-0',
    },
  },
};
