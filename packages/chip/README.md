# React Chip

## Installation
`npm i @sbercloud/uikit-react-chip`

## Props
```typescript
export type ChipProps = {
  label: string;
  checked: boolean;
  handleChange(checked: boolean, e?: ChangeEvent<HTMLInputElement>): void;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
  className?: string;
};

export enum Variant {
  Primary = 'Primary',
  Transparent = 'Transparent',
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
}
```


