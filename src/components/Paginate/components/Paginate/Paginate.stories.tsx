import { Story, Meta } from '@storybook/react/types-6-0';

import { Paginate, IPaginateProps } from './Paginate';

export default {
  title: 'Components/Paginate',
  component: Paginate,
} as Meta;

const Template: Story<IPaginateProps> = ({ ...args }) => <Paginate {...args} />;

export const paginate = Template.bind({});
paginate.args = {};
paginate.parameters = {};
paginate.argTypes = {
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
