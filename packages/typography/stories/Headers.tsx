import { Meta, Story } from '@storybook/react/types-6-0';

import { H1, H2, H3, H3Semibold, H4, H5 } from '../src';

export default {
  title: 'Typography/Headers',
  component: H1,
} as Meta;

const Template: Story<{ color: string; children: string }> = ({ children, color, ...restArgs }) => (
  <div style={{ color }}>
    <H1 {...restArgs}>{children} (H1)</H1>
    <H2 {...restArgs}>{children} (H2)</H2>
    <H3 {...restArgs}>{children} (H3)</H3>
    <H3Semibold {...restArgs}>{children} (H3Semibold)</H3Semibold>
    <H4 {...restArgs}>{children} (H4)</H4>
    <H5 {...restArgs}>{children} (H5)</H5>
  </div>
);

export const headers = Template.bind({});
headers.args = {
  children: 'Пример',
};
headers.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
  children: {
    control: {
      type: 'text',
    },
  },
};
