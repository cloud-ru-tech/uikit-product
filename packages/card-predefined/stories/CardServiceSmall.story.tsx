import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { PromoTagPredefinedProps } from '@sbercloud/uikit-product-promo-tag-predefined';
import { PromoTagProps } from '@snack-uikit/promo-tag';

import { BADGE } from '#storybookConstants';

import { VARIANTS } from '../../promo-tag-predefined/src/components/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardServiceSmall, CardServiceSmallProps } from '../src';
import cardImg from './cardImg.jpg';
import { PROMO_TAG_APPEARANCE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Cards/ServiceSmall',
  component: CardServiceSmall,
};
export default meta;

type StoryProps = CardServiceSmallProps & {
  emblemMode: 'icon' | 'image';
  promoBadgeMode: 'none' | 'custom' | PromoTagPredefinedProps['variant'];
  promoBadgeText: string;
  promoBadgeAppearance: PromoTagProps['appearance'];
  showFavorite: boolean;
  visibilityStrategy: NonNullable<CardServiceSmallProps['favorite']>['visibilityStrategy'];
};

function Template({
  emblemMode,
  showFavorite,
  visibilityStrategy,
  promoBadgeMode,
  promoBadgeText,
  promoBadgeAppearance,
  ...args
}: StoryProps) {
  const emblem: CardServiceSmallProps['emblem'] =
    emblemMode === 'icon' ? { icon: PlaceholderSVG } : { src: cardImg, alt: '' };

  const promoBadge = useMemo(() => {
    if (promoBadgeMode === 'none') {
      return undefined;
    }

    if (promoBadgeMode === 'custom') {
      return { text: promoBadgeText, appearance: promoBadgeAppearance };
    }

    return { variant: promoBadgeMode };
  }, [promoBadgeMode, promoBadgeText, promoBadgeAppearance]);

  return (
    <div className={styles.cardServiceSmall}>
      <CardServiceSmall
        {...args}
        emblem={emblem}
        favorite={{ enabled: showFavorite, visibilityStrategy }}
        promoBadge={promoBadge}
      />
    </div>
  );
}

export const serviceSmall: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Карточка сервиса',
    promoBadgeMode: 'none',
    promoBadgeText: 'My custom badge',
    promoBadgeAppearance: 'primary',
    emblemMode: 'icon',
    outline: false,
    showFavorite: false,
    visibilityStrategy: 'hover',
  },

  argTypes: {
    emblemMode: {
      name: '[Story]: Card emblem',
      options: ['icon', 'image'],
      control: { type: 'radio' },
    },
    promoBadgeMode: {
      name: '[Story]: Card promo badge',
      options: ['none', 'custom', ...Object.values(VARIANTS)],
      control: { type: 'select' },
    },
    promoBadgeText: {
      name: '[Story]: Card promo badge custom -> text',
      control: { type: 'text' },
      if: { arg: 'promoBadgeMode', eq: 'custom' },
    },
    promoBadgeAppearance: {
      name: '[Story]: Card promo badge custom -> appearance',
      options: Object.values(PROMO_TAG_APPEARANCE),
      if: { arg: 'promoBadgeMode', eq: 'custom' },
      control: { type: 'select' },
    },
    visibilityStrategy: {
      name: '[Story]: Favorite visibility strategy',
      options: ['hover', 'always'],
      control: {
        type: 'radio',
      },
      if: { arg: 'showFavorite', eq: true },
    },
    emblem: { table: { disable: true } },
    promoBadge: { table: { disable: true } },
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
