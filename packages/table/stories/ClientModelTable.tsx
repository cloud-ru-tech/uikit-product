import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ButtonTable, ButtonTableIcon } from '@sbercloud/uikit-product-button';
import { LogicConditionType, TFilterOptionType, TFilterValueType } from '@sbercloud/uikit-product-filter';
import { StatusDot } from '@sbercloud/uikit-product-status';
import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ClientModelTable as CMTable, ClientModelTableProps } from '../src';
import { sizeFormatter } from './helpers/sizeFormatter';
import { StatusCell } from './helpers/StatusCellRenderer';

const meta: Meta = {
  title: 'Not stable/Table/Client Model Table',
  component: CMTable,
};

export default meta;

type DataModel = {
  name: string;
  lastModified: string;
  createDate: string;
  memory: number;
  status: string;
  disabled: boolean;
};

const Container = styled.div`
  display: grid;
  padding: 24px;
  border-radius: 8px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

function generateRows(count: number): DataModel[] {
  const res: DataModel[] = [];
  for (let i = 0; i < count; ++i) {
    const createdTimestamp = Math.floor(Math.random() * 1e13);
    const status = Object.values(StatusDot.types)[Math.floor(Math.random() * 10) % 6];
    res.push({
      name: `name ${i}`,
      createDate: new Date(createdTimestamp).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      memory: 2 ** i,
      lastModified: new Date(createdTimestamp + 1e10).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      status: status,
      disabled: status === StatusDot.types.Progress,
    });
  }
  return res;
}

type StoryProps = ClientModelTableProps<DataModel> & {
  rowsAmount: number;
  pinnedRowsAmount: number;
  showDelete: boolean;
  showFilter: boolean;
  showExport: boolean;
};

const Template = ({ rowsAmount, pinnedRowsAmount, showDelete, showFilter, showExport, ...args }: StoryProps) => {
  const [key, setKey] = useState(0);
  useEffect(() => setKey(x => x + 1), [args.selectionMode]);
  const [data, setData] = useState<DataModel[]>([]);
  const [pinnedData, setPinnedData] = useState<DataModel[]>([]);

  const debSetData = useMemo(() => debounce(setData, 500), []);
  const debSetPinnedData = useMemo(() => debounce(setPinnedData, 450), []);
  const [filterValue, setFilterValue] = useState<TFilterValueType[]>([]);
  const rowPassFilter = useCallback(
    (data: DataModel) => {
      if (!filterValue?.length) return true;
      return filterValue[0].condition === 'eq'
        ? data[filterValue[0].id] === filterValue[0].value[0]
        : data[filterValue[0].id] !== filterValue[0].value[0];
    },
    [filterValue],
  );

  useEffect(() => {
    const newData = generateRows(rowsAmount);

    debSetData(newData);
  }, [debSetData, rowsAmount]);

  useEffect(() => {
    const newData = generateRows(pinnedRowsAmount);
    debSetPinnedData(newData);
  }, [debSetPinnedData, pinnedRowsAmount]);

  const bulkActions = useMemo<ClientModelTableProps<DataModel>['bulkActions']>(
    () => ({
      delete: showDelete
        ? {
            onDelete(ids: string[]): void {
              setData(data.filter(({ name }) => !ids.includes(name)));
            },
            title: 'Delete Title',
            description: 'Delete description',
            approveText: 'approve',
            cancelText: 'cancel',
          }
        : undefined,
      filter: showFilter
        ? {
            value: filterValue,
            doesRowPassFilter: rowPassFilter,
            onChange: (val: TFilterValueType[]) => setFilterValue(val),
            filterOptions: [
              {
                type: TFilterOptionType.Select,
                value: 'status',
                label: 'Status',
                includeConditions: [LogicConditionType.Eq, LogicConditionType.Neq],
                sourceData: Object.values(StatusDot.types).map(x => ({ value: x, label: x })),
              },
            ],
          }
        : undefined,
      export: showExport ? { fileName: 'customExportFileName' } : undefined,
    }),
    [data, filterValue, rowPassFilter, showDelete, showFilter, showExport],
  );

  return (
    <Container key={key}>
      <h1> Client Model Table</h1>
      <CMTable
        {...args}
        fieldId={args.fieldId}
        data={data}
        pinnedData={pinnedData}
        columnDefinitions={args.columnDefinitions}
        bulkActions={bulkActions}
        pageSize={args.pageSize}
        onRefreshCallback={() => {
          setData(generateRows(rowsAmount));
          setPinnedData(generateRows(pinnedRowsAmount));
        }}
        suppressToolbar={args.suppressToolbar}
      />
    </Container>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  * + * {
    margin-left: 8px;
  }
`;

export const clientModelTable: StoryFn<StoryProps> = Template.bind({});
clientModelTable.args = {
  fieldId: 'name',
  columnDefinitions: [
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Created',
      field: 'createDate',
    },
    {
      headerName: 'Last touched',
      field: 'lastModified',
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: false,
      filter: true,
      minWidth: 100,
      cellRenderer: StatusCell,
      cellRendererParams: ({ value }: { value: string }) => ({
        tooltip: value,
        type: value,
        value,
      }),
    },
    {
      headerName: 'Memory',
      field: 'memory',
      minWidth: 95,
      valueFormatter: sizeFormatter,
    },
    {
      headerName: 'Connect',
      pinned: 'right',
      colId: 'Connect',
      minWidth: 200,
      maxWidth: 200,
      valueGetter: ({ data }: { data: DataModel }) => data.status,
      cellRenderer: ({ data: { status } }: { data: DataModel }) => {
        const isInProgress = status === StatusDot.types.Unactive;
        const isDisabled = status === StatusDot.types.Failed;
        return (
          <ButtonGroup>
            <ButtonTable
              variant={ButtonTable.variants.Outline}
              disabled={isDisabled}
              loading={isInProgress}
              text='AGrigorii'
              onClick={() => {}}
            />
            <ButtonTableIcon variant={ButtonTableIcon.variants.Stop} disabled={isDisabled} loading={isInProgress} />
            <ButtonTableIcon variant={ButtonTableIcon.variants.Pause} disabled={isDisabled} loading={isInProgress} />
          </ButtonGroup>
        );
      },
      customMeta: {
        skipOnExport: true,
      },
    },
  ],
  rowsAmount: 5,
  pinnedRowsAmount: 3,
  showDelete: true,
  showFilter: true,
  showExport: true,
  selectionMode: CMTable.selectionModes.Multiple,
};

clientModelTable.argTypes = {
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
  pinnedRowsAmount: {
    name: '[Stories]: Amount of pinned rows within the table',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
    },
  },
  showDelete: {
    name: '[Stories]: show (true) or hide delete button from toolbar',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'boolean',
    },
  },
  showFilter: {
    name: '[Stories]: show (true) or hide filter button from toolbar',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'boolean',
    },
  },
  showExport: {
    name: '[Stories]: show (true) or hide export table',
    control: {
      type: 'boolean',
    },
  },
};
clientModelTable.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=535%3A0',
  },
};
