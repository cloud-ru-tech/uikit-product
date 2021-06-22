import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Avatar, AvatarProps } from '../src';

export default {
  title: 'Not stable/Avatar',
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
    <Avatar {...args} username='' />
  </Wrapper>
);

export const avatar = Template.bind({});
avatar.args = {
  username: 'Test Name',
};
avatar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Temp-Design-System?node-id=727%3A46',
  },
};
avatar.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: [Avatar.sizes.XS, Avatar.sizes.S, Avatar.sizes.M, Avatar.sizes.L, Avatar.sizes.XL],
    },
  },
  shape: {
    control: {
      type: 'radio',
      options: [Avatar.shapes.Square, Avatar.shapes.Circle],
    },
  },
  placeholder: {
    control: {
      type: 'radio',
      options: [Avatar.placeholderIcons.Company, Avatar.placeholderIcons.User],
    },
  },
  color: {
    control: {
      type: 'radio',
      options: [
        Avatar.colors.Green,
        Avatar.colors.Blue,
        Avatar.colors.Purple,
        Avatar.colors.Pink,
        Avatar.colors.Red,
        Avatar.colors.DefaultGray,
        Avatar.colors.Gray,
        Avatar.colors.Brown,
        Avatar.colors.Orange,
        Avatar.colors.Yellow,
        Avatar.colors.YellowGreen,
        Avatar.colors.BlueGreen,
      ],
    },
  },
  username: {
    control: {
      type: 'text',
    },
  },
};
