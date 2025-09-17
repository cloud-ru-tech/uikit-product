import { Meta, StoryObj } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { UserMenu, UserMenuProps } from '../src';
import { SETTING_ITEMS } from './constants';

const meta: Meta = {
  title: 'Console/Header/User Menu',
  component: UserMenu,
};
export default meta;

function Template({ ...args }: UserMenuProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: 40,
        resize: 'horizontal',
        overflow: 'hidden',
      }}
    >
      <UserMenu {...args} />
    </div>
  );
}

function buildItems(items: string[]) {
  return items.map(item => ({
    content: {
      option: item,
    },
  }));
}

export const userMenu: StoryObj<UserMenuProps> = {
  render: Template,
  args: {
    isMobile: false,
    profile: {
      fullName: 'Ivan Petrov',
      email: 'ipetrov@cloud.ru',
      inviteCount: 1,
    },
    theme: {
      value: 'light',
      onChange: value => toaster.userAction.neutral({ label: `theme onChange ${value}` }),
    },
    onClick: () => toaster.userAction.neutral({ label: 'onClick' }),
    onLogout: () => toaster.userAction.neutral({ label: 'onLogout click' }),
    settingItems: SETTING_ITEMS,
    items: buildItems(['Option 1', 'Option 2']),
  },
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.BETA],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=32725-978435&m=dev',
    },
  },
};
