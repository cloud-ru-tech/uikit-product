import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileChipChoiceRow, MobileChipChoiceRowProps } from '../src';
import { CHIP_CHOICE_ROW_SIZE } from '../src/components/MobileChipChoiceRow/constants';
import { Filters, filtersMock } from './helpers';
import { STORY_TEST_IDS } from './testIds';

const meta: Meta = {
  title: 'Mobile/Chips/ChipChoiceRow',
  component: MobileChipChoiceRow,
};
export default meta;

function Template({ ...args }: MobileChipChoiceRowProps<Filters>) {
  const [state, setState] = useState<Filters>((args.defaultValue ?? {}) as Filters);

  return (
    <div>
      <MobileChipChoiceRow<Filters> {...args} value={state} onChange={setState} data-test-id={STORY_TEST_IDS.Row} />
      <span style={{ opacity: 0 }} data-test-id={STORY_TEST_IDS.State}>
        {JSON.stringify(state)}
      </span>
    </div>
  );
}

export const chipChoiceRow: StoryFn<MobileChipChoiceRowProps<Filters>> = Template.bind({});
chipChoiceRow.args = {
  filters: filtersMock,
  showClearAllButton: true,
  clearAllButtonLabel: 'Clear all',
  defaultValue: { vms: ['vm-1'] },
};

chipChoiceRow.argTypes = {
  size: {
    options: Object.values(CHIP_CHOICE_ROW_SIZE),
    control: {
      type: 'radio',
    },
  },
};

chipChoiceRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A152236&mode=design',
  },
};
