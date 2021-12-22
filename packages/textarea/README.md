# React Textarea

## Installation
`npm i @sbercloud/uikit-react-textarea`

## Props
```typescript
export type TextareaProps = {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  maxRows?: number; // 3 is the minimal
  maxLength?: number;
  ref?: HTMLTextAreaElement;
};
```


