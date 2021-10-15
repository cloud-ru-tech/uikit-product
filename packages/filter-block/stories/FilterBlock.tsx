import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

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
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
  badges: [BADGE.BETA],
};
