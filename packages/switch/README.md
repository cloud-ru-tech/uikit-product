# React Switch

## Installation
`npm i @sbercloud/uikit-react-switch`

## Props 
```typescript
type SwitchProps = {
  checked: boolean;
  onChange(checked: boolean, e?: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent): void;
  className?: string;
  disabled?: boolean;
  size?: Size;
};

enum Size {
  Small = 'small',
  Big = 'big',
}
```


