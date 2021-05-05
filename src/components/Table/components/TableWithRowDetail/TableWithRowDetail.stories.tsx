import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { styled } from '@linaria/react';

import { Input } from 'components/Input';
import { MoreButton } from 'components/Button';
import { FormField } from 'components/Form';
import { Paginate } from 'components/Paginate';
import { TableBasicTypes } from 'components/Table/helpers/types';
import { FrameworkComponents } from 'components/Table';

import {
  TableWithRowDetail,
  ITableWithRowDetailProps,
} from './TableWithRowDetail';

export default {
  title: 'Components/Table',
  component: TableWithRowDetail,
} as Meta;

const { StatusCell } = FrameworkComponents;

const EmbeddedComponent = styled.div`
  padding: 16px 32px;
`;

const PaginateBox = styled.div`
  padding: 12px 0;
`;

const Template: Story<ITableWithRowDetailProps> = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState<TableBasicTypes.GridApi>();

  const handlerSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    gridApi?.setQuickFilter(e.target.value);
  };

  const handlerGridReady = (params: TableBasicTypes.GridReadyEvent): void => {
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
            hint='Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.'
          >
            <Input
              value='test'
              placeholder='Пример: Project1-bucket106'
              allowClear
            />
          </FormField>

          <FormField
            label='Обязательное поле'
            hint='Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.'
          >
            <Input
              value='test'
              placeholder='Пример: Project1-bucket106'
              allowClear
            />
          </FormField>

          <FormField
            label='Обязательное поле'
            hint='Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.'
          >
            <Input
              value='test'
              placeholder='Пример: Project1-bucket106'
              allowClear
            />
          </FormField>
        </EmbeddedComponent>
      </TableWithRowDetail>
      {gridApi?.paginationGetTotalPages() ? (
        <PaginateBox>
          <Paginate
            pageCount={gridApi?.paginationGetTotalPages()}
            onPageChange={({ selected }: { selected: number }): void => {
              gridApi?.paginationGoToPage(selected);
            }}
            placement='right'
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

        return <MoreButton actions={actions} />;
      },
    },
  ],
};

withRowDetail.argTypes = {};
