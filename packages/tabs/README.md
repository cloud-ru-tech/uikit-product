# React Tabs

## Installation
`npm i @sbercloud/uikit-product-tabs`

## Introduction
Component supports controlled & uncontrolled approaches of work simultaneously.
For uncontrolled behavior you have to pass `value` prop into `Tabs.Container`.
For controlled you have to additionally pass onChange handler.

## Props 
```tsx
type TabId = ReactText;

enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

enum CounterTypes {
  Count = 'Count',
  Notify = 'Notify',
}

type ContainerProps = {
  children: ReactElement[];
  size?: Sizes;
  counterType?: CounterTypes;
  value: TabId;
  onChange?(tab: TabId): void;
};

type NavigationListProps = WithSupportProps<{
  children: ReactElement<NavigationItemProps>[];
  className?: string;
}>;

type NavigationItemProps = WithSupportProps<{
  value: TabId;
  label: ReactText; 
  disabled?: boolean;
  counter?: number;
}>;

type ContentProps = WithSupportProps<{
  value: TabId;
  children: ReactChildren | ReactText;
  className?: string;
}>;
```
