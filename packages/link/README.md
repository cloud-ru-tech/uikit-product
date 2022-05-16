# React Link

## Installation

`npm i @sbercloud/uikit-product-link`

## Props

```typescript
enum Variant {
  OnPrimary = 'primary',
  OnDark = 'dark',
}

enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

type LinkProps = WithSupportProps<{
  className?: string;
  variant?: Variant; // default: Variant.OnPrimary,
  text?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  showSuffixIcon?: boolean; // default: false
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']; // defualt: '_blank'
  href?: string; // default '#'
  disabled?: boolean; // default: false
  size?: Sizes; // default: Sizes.Medium
  prefixIcon?: React.ReactElement;
}>;
```
