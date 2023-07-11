import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MultiSelect, MultiSelectProps, MultiSelectSearch } from '../src/components/MultiSelect';
import { KEYS_TO_BREAK } from '../src/constants';
import { MultiselectOptionType } from '../src/helpers/types';

const meta: Meta = {
  title: 'Not stable/Select/Multi Select',
  component: MultiSelect,
};
export default meta;

const options = [
  {
    value: 'telegram',
    label: 'telegram',
    amount: 42,
  },
  {
    value: 'tesla',
    label: 'tesla',
    amount: 42,
  },
  {
    value: 'tefal',
    label: 'tefal',
    amount: 42,
  },
  {
    value: 'text',
    label: 'text',
    amount: 42,
  },
  {
    value: 'another',
    label: 'another',
    amount: 42,
  },
  {
    value: 'example',
    label: 'example',
    amount: 42,
  },
];

type StoryProps = {
  searchPreset: keyof MultiSelectSearch;
} & MultiSelectProps;

function Template({ ...args }: StoryProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<MultiselectOptionType[] | []>([]);

  const handleSelectOption = (option: MultiselectOptionType) => {
    if (!option) return;
    for (const selected of selectedOptions) {
      if (selected.label === option.label) return;
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleRemoveOption = (option: MultiselectOptionType) => {
    setSelectedOptions(selectedOptions.filter((s: MultiselectOptionType) => s.value !== option?.value));
  };

  const handleSelectAllOptions = (options: MultiselectOptionType[]) => {
    setSelectedOptions(options);
  };

  const handleRemoveAllOptions = () => {
    setSelectedOptions([]);
  };

  const handleInputChange = (value: string) => {
    if (KEYS_TO_BREAK.includes(value)) return;
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (KEYS_TO_BREAK.includes(e.key) && inputValue.length) {
      handleSelectOption({ label: inputValue, value: inputValue, amount: 0 });
      setInputValue('');
    }
  };

  const handleBlur = () => {
    if (inputValue.length) {
      handleSelectOption({ label: inputValue, value: inputValue, amount: 0 });
      setInputValue('');
    }
  };

  const search = args.search || {
    [args.searchPreset]: {
      defaultSearch: {
        onRemoveOption: handleRemoveOption,
        onSelectOption: handleSelectOption,
      },
      inMenuSearch: {
        onRemoveOption: handleRemoveOption,
        onSelectOption: handleSelectOption,
        onRemoveOptions: handleRemoveAllOptions,
        onSelectOptions: handleSelectAllOptions,
        collapseOnReaching: 5,
      },
    }[args.searchPreset],
  };

  return (
    <MultiSelect
      {...args}
      search={search}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInputChange={handleInputChange}
      value={selectedOptions}
      inputValue={inputValue}
      options={options}
    />
  );
}

export const multiSelect: StoryFn<StoryProps> = Template.bind({});

multiSelect.argTypes = {
  searchPreset: {
    name: '[Stories]: Select search preset',
    description: 'Use search* control or these predefined values',
    options: ['defaultSearch', 'inMenuSearch'],
    control: {
      type: 'radio',
    },
  },
  isLoading: {
    control: {
      type: 'boolean',
    },
  },
};

multiSelect.args = {
  label: 'Label',
  placeholder: 'От 2 до 20 тегов через запятую',
  searchPreset: 'defaultSearch',
  isLoading: false,
};

multiSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11428%3A185606',
  },
  badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
};
