import { RefObject } from 'react';

export type IInputProps = {
  type?: 'default' | 'embed' | 'security' | 'number';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  wrapperClassName?: string;
  copyButtonClassName?: string;
  className?: string;
  postfix?: React.ReactNode;
  allowClear?: boolean;
  allowCopy?: boolean;
  numberMin?: number;
  numberMax?: number;
  valueFormatter?: (val: React.ReactText) => React.ReactText;
  disabled?: boolean;
  label?: string;
  labelMinWidth?: string;
  wrapperRef?: RefObject<HTMLDivElement>;
  onScroll?: (event: React.UIEvent<HTMLInputElement>) => void | boolean;
};
