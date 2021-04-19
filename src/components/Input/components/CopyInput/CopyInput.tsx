import { Input } from 'components/Input';

import {
  wrapperClassName,
  inputClassName,
  copyButtonClassName,
} from './styled';

export interface ICopyInputProps {
  value: string;
  label?: string;
  labelMinWidth?: string;
}

export const CopyInput: React.FC<ICopyInputProps> = ({
  value,
  label,
  labelMinWidth,
}) => (
  <Input
    disabled
    allowCopy
    type='embed'
    value={value}
    label={label}
    className={inputClassName}
    labelMinWidth={labelMinWidth}
    wrapperClassName={wrapperClassName}
    copyButtonClassName={copyButtonClassName}
  />
);
