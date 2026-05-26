import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo } from 'react';

import { PlaceholderSVG } from '@cloud-ru/uikit-product-icons';
import { PromoTagPredefinedProps } from '@cloud-ru/uikit-product-promo-tag-predefined';
import { PLACEMENT } from '@snack-uikit/popover-private';
import { TooltipProps } from '@snack-uikit/tooltip';

import { BADGE } from '../../../storybook/constants';
import { PREVIEW_CONTEXT, VARIANTS } from '../../promo-tag-predefined/src/components/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardServiceLight, CardServiceLightProps, VISIBILITY_STRATEGY, VisibilityStrategy } from '../src';
import styles from './styles.module.scss';

const FIGMA_URL =
  'https://www.figma.com/design/6LwXeYGHKj64LqV99kWo6N/%D0%9D%D0%B0%D0%B2%D0%B8%D0%B3%D0%B0%D1%86%D0%B8%D1%8F--FF-8318-?node-id=47716-164605';

const meta: Meta = {
  title: 'Console/Cards/ServiceLight',
  component: CardServiceLight,
};
export default meta;

type StoryProps = Omit<CardServiceLightProps, 'href' | 'type' | 'truncate'> & {
  element: 'link' | 'button';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  truncateTitle: number;
  showFavorite: boolean;
  favoriteControlled: boolean;
  favoriteChecked: boolean;
  favoriteVisibilityStrategy: VisibilityStrategy;
  promoTagMode: 'none' | PromoTagPredefinedProps['variant'];
  promoTagContext: NonNullable<PromoTagPredefinedProps['context']>;
  promoTagTooltipPlacement: TooltipProps['placement'];
  promoTagClickable: boolean;
};

const DEFAULT_HREF = 'https://cloud.ru';

function Template({
  element,
  href,
  type,
  showFavorite,
  favoriteControlled,
  favoriteChecked,
  favoriteVisibilityStrategy,
  promoTagMode,
  promoTagContext,
  promoTagTooltipPlacement,
  promoTagClickable,
  truncateTitle,
  ...args
}: StoryProps) {
  const [, updateArgs] = useArgs<StoryProps>();

  useEffect(() => {
    if (element === 'button' && (href !== undefined || type === undefined)) {
      updateArgs({ type: type ?? 'button', href: undefined });
    }

    if (element === 'link' && (type !== undefined || href === undefined)) {
      updateArgs({ href: href ?? DEFAULT_HREF, type: undefined });
    }
  }, [element, href, type, updateArgs]);

  const handleFavoriteChange = useCallback(
    (value: boolean) => {
      updateArgs({ favoriteChecked: value });
    },
    [updateArgs],
  );

  const favorite = useMemo((): CardServiceLightProps['favorite'] => {
    if (!showFavorite) {
      return undefined;
    }

    if (favoriteControlled) {
      return {
        enabled: true,
        checked: favoriteChecked,
        visibilityStrategy: favoriteVisibilityStrategy,
        onChange: handleFavoriteChange,
      };
    }

    return {
      enabled: true,
      visibilityStrategy: favoriteVisibilityStrategy,
    };
  }, [favoriteChecked, favoriteControlled, favoriteVisibilityStrategy, handleFavoriteChange, showFavorite]);

  const promoTag = useMemo((): CardServiceLightProps['promoTag'] => {
    if (promoTagMode === 'none') {
      return undefined;
    }

    return {
      variant: promoTagMode,
      ...(promoTagMode === VARIANTS.Preview ? { context: promoTagContext } : {}),
      tooltip: {
        placement: promoTagTooltipPlacement,
      },
      ...(promoTagClickable
        ? {
            onClick: () => {
              alert('Promo tag clicked!');
            },
          }
        : {}),
    };
  }, [promoTagClickable, promoTagContext, promoTagMode, promoTagTooltipPlacement]);

  const handleClick = useCallback(() => {
    if (element === 'button') {
      alert('Clicked!');
    }
  }, [element]);

  const cardProps = useMemo(() => {
    const truncate = { title: truncateTitle };

    if (element === 'link') {
      return {
        ...args,
        href: href ?? DEFAULT_HREF,
        truncate,
      };
    }

    return {
      ...args,
      type: type ?? 'button',
      truncate,
    };
  }, [args, element, href, truncateTitle, type]);

  return (
    <div className={styles.cardServiceLight}>
      <CardServiceLight
        {...cardProps}
        icon={<PlaceholderSVG />}
        favorite={favorite}
        promoTag={promoTag}
        onClick={handleClick}
      />
    </div>
  );
}

export const serviceLight: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Название сервиса',
    element: 'button',
    type: 'button',
    href: DEFAULT_HREF,
    promoTagMode: VARIANTS.Preview,
    promoTagContext: PREVIEW_CONTEXT.Service,
    promoTagTooltipPlacement: 'top',
    promoTagClickable: false,
    showFavorite: true,
    favoriteVisibilityStrategy: VISIBILITY_STRATEGY.hover,
    favoriteControlled: true,
    favoriteChecked: false,
    truncateTitle: 1,
    layoutType: 'desktop',
  },

  argTypes: {
    element: {
      name: '[Story]: Element type',
      control: { type: 'radio' },
      options: ['button', 'link'],
    },
    href: {
      if: { arg: 'element', eq: 'link' },
    },
    type: {
      name: '[Story]: Button type',
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
      if: { arg: 'element', eq: 'button' },
    },
    truncateTitle: {
      name: '[Story]: Truncate title max lines',
      control: { type: 'number', min: 1 },
    },
    promoTagMode: {
      name: '[Story]: Promo tag',
      options: ['none', ...Object.values(VARIANTS)],
      control: { type: 'select' },
    },
    promoTagContext: {
      name: '[Story]: Promo tag preview -> context',
      options: Object.values(PREVIEW_CONTEXT),
      control: { type: 'select' },
      if: { arg: 'promoTagMode', eq: VARIANTS.Preview },
    },
    promoTagTooltipPlacement: {
      name: '[Story]: Promo tag -> tooltip placement',
      options: Object.values(PLACEMENT),
      control: { type: 'select' },
      if: { arg: 'promoTagMode', neq: 'none' },
    },
    promoTagClickable: {
      name: '[Story]: Promo tag clickable',
      control: { type: 'boolean' },
      if: { arg: 'promoTagMode', neq: 'none' },
    },
    showFavorite: {
      name: '[Story]: Show favorite',
      control: { type: 'boolean' },
    },
    favoriteVisibilityStrategy: {
      name: '[Story]: Favorite visibility strategy',
      control: { type: 'radio' },
      options: Object.values(VISIBILITY_STRATEGY),
      if: { arg: 'showFavorite', eq: true },
    },
    favoriteControlled: {
      name: '[Story]: Favorite controlled',
      control: { type: 'boolean' },
      if: { arg: 'showFavorite', eq: true },
    },
    favoriteChecked: {
      name: '[Story]: Favorite checked',
      control: { type: 'boolean' },
      if: { arg: 'favoriteControlled', eq: true },
    },
    favorite: { table: { disable: true } },
    promoTag: { table: { disable: true } },
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
      url: FIGMA_URL,
    },
  },
};
