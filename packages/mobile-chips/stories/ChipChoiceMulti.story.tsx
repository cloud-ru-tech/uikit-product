import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileChipChoice, MobileChipChoiceMultipleProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import {
  BASE_OPTIONS,
  CHIP_CHOICE_ARG_TYPES,
  CHIP_CHOICE_STORY_ARGS,
  ChipChoiceCustomStoryProps,
  FILTER_OPTIONS,
} from './chipChoice/constants';

const meta: Meta = {
  title: 'Mobile/Chips/ChipChoice',
  component: MobileChipChoice.Multiple,
};
export default meta;

type StoryProps = MobileChipChoiceMultipleProps & ChipChoiceCustomStoryProps;

const Template: StoryFn<StoryProps> = ({ useDefaultValue, useBaseOptions, showClickCounter, ...args }: StoryProps) => (
  <ChipChoiceStoryWrap
    defaultValue={useDefaultValue ? [BASE_OPTIONS[0].value] : undefined}
    showClickCounter={showClickCounter}
    chipControlled={({ increaseCounter, ...props }) => (
      <MobileChipChoice.Multiple
        {...args}
        {...props}
        options={useBaseOptions ? BASE_OPTIONS : FILTER_OPTIONS}
        onClick={increaseCounter}
        label={CHIP_CHOICE_STORY_ARGS.label}
      />
    )}
  />
);

export const chipChoiceMulti: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    disableFuzzySearch: false,
    autoApply: true,
  },

  argTypes: CHIP_CHOICE_ARG_TYPES,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A147240&mode=design',
    },
  },
};
