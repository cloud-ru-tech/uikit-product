import { JSXElementConstructor } from 'react';

export type IconSelector = JSXElementConstructor<{
  size?: number;
  className?: string;
}>;

export type Item = {
  id: string;
  title: string;
  icon: IconSelector;
  onClick?: () => void;
  tooltipText?: string;
};

export type TooltipMobile = {
  open: boolean;
  text?: string;
};

export type MultipleSelectorPlatformDropListProps = {
  /** Режим выбора */
  mode: 'multiple';
  /** Controlled состояние */
  value: Array<string>;
  /** Controlled обработчик изменения состояния */
  onChange(value: Array<string>): void;
};

export type SingleSelectorPlatformDropListProps = {
  /** Режим выбора */
  mode: 'single';
  /** Controlled состояние */
  value: string | undefined;
  /** Controlled обработчик изменения состояния */
  onChange(value: string | undefined): void;
};
