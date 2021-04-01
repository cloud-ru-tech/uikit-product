import { Input } from 'components/Input';

import {
  wrapperClassName,
  inputClassName,
  copyButtonClassName,
} from './styled';

export interface ICopyInputProps {
  value: string;
}

export const CopyInput: React.FC<ICopyInputProps> = ({ value }) => (
  <Input
    disabled
    allowCopy
    type='embed'
    value={value}
    className={inputClassName}
    wrapperClassName={wrapperClassName}
    copyButtonClassName={copyButtonClassName}
  />
);
