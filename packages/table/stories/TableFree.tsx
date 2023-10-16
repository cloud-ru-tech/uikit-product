import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';
import { Toolbar } from '@sbercloud/uikit-product-toolbar';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITableFreeProps, TableFree } from '../src';

const ToolbarWrapperView = css`
  margin-bottom: 12px;
`;

const Container = styled.div`
  display: grid;
  padding: 24px;
  border-radius: 8px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

const meta: Meta = {
  title: 'Not stable/Table/Free',
  component: TableFree,
};

export default meta;

const Template = ({ rowData = [], ...args }: ITableFreeProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchedData = searchValue
    ? rowData.filter(({ firstName, lastName }) =>
        `${firstName} ${lastName}`.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : rowData;

  return (
    <Container>
      <h1>Table Free</h1>
      <Toolbar.Container className={ToolbarWrapperView}>
        <Toolbar.Input
          placeholder='Поиск по ФИО'
          value={searchValue}
          onChange={(value: string): void => {
            setSearchValue(value);
          }}
        />
      </Toolbar.Container>
      <TableFree {...args} rowData={searchedData} />
    </Container>
  );
};

export const free: StoryFn<ITableFreeProps> = Template.bind({});
free.args = {
  checkboxSelection: true,
  pageSize: undefined,
  noRowsText: 'Совсем нет данных',
  rowData: [
    { lastName: 'Ермолаев', firstName: 'Матвей', access: 'granted' },
    { lastName: 'Львова', firstName: 'София', access: 'granted' },
    { lastName: 'Колосов', firstName: 'Матвей', access: 'granted' },
    { lastName: 'Наумова', firstName: 'Варвара', access: 'granted' },
    { lastName: 'Миронов', firstName: 'Максим', access: 'granted' },
    { lastName: 'Мешкова', firstName: 'Татьяна', access: 'granted' },
    { lastName: 'Мухин', firstName: 'Михаил', access: 'granted' },
    { lastName: 'Павлов', firstName: 'Марк', access: 'granted' },
    { lastName: 'Михайлов', firstName: 'Александр', access: 'granted' },
    { lastName: 'Николаева', firstName: 'Ксения', access: 'granted' },
    { lastName: 'Рябинин', firstName: 'Алексей', access: 'granted' },
    { lastName: 'Попова', firstName: 'Екатерина', access: 'granted' },
    { lastName: 'Смирнов', firstName: 'Максим', access: 'granted' },
    { lastName: 'Васильев', firstName: 'Мирослав', access: 'granted' },
    { lastName: 'Позднякова', firstName: 'Ольга', access: 'granted' },
    { lastName: 'Крюков', firstName: 'Дмитрий', access: 'granted' },
    { lastName: 'Николаева', firstName: 'Ева', access: 'granted' },
    { lastName: 'Белов', firstName: 'Мирон', access: 'granted' },
    { lastName: 'Горячева', firstName: 'Мия', access: 'granted' },
    { lastName: 'Баранова', firstName: 'Софья', access: 'granted' },
  ],
  columnDefs: [
    {
      headerName: 'Фамилия',
      field: 'lastName',
    },
    {
      headerName: 'Имя',
      field: 'firstName',
    },
    {
      headerName: 'Доступ',
      field: 'access',
      colId: 'access',
    },
    {
      maxWidth: 40,
      sortable: false,
      cellRenderer: () => {
        const actions = [
          {
            value: 'change-permissions',
            label: 'Изменить права',
            onClick: () => alert('Права изменены'),
          },
          {
            value: 'revoke-permissions',
            label: 'Отозвать права',
            onClick: () => alert('Права отозваны'),
          },
        ];

        return (
          <DropdownMenu actions={actions}>
            <ButtonIcon icon={<MoreInterfaceSVG />} tooltip={{ content: 'Действия' }} />
          </DropdownMenu>
        );
      },
    },
  ],
};

free.argTypes = {};
free.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=535%3A0',
  },
};
