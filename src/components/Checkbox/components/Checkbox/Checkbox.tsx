import { useState } from 'react';

import { SelectedSVG, UnSelectedSVG, SelectedPartSVG } from '@aicloud/ui-icons';

import { StyledCheckboxWrap } from './styled';

export interface ICheckboxProps {
  defaultChecked?: boolean;
  value?: boolean;
  partChecked?: boolean;
  disabled?: boolean;
  onChange(
    checked: boolean,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void;
  className?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  disabled,
  value = false,
  defaultChecked = false,
  partChecked,
  onChange,
  className,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handlerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (disabled) {
      return;
    }

    if (partChecked) {
      onChange(false, e);
      return;
    }

    const isValueUndefined = value === undefined;
    const correctChecked = isValueUndefined ? !checked : !value;

    if (isValueUndefined) {
      setChecked(correctChecked);
    }

    onChange(correctChecked, e);
  };

  if (partChecked) {
    return (
      <StyledCheckboxWrap
        data-selected={partChecked || checked || value}
        data-disabled={disabled}
        className={className}
        onClick={handlerClick}
      >
        <SelectedPartSVG />
      </StyledCheckboxWrap>
    );
  }

  if (checked || value) {
    return (
      <StyledCheckboxWrap
        data-selected={partChecked || checked || value}
        data-disabled={disabled}
        className={className}
        onClick={handlerClick}
      >
        <SelectedSVG />
      </StyledCheckboxWrap>
    );
  }

  return (
    <StyledCheckboxWrap
      data-selected={partChecked || checked || value}
      data-disabled={disabled}
      className={className}
      onClick={handlerClick}
    >
      <UnSelectedSVG />
    </StyledCheckboxWrap>
  );
};
