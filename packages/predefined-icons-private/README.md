# React Predefined Icons Private

## Installation
`npm i @sbercloud/uikit-product-predefined-icons-private`

[Changelog](./CHANGELOG.md)

Predefined colored icons

```ts
enum Variant {
  OnDefault = 'onDefault',
  OnAccent = 'onAccent',
}

type PredefinedMLSpaceLogoProps = WithSupportProps<{
  variant?: Variant;
  height: number;
  className?: string;
}>;

type PredefinedCloudLogoProps = WithSupportProps<{
  variant?: Variant;
  height: number;
  className?: string;
}>;

enum PredefinedDecorIconType {
  Predefined = 'predefined',
  Custom = 'custom',
}

enum Sizes {
  Medium = 'Medium',
  Large = 'Large',
}

type CommonPredefinedDecorIconProps = WithSupportProps<{
  size?: Sizes;
  className?: string;
}>;

type PredefinedDecorIconProps = CommonPredefinedDecorIconProps & {
  type: PredefinedDecorIconType.Predefined;
  predefinedIcon: Icon;
};

type DecorIconProps = CommonPredefinedDecorIconProps & {
  type: PredefinedDecorIconType.Custom;
  icon: ReactElement<{ size?: string | number }>;
};

type PredefinedDecorIconPrivateProps = PredefinedDecorIconProps | DecorIconProps;

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

enum Icon {
  Info = 'info',
  Success = 'success',
  AttentionCritical = 'attention-critical',
  AttentionWarning = 'attention-warning',
  Failed = 'failed',
  Cancel = 'cancel',
  Loading = 'loading',
}
```
