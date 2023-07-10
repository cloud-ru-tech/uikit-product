# React Modal

## Installation

`npm i @sbercloud/uikit-product-modal`

## Props

```tsx
export enum Variant {
  Regular = 'Regular',
  Aggressive = 'Aggressive',
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export enum Align {
  Center = 'Center',
  Sided = 'Sided',
}

type CommonFooterButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  disabledTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'placement'>;
};

export type ApproveButtonProps = CommonFooterButtonProps & {
  onClick: MouseEventHandler<HTMLElement>;
  text?: string;
  alarm?: boolean;
};

export type AdditionalButtonProps = CommonFooterButtonProps & {
  onClick?: MouseEventHandler<HTMLElement>;
  text: string;
};

export type CancelButtonProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  text?: string;
};

type DefaultModalProps = {
  onClose(): void;
  isOpen: boolean;
  isLoading?: boolean;
  className?: string;
  content?: ReactNode;
  approveButton?: ApproveButtonProps;
  cancelButton?: CancelButtonProps;
  additionalButton?: AdditionalButtonProps;
  size?: Size;
  align?: Align;
  title: string;
  subtitle?: string;
  titleTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  /** @warning Use only if available in a Modal with Dropdown, Select, Datepicker, Timepicker. It may be dangerous...
   */
  disableScroll?: boolean;
};

type RegularModalProps = {
  variant?: Exclude<Variant, Variant.Aggressive>;
};

type AggressiveModalProps = {
  variant?: Variant.Aggressive;
  hideCross?: boolean;
};

export type ModalProps = WithSupportProps<DefaultModalProps & (RegularModalProps | AggressiveModalProps)>;

```

[Changelog](./CHANGELOG.md)
