import { Meta, Story } from '@storybook/react/types-6-0';

import { RefreshButton, RefreshButtonProps } from '../src';

export default {
  title: 'Components/Button/Refresh Button',
  component: RefreshButton,
} as Meta;

const Template: Story<RefreshButtonProps> = ({ ...args }) => <RefreshButton {...args} />;

export const refreshButton = Template.bind({});
refreshButton.args = {};
