import { ChangeEvent } from 'react';

export type InputProps = {
  type?: 'default' | 'embed' | 'security' | 'number';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  wrapperClassName?: string;
  className?: string;
  postfix?: React.ReactNode;
  allowClear?: boolean;
  allowCopy?: boolean;
  numberMin?: number;
  numberMax?: number;
  valueFormatter?: (val: React.ReactText) => React.ReactText;
  disabled?: boolean;
};
