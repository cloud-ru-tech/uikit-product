import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionSocial, SectionSocialProps } from '../src';
import habrLogo from './assets/habr-logo.png';
import tgLogo from './assets/tg-logo.png';
import vcLogo from './assets/vc-logo.png';
import vkLogo from './assets/vk-logo.png';
import youtubeLogo from './assets/youtube-logo.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Social',
  component: SectionSocial,
};

export default meta;

type StoryProps = SectionSocialProps;

const Template: StoryFn<StoryProps> = args => (
  <div className={styles.resizeWrapper}>
    <SectionSocial {...args} />
  </div>
);

export const social: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-social',
    layoutType: 'desktop',
    title: 'Станьте частью сообщества',
    cards: [
      {
        title: 'Telegram-канал Cloud.ru',
        description: 'Новости компании, лучшие практики внедрения облаков и актуальные IT-тренды',
        href: 'https://t.me/cloudruprovider',
        icon: <img className={styles.image} alt='tg-cloud-ru' src={tgLogo} />,
      },
      {
        title: 'Telegram-канал Cloud.ru Tech',
        description: 'Посты от экспертов Сloud.ru, анонсы IT-конференций, вакансии и стажировки',
        href: 'https://t.me/cloudrutech',
        icon: <img className={styles.image} alt='tg-cloud-ru-tech' src={tgLogo} />,
      },
      {
        title: 'VC',
        description: 'Статьи про использование облаков, AI и ML в бизнесе',
        href: 'https://vc.ru/cloud.ru',
        icon: <img className={styles.image} alt='vc-ru' src={vcLogo} />,
      },
      {
        title: 'VK',
        description: 'Новости, видео и интересные факты про облака',
        href: 'https://vk.com/cloudruprovider',
        icon: <img className={styles.image} alt='vk' src={vkLogo} />,
      },
      {
        title: 'Habr',
        description: 'Технические статьи про наши разработки, лайфхаки для инженеров и не только',
        href: 'https://habr.com/ru/companies/cloud_ru/articles/',
        icon: <img className={styles.image} alt='habr' src={habrLogo} />,
      },
      {
        title: 'YouTube',
        description: 'Подкасты с IT-экспертами: обсуждаем карьеру и разработку',
        href: 'https://www.youtube.com/@cloudru_team',
        icon: <img className={styles.image} alt='youtube' src={youtubeLogo} />,
      },
    ],
    backgroundColor: 'neutral-background',
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
