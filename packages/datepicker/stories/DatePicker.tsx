import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DatePicker, DatePickerProps } from '../src';

export default {
  title: 'Not stable/DatePicker/Date Picker',
  component: DatePicker,
} as Meta;

const Template: Story<Omit<DatePickerProps, 'minDate'> & { minDate: boolean }> = args => (
  <div style={{ width: 350 }}>
    <DatePicker {...args} minDate={args.minDate ? new Date() : undefined} />
  </div>
);

export const datePicker = Template.bind({});
datePicker.args = {
  value: new Date(),
  pickTime: DatePicker.time.None,
  minDate: true,
};
datePicker.argTypes = {
  pickTime: {
    options: [DatePicker.time.None, DatePicker.time.Requier, DatePicker.time.Optional],
    control: { type: 'radio' },
  },
  value: {
    control: {
      type: 'date',
    },
  },
  minDate: {
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
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=7249%3A100140',
  },
};
