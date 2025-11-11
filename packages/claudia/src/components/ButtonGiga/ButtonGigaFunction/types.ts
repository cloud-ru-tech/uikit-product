import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, ICON_POSITION, SIZE } from '../constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type IconPosition = ValueOf<typeof ICON_POSITION>;

export type Size = ValueOf<typeof SIZE>;

export type BaseButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  iconPosition?: IconPosition;
  label?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  size?: Size;
  appearance?: Appearance;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  tabIndex?: number;
  fullWidth?: boolean;
};

export type AnchorButtonProps = {
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

export type CommonButtonProps = AnchorButtonProps & BaseButtonProps;
