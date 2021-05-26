import { Meta, Story } from '@storybook/react/types-6-0';

import { Paginator, PaginatorProps } from '../src';

export default {
  title: 'Components/Paginator',
  component: Paginator,
} as Meta;

const Template: Story<PaginatorProps> = ({ ...args }) => <Paginator {...args} />;

export const paginator = Template.bind({});
paginator.args = {};
paginator.parameters = {};
paginator.argTypes = {
  pageCount: {
    control: {
      type: 'number',
    },
  },
  pageRangeDisplayed: {
    control: {
      type: 'number',
    },
  },
  marginPagesDisplayed: {
    control: {
      type: 'number',
    },
  },
  disableInitialCallback: {
    control: {
      type: 'boolean',
    },
  },
  initialPage: {
    control: {
      type: 'number',
    },
  },
  extraAriaContext: {
    control: {
      type: 'text',
    },
  },
};
