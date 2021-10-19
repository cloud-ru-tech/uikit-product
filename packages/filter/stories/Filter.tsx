import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { DatePicker } from '@sbercloud/uikit-react-datepicker';
import { FilterInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Filter, IFilterProps, TFilterValueType } from '../src';
import mockData, { groupedServices } from '../src/helpers/mockData';

export default {
  title: 'Not stable/Filter',
  component: Filter,
} as Meta;

const defOpt = [
  {
    value: 'connector_type_group',
    label: 'Коннектор',
    sourceData: groupedServices,
    includeConditions: ['eq', 'neq'],
  },
  {
    value: 'connector_type',
    label: 'Коннектор',
    sourceData: mockData,
    includeConditions: ['eq', 'neq'],
  },
  {
    value: 'some_prop',
    label: 'Произвольный текст',
    includeConditions: ['include', 'noinclude'],
  },
  {
    value: 'date',
    label: 'Дата',
    datepicker: DatePicker.time.None,
    includeConditions: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte'],
  },
  {
    value: 'date_time',
    label: 'Дата',
    datepicker: DatePicker.time.Requier,
    includeConditions: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte'],
  },
];

const defValue: TFilterValueType[] = [
  {
    id: 'connector_type_group',
    value: ['Ds'],
    condition: 'eq',
  },
  {
    id: 'connector_type',
    value: ['hdfs'],
    condition: 'eq',
  },
  {
    id: 'some_prop',
    value: ['---/---'],
    condition: 'noinclude',
  },
  {
    id: 'date',
    value: [new Date().toString()],
    condition: 'eq',
  },
  {
    id: 'date_time',
    value: [new Date().toString()],
    condition: 'eq',
  },
];

const Template: Story<IFilterProps> = () => {
  const [value, setValue] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState<TFilterValueType[] | string>(defValue);

  return (
    <div style={{ padding: 10 }}>
      <Toolbar.Wrapper>
        <Toolbar.Input
          value={value}
          onChange={(value: any): void => {
            setValue(value);
          }}
        />
        <Filter
          filterOptions={defOpt}
          value={filterValue}
          onChange={(val, queryString) => {
            setFilterValue(queryString);
          }}
        >
          {({ badgeNumber, open }): JSX.Element => (
            <Toolbar.Button badgeProps={{ number: badgeNumber }} isActive={open} tooltip={{ content: 'Фильтр' }}>
              <FilterInterfaceSVG />
            </Toolbar.Button>
          )}
        </Filter>
      </Toolbar.Wrapper>
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
