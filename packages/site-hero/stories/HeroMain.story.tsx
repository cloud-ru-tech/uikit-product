import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroMain, HeroMainProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Main',
  component: HeroMain,
};
export default meta;

type StoryProps = HeroMainProps & {
  showTags: boolean;
  showPlatforms: boolean;
  showButtons: boolean;
  showSecondaryButton: boolean;
  showNavbar: boolean;
  showPlaceholderImage: boolean;
  showVideo: boolean;
};

const stubClick = () => window.alert('Clicked!');

const BREADCRUMBS = [
  { id: 'main-page', label: 'Главная', href: '/' },
  { id: 'products', label: 'Продукты', href: '/products' },
  { id: 'product', label: 'Title' },
];

const PLATFORMS: HeroMainProps['platforms'] = [
  {
    id: 'advanced',
    title: 'Advanced',
    href: '/advanced',
  },
  {
    id: 'mlspace',
    title: 'ML Space',
    href: '/mlspace',
  },
  {
    id: 'evolution',
    title: 'Evolution',
    href: '/evolution',
  },
];

const NAVBAR_ITEMS: NonNullable<HeroMainProps['navbar']>['items'] = [
  {
    text: 'Преимущества',
    id: 'advantages',
  },
  {
    id: 'tariffs',
    text: 'Тарифы',
  },
  {
    id: 'scenarios',
    text: 'Сценарии',
  },
  {
    id: 'gpu',
    text: 'Графические ускорители',
  },
  {
    id: 'efficiency',
    text: 'Эффективность',
  },
  {
    id: 'possibilities',
    text: 'Возможности',
  },
  {
    id: 'faq',
    text: 'FAQ',
  },
  {
    id: 'webinars',
    text: 'Вебинары',
  },
];

const TAGS: HeroMainProps['tags'] = [
  {
    text: 'Только для юрлиц',
    appearance: 'violet',
  },
  {
    text: 'Бесплатная конфигурация',
    appearance: 'blue',
    tip: 'При бесплатном использовании ресурсы предоставляются исключительно для тестирования в рамках рекламной кампании. Не подразумевается безвозмездное предоставление ресурсов по смыслу пп. 4 п.1 ст. 575 ГК РФ.',
  },
  {
    text: 'Бесплатный старт',
    appearance: 'blue',
    tip: 'При бесплатном использовании ресурсы предоставляются исключительно для тестирования в рамках рекламной кампании. Не подразумевается безвозмездное предоставление ресурсов по смыслу пп. 4 п.1 ст. 575 ГК РФ.',
  },
  {
    text: 'Акция действует до 30.04.2025',
    appearance: 'neutral',
  },
];

const Template: StoryFn<StoryProps> = ({
  showTags,
  showPlatforms,
  showButtons,
  showSecondaryButton,
  showNavbar,
  showVideo,
  image,
  ...args
}) => {
  const buttons = useMemo(() => {
    const items: HeroMainProps['buttons'] = [
      {
        label: 'Попробовать',
        onClick: stubClick,
      },
    ];

    if (showSecondaryButton) {
      items.push({
        label: 'Перейти',
        href: 'https://cloud.ru',
      });
    }

    return items;
  }, [showSecondaryButton]);

  return (
    <div className={cn(styles.body, styles.fullPageHeight)}>
      <div className={styles.wrapper}>
        <HeroMain
          {...args}
          image={showVideo ? undefined : image}
          video={
            showVideo
              ? {
                  src: 'https://cdn-video.cloud.ru/backend/video/about-page/hero.mp4',
                  poster: 'https://cdn.cloud.ru/backend/images/about/preview.png',
                  controls: false,
                  autoPlay: true,
                  loop: true,
                }
              : undefined
          }
          breadcrumbs={BREADCRUMBS}
          platforms={showPlatforms ? PLATFORMS : undefined}
          handlePlatformClick={showPlatforms ? stubClick : undefined}
          buttons={showButtons ? buttons : undefined}
          navbar={showNavbar ? { items: NAVBAR_ITEMS, onItemClick: stubClick } : undefined}
          tags={showTags ? TAGS : undefined}
        />
        <div className={styles.longContent}>Какой-то очень длинный контент</div>
      </div>
    </div>
  );
};

export const heroMain: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    title: 'Вычислительные мощности с GPU',
    description: 'Аренда виртуальных машин, серверов и ML-сервисов с графическими ускорителями',
    backgroundColor: 'neutral-background',
    image: 'https://cdn.cloud.ru/backend/images/access-to-gpu-vms/access-to-virtual-machines-with-gpu-3d-model.png',
    showTags: true,
    showPlatforms: true,
    showButtons: true,
    showSecondaryButton: true,
    showNavbar: true,
    showVideo: false,
  },
  argTypes: {
    layoutType: { control: { type: 'select' } },
    backgroundColor: { control: { type: 'select' } },
    showTags: {
      name: '[Story]: Show tags',
      control: { type: 'boolean' },
    },
    showPlatforms: {
      name: '[Story]: Show platforms',
      control: { type: 'boolean' },
    },
    showButtons: {
      name: '[Story]: Show buttons',
      control: { type: 'boolean' },
    },
    showSecondaryButton: {
      name: '[Story]: Show secondary button',
      control: { type: 'boolean' },
      if: { arg: 'showButtons', eq: true },
    },
    showNavbar: {
      name: '[Story]: Show navbar',
      control: { type: 'boolean' },
    },
    showVideo: {
      name: '[Story]: Show video instead of image',
      control: { type: 'boolean' },
    },
    video: {
      table: {
        disable: true,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?m=auto&node-id=3167-19425',
    },
  },
};
