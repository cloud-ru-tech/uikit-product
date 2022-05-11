import { ReactNode } from 'react';

import { useToggleState } from '../../hooks';
import { Value } from '../../types';
import { ToggleCardBoxInput } from '../ToggleCardBoxInput';

type ToggleCardBoxControlProps = {
  value: Value;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function ToggleCardBoxControl({ value, children, disabled, className, ...rest }: ToggleCardBoxControlProps) {
  const { type, checked, name, onChange } = useToggleState(value);

  return (
    <label className={className} {...rest}>
      <ToggleCardBoxInput
        type={type}
        checked={checked}
        name={type === 'radio' ? name : undefined}
        disabled={disabled}
        onChange={onChange}
        data-test-id={`toggle-card-box-input-${checked ? 'checked' : 'unchecked'}`}
        data-test-option-id={value}
      />
      {children}
    </label>
  );
}
