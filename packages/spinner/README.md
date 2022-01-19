# React Spinner

## Installation
`npm i @sbercloud/uikit-react-spinner`

## Components interface
```typescript
enum Sizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type SpinnerProps = {
  size?: Sizes;
  text?: string;
  className?: string;
};
```

