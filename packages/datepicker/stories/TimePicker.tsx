import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TimePicker, TimePickerProps } from '../src';
import { Languages } from '../src/helpers/texts-provider';

export default {
  title: 'Not stable/DatePicker/Time Picker',
  component: TimePicker,
} as Meta;

const Template: Story<TimePickerProps> = args => (
  <div style={{ width: 350 }}>
    <TimePicker {...args} />
  </div>
);

export const timePicker = Template.bind({});
timePicker.args = {
  date: new Date(),
};
timePicker.argTypes = {
  date: {
    control: {
      type: 'date',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  language: {
    defaultValue: Languages.Ru,
    options: [Languages.Ru, Languages.En],
    control: { type: 'radio' },
  },
};
timePicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=2641%3A72801',
  },
};
