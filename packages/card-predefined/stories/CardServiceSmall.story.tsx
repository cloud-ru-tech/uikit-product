import { Meta, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardServiceSmall, CardServiceSmallProps } from '../src';
import cardImg from './cardImg.jpg';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Cards/ServiceSmall',
  component: CardServiceSmall,
};
export default meta;

type StoryProps = CardServiceSmallProps & {
  emblemMode: 'icon' | 'image';
  showFavorite: boolean;
  visibilityStrategy: NonNullable<CardServiceSmallProps['favorite']>['visibilityStrategy'];
};

function Template({ emblemMode, showFavorite, visibilityStrategy, ...args }: StoryProps) {
  const emblem: CardServiceSmallProps['emblem'] =
    emblemMode === 'icon' ? { icon: PlaceholderSVG } : { src: cardImg, alt: '' };

  return (
    <div className={styles.cardServiceSmall}>
      <CardServiceSmall {...args} emblem={emblem} favorite={{ enabled: showFavorite, visibilityStrategy }} />
    </div>
  );
}

export const serviceSmall: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Карточка сервиса',
    promoBadge: 'Beta',
    emblemMode: 'icon',
    outline: false,
    showFavorite: false,
    visibilityStrategy: 'hover',
  },

  argTypes: {
    emblemMode: {
      name: '[Story]: Card emblem',
      options: ['icon', 'image'],
      defaultValue: 'icon',
      control: {
        type: 'radio',
      },
    },
    visibilityStrategy: {
      name: '[Story]: Favorite visibility strategy',
      options: ['hover', 'always'],
      defaultValue: 'hover',
      control: {
        type: 'radio',
      },
      if: { arg: 'showFavorite', eq: true },
    },
    promoBadge: {
      type: 'string',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
    design: {
      type: 'figma',
      name: 'Figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=534%3A12605&mode=design&t=rA1Ijc6tEN0NY1zg-1',
    },
  },
};
