# React Badge Private

## Installation
`npm i @sbercloud/uikit-product-badge-private`

## Components interface
```typescript
enum Types {
  Info = 'info',
  Alert = 'alert',
}

type BadgeProps = {
  type?: Types;
  number?: number;
  disabled?: boolean;
  className?: string;
  isGroupMessage?: boolean;
  children: React.ReactNode;
};
```

