# React Badge Private

## Installation
`npm i @sbercloud/uikit-react-badge-private`

## Components interface
```typescript
export enum Types {
    Info = 'info',
    Alert = 'alert',
}

export type BadgeProps = {
    type?: Types;
    number?: number;
    disabled?: boolean;
    className?: string;
    isGroupMessage?: boolean;
    children: React.ReactNode;
};
```

