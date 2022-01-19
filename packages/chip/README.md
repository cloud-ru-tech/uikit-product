# React Chip

## Installation
`npm i @sbercloud/uikit-react-chip`

## Props
```typescript
type ChipProps = {
  label: string;
  checked: boolean;
  handleChange(checked: boolean, e?: ChangeEvent<HTMLInputElement>): void;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
  className?: string;
};

enum Variant {
  Primary = 'Primary',
  Transparent = 'Transparent',
}

enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
}
```


