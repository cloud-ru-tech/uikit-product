# React Predefined Icons Private

## Installation
`npm i @sbercloud/uikit-react-predefined-icons-private`

[Changelog](./CHANGELOG.md)

Predefined colored icons

```ts
type PredefinedIconsPrivateProps = WithSupportProps<{
  icon: Icons;
  variant?: Variants;
  className?: string;
}>;

enum Variants {
  Primary = 'primary',
  OnDark = 'onDark',
}

enum Icons {
  Success = 'success',
  Failed = 'failed',
  Cancel = 'cancel',
  Loading = 'loading',
}
```
