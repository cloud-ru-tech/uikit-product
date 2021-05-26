import { Meta, Story } from '@storybook/react/types-6-0';

import { MoreButton, MoreButtonProps } from '../src';

export default {
  title: 'Components/Button/More Button',
  component: MoreButton,
} as Meta;

const Template: Story<MoreButtonProps> = ({ ...args }) => <MoreButton {...args} />;

export const moreButton = Template.bind({});
moreButton.args = {
  actions: [{ name: 'Удалить', onClick: () => {} }],
};
