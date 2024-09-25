import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DatePicker, DatePickerProps } from '../src';

const meta: Meta = {
  title: 'Not stable/DatePicker/Date Picker',
  component: DatePicker,
};
export default meta;

function Template(args: DatePickerProps) {
  return (
    <div style={{ width: 350 }}>
      <DatePicker {...args} />
    </div>
  );
}

export const datePicker: StoryObj<DatePickerProps> = {
  render: Template,

  args: {
    value: new Date(),
    pickTime: DatePicker.timePicker.None,
    size: DatePicker.sizes.Medium,
  },

  argTypes: {
    size: {
      options: Object.values(DatePicker.sizes),
      control: { type: 'radio' },
    },
    pickTime: {
      options: Object.values(DatePicker.timePicker),
      control: { type: 'radio' },
    },
    value: {
      control: {
        type: 'date',
      },
    },
    minDate: {
      control: {
        type: 'date',
      },
    },
    maxDate: {
      control: {
        type: 'date',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=7249%3A100140',
    },
  },
};
