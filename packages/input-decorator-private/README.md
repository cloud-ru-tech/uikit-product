# React Input Decorator Private

## Installation
`npm i @sbercloud/uikit-react-input-decorator-private`

## Props
```typescript
type InputDecoratorPrivateProps = {
  children: ReactNode;
  error?: string;
  optional?: boolean;
  label?: string;
  labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  length?: {
    max: number;
    current: number;
  };
  hint?: string;
  className?: string;
};
```


