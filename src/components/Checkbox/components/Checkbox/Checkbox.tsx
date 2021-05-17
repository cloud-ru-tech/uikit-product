import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { SelectedSVG, UnSelectedSVG, SelectedPartSVG } from '@sbercloud/icons';

import { useElementId } from 'utils/useElementId';

import {
  CheckboxStyled,
  CheckboxLabelStyled,
  svgClassName,
  CheckboxChildrenStyled,
} from './styled';

export interface ICheckboxProps
  extends Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > {
  checked: boolean;
  id?: string;
  partChecked?: boolean;
  disabled?: boolean;
  wrapClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  handleChange(
    checked: boolean,
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ): void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  id,
  checked,
  disabled,
  handleChange,
  partChecked,
  wrapClassName,
  labelClassName,
  inputClassName,
  children,
  ...restProps
}) => {
  const checkboxId = useElementId(id);
  const handleClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ): void => {
    if (disabled) {
      return;
    }

    if (partChecked) {
      handleChange(false, e);
      return;
    }

    handleChange(!checked, e);
  };

  const Icon = () => {
    const iconData = {
      default: (
        <UnSelectedSVG
          className={svgClassName}
          data-selected={partChecked || checked || undefined}
          data-disabled={disabled || undefined}
        />
      ),
      partChecked: (
        <SelectedPartSVG
          className={svgClassName}
          data-selected={partChecked || checked || undefined}
          data-disabled={disabled || undefined}
        />
      ),
      checked: (
        <SelectedSVG
          className={svgClassName}
          data-selected={partChecked || checked || undefined}
          data-disabled={disabled || undefined}
        />
      ),
    };

    if (partChecked) {
      return iconData.partChecked;
    }

    if (checked) {
      return iconData.checked;
    }

    return iconData.default;
  };

  return (
    <div className={wrapClassName}>
      <CheckboxStyled
        {...restProps}
        id={checkboxId}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        className={inputClassName}
      />
      <CheckboxLabelStyled
        htmlFor={checkboxId}
        className={labelClassName}
        onClick={handleClick}
        data-disabled={disabled || undefined}
      >
        <Icon />
        {children && (
          <CheckboxChildrenStyled>{children}</CheckboxChildrenStyled>
        )}
      </CheckboxLabelStyled>
    </div>
  );
};
