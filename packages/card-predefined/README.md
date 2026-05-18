# Card Predefined

## Installation
`npm i @cloud-ru/uikit-product-card-predefined`

## CardServiceLight

Компактная карточка сервиса для списков и навигации. Не использует обёртку `@snack-uikit/card`.

Корневой элемент — нативный `<a>` при передаче `href`, иначе `<button>`. Содержимое карточки (иконка, заголовок, promo tag) доступно для скринридеров. Кнопка «Избранное» отображается при наведении и фокусе на карточке; клик по ней не активирует переход по ссылке.

Тултип promo tag всегда открывается по `hover` (задаётся внутри компонента).

```tsx
import { CardServiceLight } from '@cloud-ru/uikit-product-card-predefined';

<CardServiceLight
  href="/services/compute"
  title="Compute"
  icon={<ComputeSVG />}
  promoTag={{ variant: 'preview', context: 'service', tooltip: { placement: 'top' } }}
  favorite={{ enabled: true, checked, onChange: setChecked }}
/>;
```

## CardServiceSmall

> **Deprecated.** Используйте [`CardServiceLight`](#cardservicelight).

Предыдущая реализация на базе `@snack-uikit/card` с overlay-ссылкой. Сохранена для обратной совместимости.

## Props

```ts
type CardServiceLightAnchorProps = {
  href: string;
  type?: never;
};

type CardServiceLightButtonProps = {
  href?: never;
  type?: 'button' | 'submit' | 'reset';
};

type CardServiceLightProps = WithSupportProps<
  (CardServiceLightAnchorProps | CardServiceLightButtonProps) & {
    icon: ReactElement;
    title: string;
    /** При отсутствии promo tag не отображается. Тултип всегда с trigger: 'hover' */
    promoTag?: Omit<PromoTagPredefinedProps, 'trigger'>;
    onClick?(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void;
    onKeyDown?: KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    truncate?: {
      title?: number;
    };
    favorite?: {
      enabled: boolean;
      checked?: boolean;
      onChange?(value: boolean): void;
    };
    className?: string;
  }
>;

/** @deprecated use CardServiceLight */
type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className' | 'disabled' | 'outline' | 'href' | 'checked'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      truncate?: Pick<NonNullable<Card.HeaderProps['truncate']>, 'title'>;
      favorite?: {
        enabled: boolean;
        visibilityStrategy: 'always' | 'hover';
        checked?: boolean;
        onChange?(value: boolean): void;
      };
      promoBadge?: PromoTagPredefinedProps | CardProps['promoBadge'];
    }
>;

type CardBannerProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      description: string;
      actionLabel: string;
      image: {
        src: string;
        alt: string;
      };
    }
>;

type CardServiceProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      description: string;
      actionLabel: string;
  }
>;

export type CardSuggestProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className'> & {
    title: string;
    description: string;
    truncate?: {
      title?: number;
      description?: number;
    };
  }
>;

```

[Changelog](./CHANGELOG.md)
