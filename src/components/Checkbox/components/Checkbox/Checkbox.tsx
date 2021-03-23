import { useState } from 'react';

import { SelectedSVG, UnSelectedSVG, SelectedPartSVG } from '@aicloud/ui-icons';

import { CheckboxWrapStyled, svgClassName } from './styled';

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
      <CheckboxWrapStyled
        className={className}
        onClick={handlerClick}
        data-disabled={disabled}
      >
        <SelectedPartSVG
          className={svgClassName}
          data-selected={partChecked || checked || value}
          data-disabled={disabled}
        />
      </CheckboxWrapStyled>
    );
  }

  if (checked || value) {
    return (
      <CheckboxWrapStyled
        className={className}
        onClick={handlerClick}
        data-disabled={disabled}
      >
        <SelectedSVG
          className={svgClassName}
          data-selected={partChecked || checked || value}
          data-disabled={disabled}
        />
      </CheckboxWrapStyled>
    );
  }

  return (
    <CheckboxWrapStyled
      className={className}
      onClick={handlerClick}
      data-disabled={disabled}
    >
      <UnSelectedSVG
        className={svgClassName}
        data-selected={partChecked || checked || value}
        data-disabled={disabled}
      />
    </CheckboxWrapStyled>
  );
};
