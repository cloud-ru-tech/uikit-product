import { Story, Meta } from '@storybook/react/types-6-0';

import { MoreButton, IMoreButtonProps } from 'components';

export default {
  title: 'Components/Button/More Button',
  component: MoreButton,
} as Meta;

const Template: Story<IMoreButtonProps> = ({ ...args }) => (
  <MoreButton {...args} />
);

export const moreButton = Template.bind({});
moreButton.args = {
  actions: [{ name: 'Удалить', onClick: () => {} }],
};
