import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ScalableRightSVG } from '@cloud-ru/uikit-product-icons';
import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  HeaderItemProps,
  HeaderItems,
  HeaderProps,
  LinkItem,
  SiteHeaderBasic,
  SubHeader,
  UserDetailsDropdown,
  UserDetailsDropdownProps,
  UserDetailsInline,
  UserDetailsInlineProps,
} from '../src';

const meta: Meta = {
  title: 'Site/Header',
  component: SiteHeaderBasic,
};
export default meta;

const Template: StoryFn<HeaderProps> = ({ ...args }) => (
  <SiteHeaderBasic
    {...args}
    subHeader={
      <SubHeader
        bannerInfo={{
          title: 'Информационная строка',
          color: 'yellow',
          link: 'https://cloud.ru',
        }}
        layoutType={args.layoutType}
        onCloseSubHeader={() => {}}
      />
    }
  />
);

export const header: StoryObj<HeaderProps> = {
  render: Template,
  args: {
    additionalLogoText: { link: '/', text: 'PARTNERS' },
    logo: {
      logoLink: '/',
      onClick: () => {},
    },
    mobileMenuContent: <div>Меню мобильной версии</div>,
    rightContent: <div>Правый контент</div>,
    layoutType: LAYOUT_TYPE.Desktop,
    appearance: 'none',
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/t34YeZy1XmhN6jmhbNmL9z/-LIB--SITE--Product-UI-Kit?node-id=17315-81597&m=dev',
    },
  },
};

const MENU_ITEMS: LinkItem[] = [
  {
    id: '0',
    label: 'Продукты',
  },
  {
    id: '1',
    label: 'Решения',
  },
  {
    id: '2',
    label: 'Цены',
  },
  {
    id: '3',
    label: 'О компании',
  },
  {
    id: '4',
    label: 'Для бизнеса',
  },
  {
    id: '5',
    label: 'Документация',
    href: '/docs',
    target: '_blank',
    icon: ScalableRightSVG,
  },
];

const TemplateHeaderItems: StoryFn<HeaderItemProps> = ({ ...args }) => <HeaderItems {...args} />;

export const items: StoryObj<HeaderItemProps> = {
  render: TemplateHeaderItems,
  args: {
    linkItems: MENU_ITEMS,
  },
};

const TemplateUserDetailsInline: StoryFn<UserDetailsInlineProps> = ({ ...args }) => <UserDetailsInline {...args} />;

export const userDetailsInline: StoryObj<UserDetailsInlineProps> = {
  render: TemplateUserDetailsInline,
  args: {
    userName: 'Иван',
    lastName: 'Иванов',
    onClickExit: () => {},
  },
};

const TemplateUserDetailsDropdown: StoryFn<UserDetailsDropdownProps> = ({ ...args }) => (
  <UserDetailsDropdown {...args} />
);

export const userDetailsDropdown: StoryObj<UserDetailsDropdownProps> = {
  render: TemplateUserDetailsDropdown,
  args: {
    userName: 'Иван1',
    lastName: 'Иванов1',
    onClickExit: () => {},
    onClickDropdownContent: () => {},
  },
};
