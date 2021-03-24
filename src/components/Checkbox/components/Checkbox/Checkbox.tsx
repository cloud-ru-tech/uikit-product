import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { SelectedSVG, UnSelectedSVG, SelectedPartSVG } from '@aicloud/ui-icons';

import { CheckboxStyled, CheckboxLabelStyled, svgClassName } from './styled';

export interface ICheckboxProps
  extends Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > {
  id: string;
  checked: boolean;
  partChecked?: boolean;
  disabled?: boolean;
  handleChange(
    checked: boolean,
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ): void;
  wrapClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
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
          id={id}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          className={inputClassName}
        />
        <CheckboxLabelStyled
          htmlFor={id}
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
          id={id}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          className={inputClassName}
        />
        <CheckboxLabelStyled
          htmlFor={id}
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
        id={id}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        className={inputClassName}
      />
      <CheckboxLabelStyled
        htmlFor={id}
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
