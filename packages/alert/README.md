# Alert

## Installation
`npm i @sbercloud/uikit-product-alert`

## Components interface 

### Alert

```typescript jsx
enum AlertTypes {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

enum AlertVariants {
  Primary = 'Primary',
  Accent = 'Accent',
}

type AlertProps = WithSupportProps<{
  type: AlertTypes;
  description: ReactNode;
  className?: string;
  title?: string;
  onClose?(): void;
  variant: AlertVariants;
}>;
```
### AlertBanner
```typescript jsx
enum AlertBannerTypes {
  Alarm = 'Alarm',
  Warning = 'Warning',
  Neutral = 'Neutral',
}

type AlertBannerProps = WithSupportProps<{
  type: AlertBannerTypes; 
  description: ReactNode; 
  title?: string;
  className?: string;
  buttonProps?: Omit<ButtonRoundProps, 'variant'>;
  onClose?(): void;
}>;
```
### AlertCompact
```typescript jsx
enum AlertCompactTypes {
  Default = 'Default',
  Attention = 'Attention',
}

type AlertCompactProps = WithSupportProps<{
  description: ReactNode;
  className?: string;
  type?: AlertCompactTypes;
  linkProps?: Omit<LinkProps, 'className'>;
}>;
```