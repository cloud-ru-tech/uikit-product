import { Input } from 'components/Input';

import {
  wrapperClassName,
  inputClassName,
  copyButtonClassName,
  CopyInputWrapper,
} from './styled';

export interface ICopyInputProps {
  value: string;
  label?: string;
  width?: string;
  labelMinWidth?: string;
}

export const CopyInput: React.FC<ICopyInputProps> = ({
  value,
  label,
  width,
  labelMinWidth,
}) => (
  <CopyInputWrapper width={width}>
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
  </CopyInputWrapper>
);
