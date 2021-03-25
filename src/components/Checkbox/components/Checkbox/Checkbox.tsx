import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { SelectedSVG, UnSelectedSVG, SelectedPartSVG } from '@aicloud/ui-icons';

import useElementId from 'utils/useElementId';

import { CheckboxStyled, CheckboxLabelStyled, svgClassName } from './styled';

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

  if (partChecked) {
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
          <SelectedPartSVG
            className={svgClassName}
            data-selected={partChecked || checked || undefined}
            data-disabled={disabled || undefined}
          />
        </CheckboxLabelStyled>
      </div>
    );
  }

  if (checked) {
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
          <SelectedSVG
            className={svgClassName}
            data-selected={partChecked || checked || undefined}
            data-disabled={disabled || undefined}
          />
        </CheckboxLabelStyled>
      </div>
    );
  }

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
        <UnSelectedSVG
          className={svgClassName}
          data-selected={partChecked || checked || undefined}
          data-disabled={disabled || undefined}
        />
      </CheckboxLabelStyled>
    </div>
  );
};
