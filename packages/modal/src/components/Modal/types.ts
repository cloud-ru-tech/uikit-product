import { ReactNode } from 'react';

import { FooterProps, Size, Variant } from '@sbercloud/uikit-product-modal-private';
import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Align } from './constants';

type DefaultModalProps = {
  onClose(): void;
  isOpen: boolean;
  isLoading?: boolean;
  className?: string;
  content?: ReactNode;
  approveButton?: FooterProps['approveButton'];
  cancelButton?: FooterProps['cancelButton'];
  additionalButton?: FooterProps['additionalButton'];
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
