import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Header, HeaderProps } from '../src';
import { ARG_TYPES, ARGS, getTemplate } from './headerTemplate';

export type StoryProps = HeaderProps & {
  showSelect: boolean;
  showPagePath: boolean;
  showSettings: boolean;
  showHelpMenu: boolean;
  showNotifications: boolean;
  showUserMenu: boolean;
  showUserMenuManagement: boolean;
  showUserMenuThemeSwitch: boolean;
  showUserMenuLogout: boolean;

  showAddOrganization: boolean;

  showLinks: boolean;
  showFooterLinks: boolean;
  showPinnedCards: boolean;
};

const meta: Meta = {
  title: 'Snack Uikit/Header/Desktop',
  component: Header,
};
export default meta;

export const desktop: StoryFn<StoryProps> = getTemplate({ mobile: false }).bind({});

desktop.args = ARGS;
desktop.argTypes = ARG_TYPES;

desktop.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/x6Rr5vkx6lrAJnlJ9nxpJl/branch/SG0EZxVoaD0AxdVvL8jHtN/Header?node-id=3%3A10&mode=dev',
  },
};
