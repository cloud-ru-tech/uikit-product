import { RefObject } from 'react';

export type InputElementType = HTMLInputElement & { _valueTracker: { setValue(val: string): void } };

export enum InputTypes {
  default = 'default',
  embed = 'embed',
  security = 'security',
  number = 'number',
}
export interface InputProps {
  type?: InputTypes;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: InputProps['value'];
  wrapperClassName?: string;
  copyButtonClassName?: string;
  postfix?: React.ReactNode;
  allowClear?: boolean;
  allowCopy?: boolean;
  label?: string;
  labelMinWidth?: string;
  wrapperRef?: RefObject<HTMLDivElement>;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  className?: string;
  getInstance?: (instance: RefObject<HTMLInputElement>) => void;
  name?: string;
  autoComplete?: string;
  onOpenDialog?(): void;
}
