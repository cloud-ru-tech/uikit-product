# React Spinner

## Installation
`npm i @sbercloud/uikit-react-spinner`

## Components interface
```typescript
export enum Sizes {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export type SpinnerProps = {
    size?: Sizes;
    text?: string;
    className?: string;
};
```

