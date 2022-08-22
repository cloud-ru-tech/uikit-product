# Scroll

## Installation
`npm i @sbercloud/uikit-product-scroll`

[Changelog](./CHANGELOG.md)

Scroll component for usage in all cases but tables

## Props
```typescript
enum Variants {
  Primary = 'primary',
  OnDark = 'onDark',
}

enum Sizes {
  Small = 'small',
  Medium = 'medium',
}

type ScrollProps = {
  children: ReactNode;
  size?: Sizes;
  variant?: Variants;
  flexbox?: boolean;
  onScroll?: (event?: UIEvent) => void;
};
```