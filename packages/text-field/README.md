# React Text Field

## Installation
`npm i @sbercloud/uikit-product-text-field`

## Props
```typescript
type TextFieldProps = {
  className?: string;
  type?: Types;
  text: string;
  extraIcons?: ReactNode;
  allowCopy?: boolean;
};

enum Types {
  OneLine = 'OneLine',
  MultiLine = 'MultiLine',
  Password = 'Password',
}
```


