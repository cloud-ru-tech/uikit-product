import { nanoid } from 'nanoid';
import { useCallback, useMemo } from 'react';

import { CheckboxCheckedSVG, CheckboxPartialCheckedSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import {
  CheckboxIconWrap,
  CheckboxText,
  CheckboxTextWrap,
  CheckboxWrap,
  HiddenCheckbox,
  iconClassName,
} from './styled';

export type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  partChecked?: boolean;
  label?: React.ReactNode;
  handleChange(checked: boolean, e?: React.ChangeEvent<HTMLInputElement>): void;
};

export const Checkbox = ({
  label,
  checked,
  disabled,
  className,
  partChecked,
  handleChange,
  ...rest
}: WithSupportProps<CheckboxProps>) => {
  const id = useMemo(() => nanoid(), []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const Icon = useMemo(() => {
    if (partChecked) {
      return <CheckboxPartialCheckedSVG className={iconClassName} />;
    }

    if (checked) {
      return <CheckboxCheckedSVG className={iconClassName} />;
    }

    return null;
  }, [partChecked, checked]);

  return (
    <CheckboxWrap className={className} data-disabled={disabled || undefined} {...extractSupportProps(rest)}>
      <CheckboxIconWrap
        data-test-id='checkbox__icon'
        data-checked={checked || partChecked || undefined}
        data-disabled={disabled || undefined}
      >
        <HiddenCheckbox id={id} type='checkbox' checked={checked} disabled={disabled} onChange={onChange} />
        {Icon}
      </CheckboxIconWrap>
      {label ? (
        <CheckboxTextWrap data-disabled={disabled || undefined} htmlFor={id}>
          <CheckboxText data-disabled={disabled || undefined} data-test-id='checkbox__label-text'>
            {label}
          </CheckboxText>
        </CheckboxTextWrap>
      ) : null}
    </CheckboxWrap>
  );
};
