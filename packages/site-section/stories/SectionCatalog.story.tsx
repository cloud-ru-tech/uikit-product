import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { EvolutionComputeSVG, PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { TagSpecialProps } from '@sbercloud/uikit-product-site-tag';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionCatalog, SectionCatalogProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Catalog',
  component: SectionCatalog,
};

export default meta;

type StoryProps = SectionCatalogProps;

const Template: StoryFn<StoryProps> = ({ id, layoutType, ...rest }) => (
  <div className={styles.resizeWrapper}>
    <SectionCatalog id={id} layoutType={layoutType} {...rest} />
  </div>
);

const TAGS: TagSpecialProps[] = [
  { text: 'legal', appearance: 'neutral' },
  { text: 'preview', appearance: 'blue' },
];

const onClick = (item: string) => () => toaster.userAction.success({ label: `"${item}" clicked!` });

const getProducts = (products: string[]): SectionCatalogProps['categories'][number]['items'] =>
  products.map(title => ({
    title,
    description: 'Описание',
    icon: PlaceholderSVG,
    tags: TAGS,
    onClick: onClick(title),
    href: '#',
  }));

export const catalog: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-promo-list',
    layoutType: 'desktop',
    backgroundColor: 'neutral-background',
    title: 'Продукты Cloud.ru',
    categories: [
      {
        id: 'popular',
        label: 'Популярное',
        items: [
          {
            title: 'Evolution Managed Kubernetes',
            description: 'Управление контейнерными приложениями в кластере Kubernetes',
            icon: { src: 'https://cdn.cloud.ru/backend/products/evo-compute/icon.svg' },
            tags: TAGS,
            onClick: onClick('Evolution Managed Kubernetes'),
            href: '#',
          },
          {
            title: 'Evolution Compute',
            description: 'Виртуальные машины для развертывания сервисов и приложений',
            icon: EvolutionComputeSVG,
            tags: [TAGS[0]],
            onClick: onClick('Evolution Compute'),
            href: '#',
          },
        ],
      },
      {
        id: 'infrastructure',
        label: 'Инфраструктура',
        items: getProducts([
          'Evolution Compute',
          'Evolution Bare Metal',
          ' 3D-моделирование и рендеринг',
          'Evolution Stack',
          'Evolution Image',
          'Evolution SSH Keys',
        ]),
      },
      {
        id: 'network',
        label: 'Сети',
        items: getProducts([
          'Cross-platform connection',
          'Evolution Magic Router',
          'Evolution Load Balancer',
          'Evolution public IP',
          'Evolution SNAT Gateway',
          'Evolution Security Groups',
          'Direct Connect',
          'CDN',
        ]),
      },
      {
        id: 'storage',
        label: 'Хранение и резервное копирование',
        items: getProducts(['Evolution Object Storage', 'Evolution Disk']),
      },
      {
        id: 'containers',
        label: 'Контейнеры',
        items: getProducts(['Evolution Managed Kubernetes', 'Evolution Container Apps', 'Evolution Artifact Registry']),
      },
      {
        id: 'data-platform',
        label: 'Платформа данных',
        items: getProducts([
          'Evolution Managed PostgreSQL®',
          'Evolution Managed Trino',
          'Evolution Managed Metastore',
          'Evolution Managed Kafka®',
          'Evolution Managed Redis®',
          'Evolution Managed Spark',
        ]),
      },
      {
        id: 'security',
        label: 'Безопасность',
        items: getProducts([
          'Curator Anti-DDoS',
          'Curator Anti‑DDoS+WAF',
          'Cloud Advisor',
          'StormWall: Anti-DDoS',
          'StormWall: Anti-DDoS+WAF',
          'UserGate: виртуальный NGFW',
          'UserGate: Professional Services',
        ]),
      },
      {
        id: 'management',
        label: 'Управление и администрирование',
        items: getProducts(['Evolution Task History', 'Evolution Tags']),
      },
      {
        id: 'ai-instruments',
        label: 'ML/AI Инструменты',
        items: getProducts(['Evolution ML Inference']),
      },
    ],
    footer: ['Все продукты', 'Marketplace'].map(label => ({ label, onClick: onClick(label) })),
  },
  argTypes: {
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=7369-475592&t=6PG0wWrr0AIK5xSu-1',
    },
  },
};
