# Search

## Installation
`npm i @sbercloud/uikit-product-search`

## Props
```typescript
enum Variant {
  Transparent = 'transparent',
  Filled = 'filled',
  FilledWithStroke = 'filledWithStroke',
}

enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extraLarge',
}

type SearchProps = {
  className?: string;
  ref?: HTMLInputElement;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  size?: Size;
  variant?: Variant;
  placeholder?: string;
};
```