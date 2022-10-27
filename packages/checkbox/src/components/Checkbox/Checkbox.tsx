import { ChangeEvent, ReactNode, useCallback } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CheckboxIconPrivate } from '../CheckboxIconPrivate';
import { CheckboxText, CheckboxTextWrap, CheckboxWrap, HiddenCheckbox } from './styled';

export type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  partChecked?: boolean;
  label?: ReactNode;
  handleChange(checked: boolean, e?: ChangeEvent<HTMLInputElement>): void;
};

export function Checkbox({
  label,
  checked,
  disabled,
  className,
  partChecked,
  handleChange,
  ...rest
}: WithSupportProps<CheckboxProps>) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      if (partChecked) {
        handleChange(false, e);
        return;
      }

      handleChange(!checked, e);
    },
    [disabled, checked, partChecked, handleChange],
  );

  return (
    <CheckboxWrap className={className} data-disabled={disabled || undefined} {...extractSupportProps(rest)}>
      <HiddenCheckbox type='checkbox' checked={checked} disabled={disabled} onChange={onChange} />
      <CheckboxIconPrivate partChecked={partChecked} checked={checked} disabled={disabled} />
      {label ? (
        <CheckboxTextWrap data-disabled={disabled || undefined}>
          <CheckboxText data-disabled={disabled || undefined} data-test-id='checkbox__label-text'>
            {label}
          </CheckboxText>
        </CheckboxTextWrap>
      ) : null}
    </CheckboxWrap>
  );
}
