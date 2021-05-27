import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';

import { FilterSVG } from '@sbercloud/icons';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';

import { Filter, IFilterProps, TFilterValueType } from '../src';
import mockData, { groupedServices } from '../src/helpers/mockData';

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
          {({ badgeText, open }): JSX.Element => (
            <Toolbar.Button badgeText={badgeText} isActive={open}>
              <FilterSVG />
            </Toolbar.Button>
          )}
        </Filter>
      </Toolbar.Wrapper>
    </div>
  );
};

export const filter = Template.bind({});
filter.parameters = {
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
