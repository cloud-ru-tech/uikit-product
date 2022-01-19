# React Checkbox

## Installation
`npm i @sbercloud/uikit-react-checkbox`

## Props
```typescript
type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  partChecked?: boolean;
  label?: React.ReactNode;
  handleChange(checked: boolean, e: React.ChangeEvent<HTMLInputElement>): void;
};

type FavouriteProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  variant?: Variants;
  handleChange(checked: boolean, e: React.ChangeEvent<HTMLInputElement>): void;
};

enum Variants {
  Weak = 'weak',
  Strong = 'strong',
  OnAccent = 'onAccent',
}
```


