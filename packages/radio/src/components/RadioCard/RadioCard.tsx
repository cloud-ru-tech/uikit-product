import React, { useContext } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { RadioGroupContext } from '../RadioGroup/context';
import { HiddenRadio, Wrapper } from './styled';

export type RadioCardProps = {
  value: React.ReactText;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function RadioCard({ value, disabled, className, children, ...rest }: WithSupportProps<RadioCardProps>) {
  const RadioGroup = useContext(RadioGroupContext);

  const isRadioChecked = RadioGroup?.value === value;

  return (
    <Wrapper
      className={className}
      data-disabled={disabled}
      data-checked={isRadioChecked}
      data-test-option-id={value}
      {...extractSupportProps(rest)}
    >
      <HiddenRadio
        type='radio'
        value={value}
        disabled={disabled}
        checked={isRadioChecked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => RadioGroup?.onChange(e.target.value)}
      />
      {children}
    </Wrapper>
  );
}
