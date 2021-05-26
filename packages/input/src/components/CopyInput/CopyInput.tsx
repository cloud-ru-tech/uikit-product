import copyText from 'copy-to-clipboard';
import { useState } from 'react';

import { CopyButton } from '@sbercloud/uikit-react-button';

import { Label, StyledIconWrapper, StyledInput, StyledInputWrapper, StyledWrap, copyButtonClassName } from './styled';

export type CopyInputProps = {
  value: string;
  label?: string;
  labelMinWidth?: string;
  wrapperClassName?: string;
};

export const CopyInput: React.FC<CopyInputProps> = ({ value, label, labelMinWidth, wrapperClassName }) => {
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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
      <StyledInputWrapper labelMinWidth={labelMinWidth}>
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
