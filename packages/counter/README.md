# Counter

> ### Deprecation notice
>
> Вместо данного компонента следует использовать пакет [`@snack-ui/counter`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/counter),
>
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-counter--counter)

## Installation
`npm i @sbercloud/uikit-product-counter`

[Changelog](./CHANGELOG.md)

## Props
```typescript

enum Variant {
  Primary = 'primary',
  OnDark = 'onDark',
}

enum CounterType {
  Count = 'count',
  Notify = 'notify',
}

type CounterProps = {
  value: number;
  type?: CounterType
  className?: string;
  variant?: Variant;
}
```