import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { FormField } from '@sbercloud/uikit-product-form';
import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputCommon } from '@sbercloud/uikit-product-input';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TableWithRowDetail, TableWithRowDetailProps } from '../src';
import { StatusCell } from './helpers/StatusCellRenderer';

export default {
  title: 'Not stable/Table/With Row Detail',
  component: TableWithRowDetail,
} as Meta;

const EmbeddedComponent = styled.div`
  padding: 16px 32px;
`;

type DataModel = {
  name: string;
  lastModified: number;
  createDate: number;
  dataType: string;
  status: string;
  access: string;
  size: number;
  type: string;
  disabled?: boolean;
};

const Template: Story<TableWithRowDetailProps<DataModel>> = args => (
  <TableWithRowDetail {...args}>
    <EmbeddedComponent>
      <FormField
        label='Не обязательное поле'
        hint={{
          content:
            'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
        }}
      >
        <InputCommon value='test' placeholder='Пример: Project1-bucket106' onChange={() => {}} />
      </FormField>

      <FormField
        label='Обязательное поле'
        hint={{
          content:
            'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
        }}
      >
        <InputCommon value='test' placeholder='Пример: Project1-bucket106' onChange={() => {}} />
      </FormField>

      <FormField
        label='Обязательное поле'
        hint={{
          content:
            'Проверьте корректно ли указаны базовый образ и параметры доступа к S3, а также удалось ли скачать директорию с артефактами или serving-скрипт.',
        }}
      >
        <InputCommon value='test' placeholder='Пример: Project1-bucket106' onChange={() => {}} />
      </FormField>
    </EmbeddedComponent>
  </TableWithRowDetail>
);

export const withRowDetail = Template.bind({});
withRowDetail.args = {
  data: [
    {
      name: 'Test',
      lastModified: 1599838941,
      createDate: 1599838943,
      dataType: 'dataset',
      status: 'failed',
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
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'progress',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
    {
      name: 'Test',
      lastModified: 1599838943,
      createDate: 1599838943,
      dataType: 'dataset',
      access: 'Ограниченный',
      status: 'success',
      size: 1000,
      type: 'file',
    },
  ],
  columnDefinitions: [
    {
      headerName: 'Последнее обновление',
      field: 'lastModified',
      sortable: true,
    },
    {
      headerName: 'Статус',
      field: 'status',
      cellRenderer: StatusCell,
      cellRendererParams: ({ value }: { value: string }) => ({
        tooltip: value,
        type: value,
        value,
      }),
      sortable: true,
    },
    {
      headerName: 'Доступ',
      field: 'access',
    },
    {
      colId: 'menu',
      headerName: '',
      minWidth: 44,
      width: 44,
      sortable: false,
      resizable: false,
      onCellClicked: e => e.event?.stopPropagation(),
      cellRenderer: () => {
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
