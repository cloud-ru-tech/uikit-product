import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DatePicker, DatePickerProps } from '../src';

export default {
  title: 'Not stable/DatePicker/Date Picker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = args => (
  <div style={{ width: 350 }}>
    <DatePicker {...args} minDate={args.minDate ? new Date() : undefined} />
  </div>
);

export const datePicker = Template.bind({});
datePicker.args = {
  value: new Date(),
};
datePicker.argTypes = {
  pickTime: {
    defaultValue: DatePicker.time.None,
    options: [DatePicker.time.None, DatePicker.time.Requier, DatePicker.time.Optional],
    control: { type: 'radio' },
  },
  value: {
    control: {
      type: 'date',
    },
  },
  minDate: {
    defaultValue: true,
    name: '[Stories]: show or hide minimum possible date',
    description: 'demonstration exist of date - you can set any date to property of component',
    control: {
      type: 'boolean',
    },
  },
};
datePicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-Design_System?node-id=2610%3A69998',
  },
};
