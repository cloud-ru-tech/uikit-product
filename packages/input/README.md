# React Input

## Installation

`npm i @sbercloud/uikit-product-input`

## [Private Input Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/input-private/CHANGELOG.md)

## [Private Input Decorator Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/input-decorator-private/CHANGELOG.md)

## Props

```typescript
enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

enum Types {
  Text = InputPrivate.types.Text,
  Password = InputPrivate.types.Password,
}

type InputPros = {
  value: string;
  onChange(value: string): void;
  className?: string;
  placeholder?: string;
  name?: string;
  size?: Sizes; // default: Sizes.Medium
  type?: Types; // default: Types.Text
  disabled?: boolean; // default: false
  error?: string;
  autoFocus?: boolean; // default: false
  autoComplete?: boolean; // default: false
  maxLength?: number;
  ref?: RefObject<HTMLInputElement>;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  hint?: string;
};
```
