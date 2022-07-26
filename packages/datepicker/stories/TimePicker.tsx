import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TimePicker, TimePickerProps } from '../src';

export default {
  title: 'Not stable/DatePicker/Time Picker',
  component: TimePicker,
} as Meta;

const Template: Story<Omit<TimePickerProps, 'minTime'> & { minTime: boolean }> = ({ date, ...args }) => {
  const [value, setValue] = useState(date);

  useEffect(() => {
    setValue(date);
  }, [date]);

  return (
    <div style={{ width: 350 }}>
      <TimePicker
        date={value}
        {...args}
        onChange={date => setValue(date as Date)}
        minTime={args.minTime ? new Date() : undefined}
        maxTime={args.minTime ? new Date(new Date().setHours(23, 59, 59, 999)) : undefined}
      />
    </div>
  );
};

export const timePicker = Template.bind({});
timePicker.args = {
  date: new Date(),
  minTime: true,
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
  minTime: {
    name: 'minTime',
    control: {
      type: 'boolean',
    },
  },
};

timePicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=7249%3A100140',
  },
};
