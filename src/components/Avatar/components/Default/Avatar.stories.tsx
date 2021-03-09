import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { HelpSVG } from '@aicloud/ui-icons';
import { styled } from '@linaria/react';

import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar/Default',
  component: Avatar,
} as Meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const Wrapper = styled.div`
  display: flex;
`;

export const Template = (): JSX.Element => (
  <Wrapper>
    <Avatar>Test Name</Avatar>
    <Avatar src={avatarSrc}>Test Name</Avatar>
    <Avatar icon={<HelpSVG size={14} />}>Test Name</Avatar>
  </Wrapper>
);

Template.parameters = {};
