import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { CarSVG, RocketInterfaceSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { TreeNodeProps } from '@snack-uikit/tree';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TreeNavigation, TreeNavigationProps } from '../src';

const meta: Meta = {
  title: 'Console/Page Layout/Tree Navigation',
  component: TreeNavigation,
};
export default meta;

function Template(props: TreeNavigationProps) {
  return <TreeNavigation {...props} />;
}

const render: StoryFn<TreeNavigationProps> = Template.bind({});

const mockMenuItems: TreeNodeProps[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <CarSVG />,
    href: '#',
  },
  {
    id: 'users',
    title: 'Пользователи',
    expandedIcon: <CarSVG />,
    collapsedIcon: <CarSVG />,
    nested: [
      {
        id: 'user-list',
        title: 'Все пользователи',
        href: '#',
        icon: <CarSVG />,
      },
      {
        id: 'user-roles',
        title: 'Роли и права доступа, допуски и прочее',
        href: '#',
      },
      {
        id: 'user-permissions',
        title: 'Права доступа',
        href: '#',
      },
    ],
  },
  {
    id: 'products',
    title: 'Продукты',
    nested: [
      {
        id: 'product-list',
        title: 'Каталог продуктов',
        href: '#',
      },
      {
        id: 'product-categories',
        title: 'Категории',
        href: '#',
      },
      {
        id: 'product-brands',
        title: 'Бренды',
        href: '#',
      },
    ],
  },
  {
    id: 'orders',
    title: 'Заказы',
    nested: [
      {
        id: 'order-list',
        title: 'Все заказы',
        href: '#',
      },
      {
        id: 'order-processing',
        title: 'В обработке',
        href: '#',
      },
      {
        id: 'order-history',
        title: 'История заказов',
        href: '#',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    icon: <div />,
  },
  {
    id: 'settings',
    title: 'Настройки',
    nested: [
      {
        id: 'general-settings',
        title: 'Общие настройки',
        href: '#',
      },
      {
        id: 'payment-settings',
        title: 'Оплата',
        href: '#',
      },
      {
        id: 'delivery-settings',
        title: 'Доставка',
        nested: [
          {
            id: 'delivery-methods',
            title: 'Способы доставки',
            href: '#',
          },
          {
            id: 'delivery-zones',
            title: 'Зоны доставки',
            href: '#',
          },
        ],
      },
    ],
  },
];

const mockContent = (
  <div
    style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      height: '70vh',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <h1>Main Content Area</h1>
    <p>This is the main content area of the page.</p>
    <p>You can place any content here, such as forms, tables, charts, etc.</p>
  </div>
);

render.args = {
  mode: 'aside',
  header: {
    title: 'Application Dashboard',
    description: 'Manage your projects and settings',
    icon: <RocketInterfaceSVG />,
    status: {
      label: 'Активный',
      appearance: 'green',
      hasBackground: true,
      size: 's',
    },
    actions: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ButtonOutline label='Редактировать' />
        <ButtonFilled label='Создать' />
      </div>
    ),
  },
  menu: {
    menuTitle: 'Заголовок меню',
    items: mockMenuItems,
    enableShrinkMenuButton: true,
    defaultMenuOpened: true,
  },
  content: mockContent,
};

export const treeNavigation: StoryObj<TreeNavigationProps> = {
  render: render,
  args: render.args,
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/fRoqCdDJvpg46w3BR5A3VJ/Product-UI-Kit?node-id=40126-13299&m=dev',
    },
    layout: 'fullscreen',
  },
};
