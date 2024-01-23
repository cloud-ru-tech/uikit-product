# React Spinner

> ### Deprecation notice
>
> Вместо данного компонента следует использовать пакет [`@snack-uikit/loaders`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/loaders),
>
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-loaders-spinner--spinner)

## Installation

`npm i @sbercloud/uikit-product-spinner`

## Components interface

```typescript
enum Sizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type SpinnerProps = {
  size?: Sizes;
  text?: string;
  className?: string;
};
```
