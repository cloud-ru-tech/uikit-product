# Counter

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