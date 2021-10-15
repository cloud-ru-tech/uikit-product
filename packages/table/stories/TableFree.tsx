import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { Toolbar } from '@sbercloud/uikit-react-toolbar';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ITableFreeProps, TableFree } from '../src';

export default {
  title: 'Not stable/Table/Free',
  component: TableFree,
} as Meta;

const Template: Story<ITableFreeProps> = ({ rowData = [], ...args }) => {
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const searchedData = searchValue
    ? rowData.filter(({ firstName, lastName }) =>
        `${firstName} ${lastName}`.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : rowData;

  return (
    <>
      <Toolbar.Wrapper>
        <Toolbar.Input
          placeholder='Поиск по ФИО'
          value={searchValue}
          onChange={(value: string): void => {
            setSearchValue(value);
          }}
        />
      </Toolbar.Wrapper>
      <TableFree {...args} rowData={searchedData} />
    </>
  );
};

export const free = Template.bind({});
free.args = {
  checkboxSelection: true,
  pageSize: undefined,
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
  ],
};

free.argTypes = {};
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
