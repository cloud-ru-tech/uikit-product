# React Status

## Installation
`npm i @sbercloud/uikit-react-status`

## Props 
```typescript
type StatusTagProps = {
  type?: Types;
  variant?: Variant;
  className?: string;
  text: string;
};

type StatusBadgeProps = {
  type: Types;
  className?: string;
};

type StatusProps = {
  type?: Types;
  className?: string;
  icon: React.ReactNode;
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


