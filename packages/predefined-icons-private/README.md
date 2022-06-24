# React Predefined Icons Private

## Installation
`npm i @sbercloud/uikit-product-predefined-icons-private`

[Changelog](./CHANGELOG.md)

Predefined colored icons

```ts
type PredefinedLogoProps = WithSupportProps<{
  height: number;
  className?: string;
}>;

type PredefinedIconsPrivateProps = WithSupportProps<{
  icon: Icons;
  variant?: Variants;
  className?: string;
}>;

enum Variants {
  Primary = 'primary',
  OnDark = 'onDark',
  OnAccent = 'onAccent'
}

enum Icons {
  Info = 'info',
  Success = 'success',
  AttentionCritical = 'attention-critical',
  AttentionWarning = 'attention-warning',
  Failed = 'failed',
  Cancel = 'cancel',
  Loading = 'loading',
}
```
