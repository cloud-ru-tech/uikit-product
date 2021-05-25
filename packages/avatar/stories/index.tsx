import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { HelpSVG } from '@sbercloud/icons';

import { Avatar, AvatarProps } from '../src';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const Wrapper = styled.div`
  display: flex;

  & > * {
    margin-right: 20px;
  }
`;

const Template: Story<AvatarProps> = ({ ...args }) => (
  <Wrapper>
    <Avatar {...args} />
    <Avatar {...args} src={avatarSrc} />
    <Avatar {...args} icon={<HelpSVG size={14} />} />
  </Wrapper>
);

export const avatar = Template.bind({});
avatar.args = {
  username: 'Test Name',
};
avatar.parameters = {};
avatar.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: ['m', 'l', 30, 40, 50],
    },
  },
};
