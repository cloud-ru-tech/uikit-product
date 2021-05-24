import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { FilterSVG } from '@sbercloud/icons';

import { ListToolBar } from 'components/ListToolBar';
import { Filter, IFilterProps, TFilterValueType } from 'components/Filter';

import mockData, { groupedServices } from '../../helpers/mockData';

export default {
  title: 'Components/Filter',
  component: Filter,
  decorators: [withDesign],
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
];

const Template: Story<IFilterProps> = () => {
  const [value, setValue] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState<TFilterValueType[] | string>(
    defValue,
  );

  return (
    <div style={{ padding: 10 }}>
      <ListToolBar.Wrapper>
        <ListToolBar.Input
          value={value}
          onChange={(value): void => {
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
          {({ badgeText, open }): JSX.Element => (
            <ListToolBar.Button badgeText={badgeText} isActive={open}>
              <FilterSVG />
            </ListToolBar.Button>
          )}
        </Filter>
      </ListToolBar.Wrapper>
    </div>
  );
};

export const filter = Template.bind({});
