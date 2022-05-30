# React Input

## Installation

`npm i @sbercloud/uikit-product-input`

## [Private Input Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/input-private/CHANGELOG.md)

## [Private Input Decorator Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/input-decorator-private/CHANGELOG.md)

## Props

### InputCommon

```ts
type InputCommonProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
  placeholder?: string;
}>;
```

### InputMask

```ts
type InputMaskProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  mask: InputMaskPrivateProps['mask'];;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
}>;
```

### InputPhone

```ts
type InputPhoneProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
}>;
```

### InputSecurity

```ts
type InputSecurityProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
  placeholder?: string;
}>;
```

### InputOverview

```ts
type InputOverviewProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  onMoreButtonClick: () => void;
  moreButtonTooltipText?: string;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
  placeholder?: string;
}>;
```
