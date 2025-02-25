import { StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import * as Icons from '@sbercloud/uikit-product-icons';

import { IconElement, IconProps } from '../src/helperComponents/Icon';
import styles from './styles.module.scss';

export const ICONS = {
  ...Object.fromEntries(
    (Object.keys(Icons) as Array<keyof typeof Icons>)
      .filter(key => key !== 'Sprite')
      .map(key => {
        const Icon = Icons[key];
        return [key, Icon];
      }),
  ),
};

export type CommonCardStoryProps = {
  storyIcon: IconElement;
  iconMode: 'icon' | 'image' | 'custom';
  imgSrc: string;
};

export const COMMON_CARD_STORY_ARGS: CommonCardStoryProps = {
  storyIcon: Icons.PlaceholderSVG,
  iconMode: 'icon',
  imgSrc: 'https://cdn.cloud.ru/backend/images/about/qr_main.svg',
};

export const COMMON_CARD_STORY_ARG_TYPES: StoryObj['argTypes'] = {
  icon: {
    control: false,
  },
  storyIcon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    defaultValue: Icons.PlaceholderSVG,
    control: {
      type: 'select',
    },
  },
  imgSrc: {
    name: '[Stories]: Image',
    if: { arg: 'iconMode', eq: 'image' },
  },
  iconMode: {
    name: '[Stories]: Card Icon mode',
    options: ['icon', 'image', 'custom'],
    control: {
      type: 'radio',
    },
    table: {
      type: {
        summary: 'Пример передачи разных сущностей в проп icon',
      },
    },
  },
};

export function useStoryIcon({ iconMode, storyIcon, imgSrc }: CommonCardStoryProps): IconProps['icon'] {
  return useMemo(() => {
    switch (iconMode) {
      case 'custom': {
        return <div className={styles.customNode}>1</div>;
      }
      case 'image': {
        return <img className={styles.image} alt='emblem' src={imgSrc} />;
      }
      case 'icon':
      default: {
        return storyIcon;
      }
    }
  }, [imgSrc, iconMode, storyIcon]);
}
