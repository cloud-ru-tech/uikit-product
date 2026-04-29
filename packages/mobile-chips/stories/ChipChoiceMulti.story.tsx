import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileChipChoice, MobileChipChoiceMultipleProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import { getDefaultValueEntry, getOptions } from './helpers';

const meta: Meta = {
  title: 'Mobile/Chips/ChipChoice',
  component: MobileChipChoice.Multiple,
};
export default meta;

type StoryProps = MobileChipChoiceMultipleProps &
  ChipChoiceCustomStoryProps & {
    showManyOptions?: boolean;
  };

const Template: StoryFn<StoryProps> = ({
  useDefaultValue,
  useBaseOptions,
  showManyOptions,
  showClickCounter,
  ...args
}: StoryProps) => {
  const options = getOptions({ useBaseOptions, showManyOptions });
  const defaultEntry = getDefaultValueEntry(options);
  const defaultValue = useDefaultValue && defaultEntry !== undefined ? [defaultEntry] : undefined;

  return (
    <ChipChoiceStoryWrap
      defaultValue={defaultValue}
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter, ...props }) => (
        <MobileChipChoice.Multiple
          {...args}
          {...props}
          options={options}
          onClick={increaseCounter}
          label={CHIP_CHOICE_STORY_ARGS.label}
        />
      )}
    />
  );
};

export const chipChoiceMulti: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    showManyOptions: false,
    disableFuzzySearch: false,
    autoApply: true,
  },

  argTypes: {
    ...CHIP_CHOICE_ARG_TYPES,
    showManyOptions: {
      name: '[Stories]: Long options list (scroll)',
      control: { type: 'boolean' },
    },
  },

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
