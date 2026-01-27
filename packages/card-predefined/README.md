# Card Predefined

## Installation
`npm i @cloud-ru/uikit-product-card-predefined`


## Props

```ts
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

type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className'> & Required<Pick<Card.HeaderProps, 'title' | 'emblem'>>
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


