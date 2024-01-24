import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MultiSelect, MultiSelectProps } from '../src/components/MultiSelect';
import { KEYS_TO_BREAK } from '../src/constants';
import { MultiSelectModeType, MultiSelectOptionType } from '../src/helpers/types';

const meta: Meta = {
  title: 'Not stable/Select/Multi Select',
  component: MultiSelect,
};
export default meta;

const OPTIONS = [
  {
    value: 'telegram',
    label: 'telegram',
    amount: 42,
  },
  {
    value: 'tesla',
    label: 'tesla',
    isFixed: true,
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
  modePreset: MultiSelectModeType;
  optionsPreset: 'empty' | 'filled';
} & MultiSelectProps;

function Template({ ...args }: StoryProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<MultiSelectOptionType[]>([
    {
      ...OPTIONS[1],
    },
  ]);

  const handleSelectOption = (option: MultiSelectOptionType) => {
    if (!option) return;
    for (const selected of selectedOptions) {
      if (selected.label === option.label) return;
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleRemoveOption = (option: MultiSelectOptionType) => {
    setSelectedOptions(selectedOptions.filter((s: MultiSelectOptionType) => s.value !== option?.value));
  };

  const handleSelectAllOptions = (options: MultiSelectOptionType[]) => {
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

  const mode =
    args.mode ||
    {
      [MultiSelectModeType.InInputSearch]: {
        type: MultiSelectModeType.InInputSearch,
        props: {
          onRemoveOption: handleRemoveOption,
          onSelectOption: handleSelectOption,
        },
      },
      [MultiSelectModeType.InMenuSearch]: {
        type: MultiSelectModeType.InMenuSearch,
        props: {
          onRemoveOption: handleRemoveOption,
          onSelectOption: handleSelectOption,
          onRemoveOptions: handleRemoveAllOptions,
          onSelectOptions: handleSelectAllOptions,
          collapseOnReaching: 3,
        },
      },
      [MultiSelectModeType.NoneSearch]: {
        type: MultiSelectModeType.NoneSearch,
        props: {
          collapseOnReaching: 2,
          onRemoveOption: handleRemoveOption,
          onSelectOption: handleSelectOption,
        },
      },
    }[args.modePreset];

  const options = mode.type === MultiSelectModeType.NoneSearch || args.optionsPreset === 'empty' ? [] : OPTIONS;

  return (
    <MultiSelect
      {...args}
      mode={mode}
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
  modePreset: {
    name: '[Stories]: Mode preset',
    description: 'Use mode* control or these predefined values',
    options: Object.values(MultiSelectModeType),
    control: {
      type: 'radio',
    },
  },
  optionsPreset: {
    name: '[Stories]: Options preset',
    options: ['empty', 'filled'],
    control: {
      type: 'radio',
    },
  },
  isLoading: {
    control: {
      type: 'boolean',
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
};

multiSelect.args = {
  optionsPreset: 'filled',
  modePreset: MultiSelectModeType.InInputSearch,
  label: 'Label',
  placeholder: 'От 2 до 20 тегов через запятую',
  isLoading: false,
};

multiSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11428%3A185606',
  },
  badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
};
