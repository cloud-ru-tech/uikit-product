import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileChipChoice, MobileChipChoiceSingleProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import { getDefaultValueEntry, getOptions } from './helpers';

const meta: Meta = {
  title: 'Mobile/Chips/ChipChoice',
  component: MobileChipChoice.Single,
};
export default meta;

type StoryProps = MobileChipChoiceSingleProps &
  ChipChoiceCustomStoryProps & {
    showManyOptions?: boolean;
  };

const Template: StoryFn<StoryProps> = ({
  useDefaultValue,
  useBaseOptions,
  showManyOptions,
  showClickCounter,
  defaultValue,
  ...args
}: StoryProps) => {
  const options = getOptions({ useBaseOptions, showManyOptions });
  const defaultEntry = getDefaultValueEntry(options);

  const wrappedDefault = useDefaultValue && defaultEntry !== undefined ? (defaultValue ?? defaultEntry) : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      defaultValue={wrappedDefault}
      chipControlled={({ increaseCounter, ...props }) => (
        <MobileChipChoice.Single
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

export const chipChoiceSingle: StoryObj<StoryProps> = {
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design',
    },
  },
};
