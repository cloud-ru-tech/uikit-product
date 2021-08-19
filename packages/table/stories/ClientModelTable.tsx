import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

import { ButtonTable, ButtonTableIcon } from '@sbercloud/uikit-react-button';
import { Status } from '@sbercloud/uikit-react-status';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ClientModelTable as CMTable, ClientModelTableProps, FrameworkComponents, TableFormatters } from '../src';

const { sizeFormatter } = TableFormatters;
const { StatusCell } = FrameworkComponents;

export default {
  title: 'Not stable/Table/Client Model Table',
  component: CMTable,
} as Meta;

type DataModel = {
  name: string;
  lastModified: string;
  createDate: string;
  memory: number;
  status: string;
};

function generateRows(count: number): DataModel[] {
  const res: DataModel[] = [];
  for (let i = 0; i < count; ++i) {
    const createdTimestamp = Math.floor(Math.random() * 1e13);
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
      status: Object.values(Status.types)[Math.floor(Math.random() * 10) % 4],
    });
  }
  return res;
}

const Template: Story<ClientModelTableProps<DataModel> & { rowsAmount: number; showDelete: boolean }> = ({
  rowsAmount,
  showDelete,
  ...args
}) => {
  const [data, setData] = useState<DataModel[]>(generateRows(rowsAmount));

  useEffect(() => {
    debounce(() => {
      const newData = generateRows(rowsAmount);
      setData(newData);
    }, 1000);
  }, [rowsAmount]);

  const bulkActions: ClientModelTableProps<DataModel>['bulkActions'] = {
    delete: {
      onDelete(ids: string[]): void {
        setData(data.filter(({ name }) => !ids.includes(name)));
      },
      title: 'Delete Title',
      description: 'Delete description',
      approveText: 'approve',
      cancelText: 'cancel',
    },
  };

  return (
    <CMTable
      fieldId={args.fieldId}
      data={data}
      columnDefinitions={args.columnDefinitions}
      bulkActions={showDelete ? bulkActions : undefined}
      pageSize={args.pageSize}
      onRefreshCallback={() => setData(generateRows(rowsAmount))}
    />
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

export const clientModelTable = Template.bind({});
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
      minWidth: 100,
      cellRendererFramework: StatusCell,
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
      minWidth: 200,
      maxWidth: 200,
      valueGetter: ({ data }: { data: DataModel }) => data.status,
      cellRendererFramework: ({ data: { status } }: { data: DataModel }) => {
        const isInProgress = status === Status.types.Unactive;
        const isDisabled = status === Status.types.Failed;
        return (
          <ButtonGroup>
            <ButtonTable disabled={isDisabled} loading={isInProgress} text='AGrigorii' onClick={() => {}} />
            <ButtonTableIcon variant={ButtonTableIcon.variants.Stop} disabled={isDisabled} loading={isInProgress} />
            <ButtonTableIcon variant={ButtonTableIcon.variants.Pause} disabled={isDisabled} loading={isInProgress} />
          </ButtonGroup>
        );
      },
    },
  ],
};

clientModelTable.argTypes = {
  rowsAmount: {
    defaultValue: 5,
    name: '[Stories]: Amount of rows within the table',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
    },
  },
  showDelete: {
    defaultValue: true,
    name: '[Stories]: show or hide delete button from toolbar',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'boolean',
    },
  },
};
clientModelTable.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=7%3A8441',
  },
};
