import { useState } from 'react';
import copyText from 'copy-to-clipboard';

import { CopyButton } from 'components/Button';

import {
  Label,
  StyledWrap,
  StyledInput,
  StyledIconWrapper,
  StyledInputWrapper,
  copyButtonClassName,
} from './styled';

export interface ICopyInputProps {
  value: string;
  label?: string;
  labelMinWidth?: string;
  wrapperClassName?: string;
}

export const CopyInput: React.FC<ICopyInputProps> = ({
  value,
  label,
  labelMinWidth,
  wrapperClassName,
}) => {
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);

  const handleCopyButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setIsCopyCompleted(true);
    copyText(value);

    setTimeout(() => {
      setIsCopyCompleted(false);
    }, 3000);
  };

  return (
    <StyledWrap className={wrapperClassName}>
      {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
      <StyledInputWrapper>
        <StyledInput onClick={handleInputClick}>{value}</StyledInput>
        <StyledIconWrapper>
          <CopyButton
            text={value.toString()}
            onClick={handleCopyButtonClick}
            className={copyButtonClassName}
            showCopyCompleted={isCopyCompleted}
          />
        </StyledIconWrapper>
      </StyledInputWrapper>
    </StyledWrap>
  );
};
