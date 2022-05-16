# React Textarea

## Installation
`npm i @sbercloud/uikit-product-textarea`

## [Private Textarea Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/textarea-private/CHANGELOG.md)
## [Private Input Decorator Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/input-decorator-private/CHANGELOG.md)

## Props
```typescript
export type TextareaProps = {
  value: string;
  onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  ref?: RefObject<HTMLTextAreaElement>;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  hint?: string;
};
```


