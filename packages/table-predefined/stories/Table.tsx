import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ChipChoiceRow } from '@snack-uikit/chips';
import { HeaderContext, RowActionInfo, RowClickHandler, RowSelectionState } from '@snack-uikit/table';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ColumnDefinition, Table, TableProps } from '../src';
import { Filters, filtersMock, generateRows, numberFormatter } from './helpers';
import styles from './styles.module.scss';
import { StubData } from './types';

const meta: Meta = {
  title: 'Snack Uikit/Table Predefined/Table',
  component: Table,
};
export default meta;

type Props = TableProps<StubData>;

type StoryProps = Omit<Props, 'rowSelection' | 'sort'> & {
  rowSelection?: { enable: boolean; multiRow: boolean };
  rowsAmount: number;
  disableSomeRows: boolean;
  showActionsColumn?: boolean;
  rowSelectionMode?: 'single' | 'multi';
  enableOnRowClick: boolean;
};

const renderHeader = (ctx: HeaderContext<StubData, unknown>) => `Table column №${ctx.column.id}`;
const accessorFn = (key: keyof StubData) => (row: StubData) =>
  `Cell ${Math.trunc(Number(row[key]) / 5) + 1}.${(Number(row[key]) % 5) + 1}`;

const columnDefinitions: ColumnDefinition<StubData>[] = [
  {
    id: '1',
    accessorKey: 'col1',
    accessorFn: accessorFn('col1'),
    header: renderHeader,
    size: 140,
    enableSorting: true,
    sortDescFirst: true,
    pinned: 'left',
  },
  {
    id: '2',
    accessorKey: 'col2',
    accessorFn: accessorFn('col2'),
    header: renderHeader,
    size: 140,
    pinned: 'left',
    enableSorting: true,
  },

  {
    id: '4',
    accessorKey: 'col4',
    accessorFn: accessorFn('col4'),
    header: renderHeader,
    enableSorting: true,
  },
  {
    id: '5',
    accessorKey: 'col5',
    header: renderHeader,
    accessorFn: accessorFn('col5'),
    enableSorting: true,
  },
  {
    id: '6',
    accessorKey: 'col6',
    cell: cell => numberFormatter.format(cell.getValue<number>()),
    header: renderHeader,
    size: 150,
    align: 'right',
    enableSorting: true,
  },
  {
    id: '7',
    accessorKey: 'date',
    header: renderHeader,
    enableSorting: true,
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

const Template: StoryFn<StoryProps> = ({
  columnDefinitions,
  rowsAmount,
  disableSomeRows,
  showActionsColumn,
  rowSelectionMode,
  enableOnRowClick,
  ...args
}: StoryProps) => {
  const data = useMemo(() => generateRows(rowsAmount), [rowsAmount]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onDelete = useCallback(
    (rowSelectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void) => {
      setFilteredData(data => data.filter((_, index) => !rowSelectionState?.[index]));
      resetRowSelection();
    },
    [],
  );

  const columns = useMemo(() => {
    let colDefs = [...columnDefinitions];

    const statusColDefProps = {
      header: 'Status',
      size: 100,
      renderDescription: (value: string) => value,
    };

    colDefs = [
      Table.getStatusColumnDef<StubData>({
        accessorKey: 'status',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mapStatusToAppearance: (value: string) => value,
        ...statusColDefProps,
      }),
      ...colDefs,
    ];

    if (showActionsColumn) {
      const handleRowActionClick = (row: RowActionInfo<StubData>) => {
        toaster.userAction.success({
          label: `${row.rowId} ${row.itemId}`,
        });
      };

      colDefs.push(
        Table.getRowActionsColumnDef({
          pinned: true,
          actionsGenerator: () => [
            {
              id: 'action-1',
              option: 'action 1',
              onClick: handleRowActionClick,
            },
            {
              id: 'action-2',
              option: 'action 2',
              onClick: handleRowActionClick,
            },
            {
              id: 'action-3',
              option: 'action 3',
              onClick: handleRowActionClick,
            },
          ],
        }),
      );
    }

    return colDefs;
  }, [columnDefinitions, showActionsColumn]);

  const handleRowClick: RowClickHandler<StubData> = (_, row) => {
    toaster.userAction.success({
      label: `clicked row ${row.id}`,
    });
  };

  const onRefresh = () => {
    setFilteredData(data);
  };

  const [state, setState] = useState<Filters>({} as Filters);

  return (
    <div className={styles.wrapper}>
      <Table
        {...args}
        columnDefinitions={columns}
        data={filteredData}
        onDelete={onDelete}
        className={styles.className}
        columnFilters={<ChipChoiceRow<Filters> filters={filtersMock} value={state} onChange={setState} />}
        pagination={{
          options: [5, 10],
        }}
        rowSelection={{
          multiRow: rowSelectionMode === 'multi',
          enable: disableSomeRows
            ? row => !['Not', 'Loading'].includes(row.original.status)
            : Boolean(rowSelectionMode) || undefined,
        }}
        onRefresh={onRefresh}
        onRowClick={enableOnRowClick ? handleRowClick : undefined}
      />
    </div>
  );
};

export const table: StoryObj<StoryProps> = Template.bind({});

table.args = {
  suppressPagination: false,
  suppressToolbar: false,

  rowsAmount: 35,

  loading: false,

  showActionsColumn: true,
  data: [],
  columnDefinitions,
  rowSelection: {
    enable: true,
    multiRow: true,
  },
  rowSelectionMode: 'multi',
  disableSomeRows: false,
  onRowClick: () => {},
  enableOnRowClick: false,
};

table.argTypes = {
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
  disableSomeRows: {
    name: '[Stories]: Make some rows disabled',
    control: {
      type: 'boolean',
    },
    if: { arg: 'rowSelectionMode', truthy: true },
  },
  showActionsColumn: {
    name: '[Stories]: Show RowActions',
    control: {
      type: 'boolean',
    },
  },
  rowSelection: {
    name: 'rowSelection',
    description: 'Disabled for storybook and tests purpose',
    control: {
      type: 'disabled',
    },
  },
  rowSelectionMode: {
    name: '[Stories]: Choose row selection mode',
    options: [undefined, 'multi', 'single'],
    control: {
      type: 'select',
    },
  },
  enableOnRowClick: {
    name: '[Stories]: Enable row click',
    control: {
      type: 'boolean',
    },
  },
  onRowClick: {
    control: {
      type: 'disabled',
    },
  },
};

table.parameters = {
  controls: { expanded: true },
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.0.0?node-id=41%3A225842&mode=dev',
  },
};
