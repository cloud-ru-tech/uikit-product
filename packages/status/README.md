# React Status

> ### Deprecation notice
>
> Вместо данного компонента следует использовать пакет [`@snack-uikit/status`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/status),
>
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-status-status--status)

## Installation

`npm i @sbercloud/uikit-product-status`

## Props

### StatusBadge

```ts
type StatusBadgeProps = {
  type?: Types;
  className?: string;
  icon: ReactNode;
};

enum Types {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
  Unactive = 'unactive',
  Progress = 'progress',
  Neutral = 'neutral',
}
```

### StatusDot

```ts
type StatusDotProps = {
  type: Types;
  size?: Sizes;
  className?: string;
};

enum Types {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
  Unactive = 'unactive',
  Progress = 'progress',
  Neutral = 'neutral',
}

enum Sizes {
  ExtraSmall = 'ExtraSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
}
```

### StatusTag

```ts
type StatusTagProps = {
  type?: Types;
  variant?: Variant;
  className?: string;
  text: string;
};

enum Types {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
  Unactive = 'unactive',
  Progress = 'progress',
  Neutral = 'neutral',
}

enum Variant {
  Transparent = 'transparent',
  Light = 'light',
  Dark = 'dark',
}
```
