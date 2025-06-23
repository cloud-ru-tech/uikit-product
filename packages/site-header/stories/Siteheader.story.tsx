import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeaderItemProps, HeaderItems, HeaderProps, LinkItem, SiteHeaderBasic } from '../src';

const meta: Meta = {
  title: 'Site/Header',
  component: SiteHeaderBasic,
};
export default meta;

const Template: StoryFn<HeaderProps> = ({ ...args }) => <SiteHeaderBasic {...args} />;

export const header: StoryObj<HeaderProps> = {
  render: Template,
  args: {
    logoContentText: 'PARTNERS',
    logoLink: '/',
    mobileMenuContent: <div>Меню мобильной версии</div>,
    rightContent: <div>Правый контент</div>,
    layoutType: 'desktop',
    subHeader: (
      <div
        style={{
          height: '20px',
          width: '100%',
          background: 'yellow',
        }}
      >
        Инфострока
      </div>
    ),
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
    label: 'Документация',
    href: '/docs',
    target: '_blank',
  },
  {
    id: '4',
    label: 'О компании',
  },
  {
    id: '5',
    label: 'Для бизнеса',
  },
];

const TemplateHeaderItems: StoryFn<HeaderItemProps> = ({ ...args }) => <HeaderItems {...args} />;

export const items: StoryObj<HeaderItemProps> = {
  render: TemplateHeaderItems,
  args: {
    linkItems: MENU_ITEMS,
  },
};
