import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { DropdownMenu } from '@sbercloud/uikit-react-dropdown';
import { FormField } from '@sbercloud/uikit-react-form';
import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Input } from '@sbercloud/uikit-react-input';
import { Paginator } from '@sbercloud/uikit-react-paginator-private';
import { AgGridTypes } from '@sbercloud/uikit-react-table-private';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITableWithRowDetailProps, TableWithRowDetail } from '../src';
import { StatusCell } from './helpers/StatusCellRenderer';

export default {
  title: 'Not stable/Table/With Row Detail',
  component: TableWithRowDetail,
} as Meta;

const EmbeddedComponent = styled.div`
  padding: 16px 32px;
`;

const PaginateBox = styled.div`
  padding: 12px 0;
`;

const Template: Story<ITableWithRowDetailProps> = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState<AgGridTypes.GridApi>();

  const handlerSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    gridApi?.setQuickFilter(e.target.value);
  };

  const handlerGridReady = (params: AgGridTypes.GridReadyEvent): void => {
    setGridApi(params.api);
  };

  return (
    <div>
      <Input onChange={handlerSearchChange} />
      <br />
      <TableWithRowDetail
        rowData={rowData}
        onGridReady={handlerGridReady}
        columnDefs={columnDefs}
        frameworkComponents={{ StatusCell }}
      >
        <EmbeddedComponent>
          <FormField
            label='Не обязательное поле'
            hint={{
              content:
                'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
            }}
          >
            <Input value='test' placeholder='Пример: Project1-bucket106' allowClear />
          </FormField>

          <FormField
            label='Обязательное поле'
            hint={{
              content:
                'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
            }}
          >
            <Input value='test' placeholder='Пример: Project1-bucket106' allowClear />
          </FormField>

          <FormField
            label='Обязательное поле'
            hint={{
              content:
                'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
            }}
          >
            <Input value='test' placeholder='Пример: Project1-bucket106' allowClear />
          </FormField>
        </EmbeddedComponent>
      </TableWithRowDetail>
      {gridApi?.paginationGetTotalPages() ? (
        <PaginateBox>
          <Paginator
            pageCount={gridApi?.paginationGetTotalPages()}
            onPageChange={({ selected }: { selected: number }): void => {
              gridApi?.paginationGoToPage(selected);
            }}
            placement={Paginator.placements.Right}
          />
        </PaginateBox>
      ) : null}
    </div>
  );
};

export const withRowDetail = Template.bind({});
withRowDetail.args = {
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
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      size: 1000,
      type: 'file',
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
      cellRenderer: 'StatusCell',
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
      cellRendererFramework: () => {
        const actions = [
          {
            name: 'Логи сборки',
            onClick: () => {},
          },
          {
            name: 'Удалить',
            onClick: () => {},
          },
        ];

        return (
          <DropdownMenu actions={actions}>
            <ButtonIcon
              icon={<MoreInterfaceSVG />}
              tooltip={{
                content: 'Меню',
                placement: ButtonIcon.placements.Right,
              }}
            />
          </DropdownMenu>
        );
      },
    },
  ],
};

withRowDetail.argTypes = {};

withRowDetail.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
