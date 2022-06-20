import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FilterBlock, FilterBlockProps } from '../src';
import { FilterTypes } from '../src/constants';
import { mockFilters } from './helpers/mockFilters';

export default {
  title: 'Not stable/Filter Block',
  component: FilterBlock,
} as Meta;

const Template: Story<FilterBlockProps> = ({ ...args }) => {
  const [activeFastFilters, setActiveFastFilters] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFastFilterChange = (field: string) => {
    if (activeFastFilters.includes(field)) {
      setActiveFastFilters(activeFastFilters.filter(filterItem => filterItem !== field));
    } else {
      setActiveFastFilters([...activeFastFilters, field]);
    }
  };

  const handleFilterChange = (title: string, field: string, type: FilterTypes) => {
    if (type === FilterTypes.Checkbox) {
      if (activeFilters[title]) {
        setActiveFilters({
          ...activeFilters,
          [title]: activeFilters[title].includes(field)
            ? [...activeFilters[title].filter((item: string) => item !== field)]
            : [...activeFilters[title], field],
        });
      } else {
        setActiveFilters({
          ...activeFilters,
          [title]: [field],
        });
      }
    } else {
      if (activeFilters[title]) {
        setActiveFilters({
          ...activeFilters,
          [title]: field,
        });
      } else {
        setActiveFilters({
          ...activeFilters,
          [title]: field,
        });
      }
    }
  };

  const handleResetButtonClick = () => {
    setActiveFilters({});
    setActiveFastFilters([]);
  };

  return (
    <FilterBlock
      {...args}
      fastFilters={{
        items: mockFilters.fastFilters,
        activeItems: activeFastFilters,
        onFilterChange: handleFastFilterChange,
      }}
      filters={{
        items: mockFilters.filters,
        activeItems: activeFilters,
        onFilterChange: handleFilterChange,
      }}
      onResetButtonClick={handleResetButtonClick}
    />
  );
};

export const filterBlock = Template.bind({});
filterBlock.args = {};
filterBlock.argTypes = {};
filterBlock.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=54371%3A245651',
  },
  badges: [BADGE.BETA],
};
