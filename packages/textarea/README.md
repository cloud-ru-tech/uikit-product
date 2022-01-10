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
    error?: string;
    className?: string;
    maxRows?: number;
    maxLength?: number;
    ref?: RefObject<HTMLTextAreaElement>;
    label?: string;
    labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
    optional?: boolean;
    hint?: string;
};
```


