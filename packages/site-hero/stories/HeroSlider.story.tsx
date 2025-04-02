import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { MouseEvent } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroSlider, HeroSliderProps } from '../src';
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
    title: 'Есть где<br> развернуться',
    description: 'Делаем доступ к облакам и AI простым&nbsp;и&nbsp;удобным',
    appearance: 'brand',
    button: {
      label: 'Попробовать бесплатно',
      onClick: stubClick,
      href: 'https://console-dev.cp.sbercloud.dev/static-page/login-destination?zoneclick=banner&amp;nameelement=Попробовать бесплатно&amp;retain_url=https://dev.site.sbercloud.dev/',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/main_custom_slider_first_desktop.webp',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/main_custom_slider_first_tablet.webp',
      },
      format: 'rectangle',
    },
    erid: {
      tip: 'В соответствии со статьей 12.5.1',
      appearance: 'neutral',
    },
  },
  {
    title: 'Дарим до 20 000 бонусов',
    description:
      '4 000 бонусов — физическим лицам, 20 000 бонусов — юридическим лицам и ИП. <br>Хватит для развертывания сайта или запуска проекта.',
    appearance: 'decor',
    color: 'blue',
    button: {
      label: 'Зарегистрироваться',
      onClick: stubClick,
      href: 'https://console-dev.cp.sbercloud.dev/static-page/login-destination?zoneclick=banner&nameelement=%D0%97%D0%B0%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F&retain_url=https://dev.site.sbercloud.dev/',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/20_bonus2502.png',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/bonuses_tablet.png',
      },
      format: 'square',
    },
  },
  {
    title: 'Масштабная конференция про&nbsp;облака и AI',
    description: '30+ докладов про AI&amp;ML, новые сервисы, сценарии работы в облаке и демо облачных платформ',
    appearance: 'graphite',
    button: {
      label: 'Принять участие',
      onClick: stubClick,
      href: 'https://dev.site.sbercloud.dev/gocloud',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/main_custom_slider_golcoud_desktop.webp',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/main_custom_slider_golcoud_tablet.webp',
      },
      format: 'rectangle',
    },
    erid: {
      tip: 'В соответствии со статьей 12.5.1',
      appearance: 'invert-neutral',
    },
  },
  {
    title: 'Обновили реферальную программу',
    description:
      'Рекомендуйте Cloud.ru и зарабатывайте больше: увеличили вознаграждение до 20% и&nbsp;расширили&nbsp;срок&nbsp;выплат. Подключайтесь до 31 мая',
    appearance: 'decor',
    color: 'blue',
    button: {
      label: 'Узнать подробнее',
      onClick: stubClick,
      href: 'https://cloud.ru/partners/referral',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/15_reward2502.png',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/referral_tablet.png',
      },
      format: 'square',
    },
  },
  {
    title: 'Бесплатные курсы <br>и&nbsp;сертификации',
    description:
      'Развивайте экспертизу в сфере облачных технологий и знакомьтесь с сервисами Cloud.ru на&nbsp;практике',
    appearance: 'decor',
    color: 'violet',
    button: {
      label: 'Подробнее',
      onClick: stubClick,
      href: 'https://cloud.ru/education',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/kursy2502.png',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/education_tablet.png',
      },
      format: 'square',
    },
    erid: {
      tip: 'В соответствии со статьей 12.5.1',
      appearance: 'neutral',
    },
  },
  {
    title: 'Evolution free tier <br> бесплатно навсегда',
    description:
      'Виртуальная машина Intel Gold 6248R 3 ГГц с&nbsp;диском SSD&nbsp;NVMe на 30 ГБ <br> и&nbsp;5 ГБ объектного хранилища, за которые не&nbsp;надо платить',
    appearance: 'brand',
    button: {
      label: 'Попробовать',
      onClick: stubClick,
      href: 'https://cloud.ru/offers/free-tier',
    },
    media: {
      type: 'image',
      source: {
        desktop: 'https://cdn.cloud.ru/backend/carousel/main-carousel/freetier2502.png',
        tablet: 'https://cdn.cloud.ru/backend/carousel/main-carousel/main_slide_1_tablet.png',
      },
      format: 'square',
    },
  },
];

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={cn(styles.body, styles.fullPageHeight)}>
    <div className={styles.wrapper}>
      <HeroSlider {...args} items={DEMO_SLIDES} />
    </div>
  </div>
);

export const heroSlider: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    autoSwipe: 5,
  },
  argTypes: {
    layoutType: { control: { type: 'select' } },
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
