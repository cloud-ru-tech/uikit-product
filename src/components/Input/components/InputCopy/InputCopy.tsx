import { useState } from 'react';
import { css } from '@linaria/core';

import { EyeSVG } from '@aicloud/ui-icons';

import { CopyButton } from 'components/Button';
import { TableText } from 'typography/Table';

import { ButtonBox, Label, TextBox, InputBox } from './styled';

type TCopyInputProps = {
  value: string;
  label?: string;
  labelMinWidth?: string;
  className?: string;
  security?: boolean;
};

const textStyle = css`
  flex-grow: 1;
  text-overflow: inherit;
  overflow: hidden;
  white-space: nowrap;
  line-height: 36px;
  margin-right: 8px;

  :hover ~ div:not(${ButtonBox}) {
    fill: #5558fa;
  }
`;

export const InputCopy: React.FC<TCopyInputProps> = ({
  value,
  label,
  labelMinWidth,
  className,
  security,
}) => {
  const [isViewMode, setIsViewMode] = useState(!security);
  const [overrideClick, setOverrideClick] = useState(0);

  const handlerCopyClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();

    setOverrideClick(overrideClick + 1);
  };

  const handleCopyButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
  };

  const viewValue = isViewMode ? value : value.replace(/./g, '·');

  return (
    <InputBox className={className}>
      {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
      <TextBox isViewMode={isViewMode}>
        <TableText className={textStyle} onClick={handlerCopyClick}>
          {viewValue}
        </TableText>
        {security && (
          <ButtonBox onClick={(): void => setIsViewMode(!isViewMode)}>
            {/* NOW: check icon, there is no eyeclosedsvg in icon lib */}
            {isViewMode ? <EyeSVG /> : <EyeSVG />}
          </ButtonBox>
        )}
        <CopyButton
          text={value}
          overrideClick={overrideClick}
          onClick={handleCopyButtonClick}
        />
      </TextBox>
    </InputBox>
  );
};
