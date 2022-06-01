# React Tag

## Installation

`npm i @sbercloud/uikit-product-tag`

## Props

```ts
type TagProps = {
  color: Colors;
  value: ReactText;
  className?: string;
  size?: Sizes;
  onRemoveClick?: MouseEventHandler<HTMLElement>;
};

type TagRowProps = {
  items: TagRowItem[];
  size?: Sizes;
  className?: string;
  onItemRemove?(item: TagRowItem['value']): void;
};

type TagRowItem = {
  value: ReactText;
  color: Colors;
};

enum Colors {
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Pink = 'pink',
  Red = 'red',
  Gray = 'gray',
  Brown = 'brown',
  Orange = 'orange',
  Yellow = 'yellow',
}

enum Sizes {
  Small = 'small',
  Medium = 'medium',
}
```
