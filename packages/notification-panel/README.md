# Notification Panel

## Installation

`npm i @sbercloud/uikit-product-notification-panel`

[Changelog](./CHANGELOG.md)

## Props

```ts
enum CardType {
  Default = 'default',
  Alarm = 'alarm',
}

type ButtonProps = {
  text: ReactText;
  onClick?: MouseEventHandler<HTMLElement>;
};

type Card = {
  id: string;
  type: CardType;
  showNewBadge: boolean;
  header: {
    headerIcon?: JSX.Element;
    breadcrumbsTitles: string[];
    time?: string;
  };
  content: {
    contentIcon?: JSX.Element;
    title: string;
    description: JSX.Element;
    avatar?: AvatarProps;
    buttons?: ButtonProps[];
    onCardClick?(id: string): void;
  };
};

type NotificationPopupProps = WithSupportProps<{
  children?: ReactNode;
  cards: Card[];
  headerTooltip?: string;
  open: boolean;
  loadCards?: {
    fetchMore(): void;
    hasMore: boolean;
  };
  onToggle(value: boolean): void;
  onCardsRead(cardIds: string[]): void;
  onCardDelete(id: string): void;
  onReadAllButtonClick?(): void;
  onSeeAllButtonClick?(): void;
  onTabChange?({ activeTab }: { activeTab?: Tab }): void;
  loading?: boolean;
  error?: boolean;
}>;
```
