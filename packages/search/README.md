# Search

## Installation
`npm i @sbercloud/uikit-product-search`

[Changelog](./CHANGELOG.md)

## Props
```typescript
type SearchProps = {
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  size?: Size;
  variant?: Variant;
  placeholder?: string;
};
```