import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { MouseEvent } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroSlider, HeroSliderProps } from '../src';
import slideImage from './assets/slideImage.webp';
import slideImageMobile from './assets/slideImageMobile.webp';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Slider',
  component: HeroSlider,
};
export default meta;

type StoryProps = HeroSliderProps & {};

const stubClick = (e: MouseEvent) => {
  e.preventDefault();
  window.alert('Clicked!');
};

const DEMO_SLIDES: HeroSliderProps['items'] = [
  {
    title: 'AI DevTools Conf',
    description:
      'Конференция для AI/ML-инженеров и разработчиков. Воркшопы, нетворкинг, демо AI-сервисов и много практики. Ждем вас 4 декабря.',
    appearance: 'graphite',
    button: {
      label: 'Подробнее',
      onClick: stubClick,
      href: '#',
    },
    media: {
      type: 'image',
      source: {
        desktop: slideImage,
        tablet: slideImage,
        mobile: slideImageMobile,
      },
    },
    erid: {
      tip: 'ERID demo content. Connect local Title demo content. Connect local Title demo content. Connect local Title demo ',
      place: 'tooltip',
    },
  },
  {
    title: 'Умное облако с ИИ-помощником',
    description: 'Делаем доступ к облакам и AI простым и удобным',
    appearance: 'graphite',
    button: {
      label: 'В консоль',
      onClick: stubClick,
      href: '#',
    },
    media: {
      type: 'image',
      source: {
        desktop: slideImage,
        tablet: slideImage,
        mobile: slideImageMobile,
      },
    },
  },
  {
    title: 'Дарим до 20 000 бонусов',
    description:
      '4 000 бонусов — физическим лицам, 20 000 бонусов — юридическим лицам и ИП. Хватит для развертывания сайта или запуска проекта.',
    appearance: 'decor',
    color: 'blue',
    button: {
      label: 'Зарегистрироваться',
      onClick: stubClick,
      href: '#',
    },
    media: {
      type: 'image',
      source: {
        desktop: slideImage,
        tablet: slideImage,
        mobile: slideImageMobile,
      },
    },
    erid: {
      tip: 'ERID demo content. Connect local Title demo content. Connect local Title demo content. Connect local Title demo ',
      place: 'tooltip',
    },
  },
  {
    title: 'Обновили реферальную программу',
    description:
      'Рекомендуйте Cloud.ru и зарабатывайте больше: увеличили вознаграждение до 20% и расширили срок выплат.',
    appearance: 'decor',
    color: 'blue',
    button: {
      label: 'Узнать подробнее',
      onClick: stubClick,
      href: '#',
    },
    media: {
      type: 'image',
      source: {
        desktop: slideImage,
        tablet: slideImage,
        mobile: slideImageMobile,
      },
    },
  },
  {
    title: 'Мигрируйте бесплатно в наше облако',
    description:
      'Даем ресурсы на весь период миграции. А еще консультируем, подбираем инфраструктуру, учим и поддерживаем.',
    appearance: 'decor',
    color: 'violet',
    button: {
      label: 'Подробнее',
      onClick: stubClick,
      href: '#',
    },
    media: {
      type: 'image',
      source: {
        desktop: slideImage,
        tablet: slideImage,
        mobile: slideImageMobile,
      },
    },
    erid: {
      tip: 'ERID demo content. Connect local Title demo content. Connect local Title demo content. Connect local Title demo ',
      place: 'tooltip',
    },
  },
];

const DEMO_TABS = [
  { title: 'AI DevTools Conf' },
  { title: 'Умное облако с ИИ-помощником' },
  { title: 'Дарим до 20 000 бонусов' },
  { title: 'Реферальная программа' },
  { title: 'Мигрируйте бесплатно' },
];

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={cn(styles.body, styles.fullPageHeight)}>
    <div className={styles.wrapper}>
      <HeroSlider {...args} items={DEMO_SLIDES} tabs={DEMO_TABS} />
    </div>
  </div>
);

export const heroSlider: StoryObj<StoryProps> = {
  render: Template,
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
