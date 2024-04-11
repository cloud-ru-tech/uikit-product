# Info Row

## Installation
`npm i @sbercloud/uikit-product-info-row`

## Props

```typescript
type InfoRowProps = WithSupportProps<{
  label: string;
  labelTruncate?: number;
  labelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  content?: ReactNode;
  rowActions?: {
    first: RowActionButton;
    second?: RowActionButton;
  };
  loading?: boolean;
}>;

type DataType = Record<string, unknown>;

type InfoGroupProps<T extends DataType> = {
  data: T | undefined;
  items: InfoGroupItem<T>[];
  className?: string;
  loading?: boolean;
};

type PropsWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<InfoRowPropsBase, 'content'>;

type PropsWithRender<T extends DataType> = {
  render: (data: T) => ReactNode;
  accessorKey?: never;
} & Omit<InfoRowPropsBase, 'content'>;

type InfoGroupItem<T extends DataType> = PropsWithRender<T> | PropsWithAccessorKey<T>;
```

[Changelog](./CHANGELOG.md)


