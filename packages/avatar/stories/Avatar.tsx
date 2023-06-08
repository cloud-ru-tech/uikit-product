import { Meta, StoryFn } from '@storybook/react';

import { Divider } from '@sbercloud/uikit-product-divider';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Avatar, AvatarProps } from '../src';
import { Column, Columns, Title, Wrapper } from './helpers';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;

const avatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

const AVATARS: Record<string, Omit<AvatarProps, 'variant'>[]> = {
  user: [
    {
      name: 'Дмитрий',
      status: Avatar.status.Online,
      onClick() {},
    },
    {
      name: 'Дмитрий Иванов',
      status: Avatar.status.Offline,
      onClick() {},
    },
  ],
  company: [
    {
      name: 'ГОУ СОШ №12',
      status: Avatar.status.Online,
    },
    {
      name: 'ГОУ СОШ №13',
      status: Avatar.status.Offline,
    },
  ],
  other: [
    {
      name: '123132',
      status: Avatar.status.Online,
    },
    {
      name: '"6632523"',
      status: Avatar.status.Offline,
    },
  ],
};

function Template(props: AvatarProps) {
  return (
    <Wrapper>
      <Title>Controlled:</Title>
      <Avatar {...props} />
      <br />
      <Divider />

      <Columns>
        <Title>Examples with statuses:</Title>

        <Column title='User' data={AVATARS.user} variant={Avatar.variants.User} size={props.size} />

        <Column title='Company' data={AVATARS.company} variant={Avatar.variants.Company} size={props.size} />

        <Column title='Other' data={AVATARS.other} variant={Avatar.variants.Other} size={props.size} />
      </Columns>
    </Wrapper>
  );
}

export const avatar: StoryFn<AvatarProps> = Template.bind({});
avatar.args = {
  name: 'Дмитрий Петрович Дмитриев',
  variant: Avatar.variants.User,
  size: Avatar.sizes.Medium,
  src: avatarSrc,
  onClick: undefined,
};
avatar.argTypes = {
  status: {
    options: Object.values({ ...Avatar.status, undefined: undefined }),
    control: {
      type: 'radio',
    },
  },
  size: {
    options: Object.values(Avatar.sizes),
    control: {
      type: 'radio',
    },
  },
};

avatar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=721%3A0',
  },
  badges: [BADGE.DEPRECATED],
  snackUiLink: 'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-avatar--avatar',
};
