import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { FilterInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Toolbar } from '@sbercloud/uikit-product-toolbar';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DatepickerType, Filter, FilterProps, LogicConditionType, TFilterOptionType, TFilterValueType } from '../src';
import { groupedServices, mockData } from '../src/helpers/mockData';

export default {
  title: 'Not stable/Filter',
  component: Filter,
} as Meta;

const defOpt = [
  {
    type: TFilterOptionType.Select,
    value: 'connector_type_group',
    label: 'Коннектор',
    sourceData: groupedServices,
    includeConditions: [LogicConditionType.Eq, LogicConditionType.Neq],
  },
  {
    type: TFilterOptionType.Select,
    value: 'connector_type',
    label: 'Коннектор',
    sourceData: mockData,
    includeConditions: [LogicConditionType.Eq, LogicConditionType.Neq],
  },
  {
    type: TFilterOptionType.Input,
    value: 'some_prop',
    label: 'Произвольный текст',
    includeConditions: [LogicConditionType.Include, LogicConditionType.Noinclude],
  },
  {
    type: TFilterOptionType.Datepicker,
    value: 'date',
    label: 'Дата',
    datepickerType: DatepickerType.None,
    includeConditions: [
      LogicConditionType.Eq,
      LogicConditionType.Neq,
      LogicConditionType.Lt,
      LogicConditionType.Lte,
      LogicConditionType.Gt,
      LogicConditionType.Gte,
    ],
  },
  {
    type: TFilterOptionType.Datepicker,
    value: 'date_time',
    label: 'Дата',
    datepickerType: DatepickerType.Requier,
    sourceData: [
      {
        value: new Date(2020, 1, 1),
      },
    ],
    includeConditions: [
      LogicConditionType.Eq,
      LogicConditionType.Neq,
      LogicConditionType.Lt,
      LogicConditionType.Lte,
      LogicConditionType.Gt,
      LogicConditionType.Gte,
    ],
  },
];

const defValue: TFilterValueType[] = [
  {
    id: 'connector_type_group',
    value: ['Ds'],
    condition: LogicConditionType.Eq,
  },
  {
    id: 'connector_type',
    value: ['hdfs'],
    condition: LogicConditionType.Eq,
  },
  {
    id: 'some_prop',
    value: ['---/---'],
    condition: LogicConditionType.Noinclude,
  },
  {
    id: 'date',
    value: [new Date()],
    condition: LogicConditionType.Eq,
  },
  {
    id: 'date_time',
    value: [],
    condition: LogicConditionType.Eq,
  },
];

const Template: Story<FilterProps> = () => {
  const [value, setValue] = useState('');
  const [filterValue, setFilterValue] = useState<TFilterValueType[] | string>(defValue);

  return (
    <div style={{ padding: 10 }}>
      <Toolbar.Container>
        <Toolbar.Input value={value} onChange={setValue} placeholder={'Поиск'} />
        <Filter
          filterOptions={defOpt}
          value={filterValue}
          onChange={(val, queryString) => {
            setFilterValue(queryString);
          }}
        >
          {({ badgeNumber, open }): JSX.Element => (
            <Toolbar.Button
              badgeProps={{ number: badgeNumber }}
              isActive={open}
              tooltip={{ content: 'Фильтр' }}
              icon={<FilterInterfaceSVG />}
            />
          )}
        </Filter>
      </Toolbar.Container>
    </div>
  );
};

export const filter = Template.bind({});
filter.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
