import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeroEvent, HeroEventProps } from '../src';
import { HERO_BUTTONS } from '../src/constants';
import { CATEGORY_TAG_META, CATEGORY_TAGS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Hero/Hero Event',
  component: HeroEvent,
};
export default meta;

type StoryProps = HeroEventProps & {
  placeTitle: string;
  heroButtonType: HeroEventProps['button']['type'];
  categoryStoryType: ValueOf<typeof CATEGORY_TAGS>;
};

const Template: StoryFn<StoryProps> = ({ placeTitle, heroButtonType, categoryStoryType, ...args }) => {
  const categoryMeta = categoryStoryType && CATEGORY_TAG_META[categoryStoryType];

  return (
    <div className={cn(styles.body, styles.fullPageHeight)}>
      <div className={styles.wrapper}>
        <HeroEvent
          {...args}
          category={categoryMeta}
          place={placeTitle ? { title: placeTitle } : {}}
          button={heroButtonType ? { type: heroButtonType } : {}}
        />
      </div>
    </div>
  );
};

export const heroEvent: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    title: 'Как подтвердить знания про облака: анонс новых курсов и сертификации',
    breadcrumbs: [
      { id: 'main-page', label: 'Главная', href: '/' },
      { id: 'events', label: 'Мероприятия', href: '/events' },
      { id: 'event', label: 'Как подтвердить знания про облака: анонс новых курсов и сертификации' },
    ],
    categoryStoryType: 'webinar',
    format: 'online',
    audience: 'it',
    backgroundColor: 'neutral-background',
    startsAt: '16 января в 11:00 мск',
    placeTitle: 'Лужники',
    heroButtonType: 'watch',
    image: 'https://cdn.cloud.ru/backend/webinars-images/education.png',
  },
  argTypes: {
    layoutType: { control: { type: 'select' } },
    categoryStoryType: {
      name: '[Story]: Category',
      control: { type: 'select' },
      options: Object.values(CATEGORY_TAGS),
    },
    format: { control: { type: 'select' } },
    audience: { control: { type: 'select' } },
    backgroundColor: { control: { type: 'select' } },
    placeTitle: {
      name: '[Story]: place title',
      control: { type: 'text' },
    },
    heroButtonType: {
      name: '[Story]: hero button type',
      control: { type: 'select' },
      options: Object.values(HERO_BUTTONS),
    },
    place: { table: { disable: true } },
    button: { table: { disable: true } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3820-63653&t=dIHRiF1o4SDXdFuo-4',
    },
  },
};
