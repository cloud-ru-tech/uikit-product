import { Story, Meta } from '@storybook/react/types-6-0';

import { RefreshButton, IRefreshButtonProps } from 'components';

export default {
  title: 'Components/Button/Refresh Button',
  component: RefreshButton,
} as Meta;

const Template: Story<IRefreshButtonProps> = ({ ...args }) => (
  <RefreshButton {...args} />
);

export const refreshButton = Template.bind({});
refreshButton.args = {};
