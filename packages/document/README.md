# React Document

## Installation
`npm i @sbercloud/uikit-react-document`

## Props
```typescript jsx
export type FileProps = { 
  name: string;
  displayName?: string;
  MIMEType?: string;
  path?: string; 
  size?: number;
};

export type DocumentProps = {
  file: FileProps;
  onClick?(file: FileProps, e?: MouseEvent): void;
  disabled?: boolean;
  className?: string;
  removeButton?: {
    onClick(file: FileProps, e?: MouseEvent): void;
    tooltip: ButtonIconProps['tooltip'];
  };
};
```


