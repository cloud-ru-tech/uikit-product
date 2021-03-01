import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MoreButton, TMoreButtonProps } from './MoreButton';

export default {
  title: 'Components/Button/More Button',
  component: MoreButton,
} as Meta;

const Template: Story<TMoreButtonProps> = ({ ...args }) => (
  <MoreButton {...args} />
);

export const moreButton = Template.bind({});
moreButton.args = {
  actions: [{ name: 'Уладить', onClick: () => console.log('Удалить') }],
};
