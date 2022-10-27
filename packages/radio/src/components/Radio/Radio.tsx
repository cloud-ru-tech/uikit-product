import { ChangeEvent, ReactText, useContext } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { RadioGroupContext } from '../RadioGroup/context';
import { RadioIconPrivate } from '../RadioIconPrivate';
import { HiddenRadio, Label, Wrapper } from './styled';

export type RadioProps = WithSupportProps<{
  value: ReactText;
  label?: string;
  disabled?: boolean;
  className?: string;
}>;

export function Radio({ value, label, disabled, className, ...rest }: RadioProps) {
  const RadioGroup = useContext(RadioGroupContext);

  const isRadioChecked = RadioGroup?.value === value;

  return (
    <Wrapper
      className={className}
      data-disabled={disabled}
      data-checked={isRadioChecked}
      {...extractSupportProps(rest)}
    >
      <HiddenRadio
        type='radio'
        value={value}
        disabled={disabled}
        checked={isRadioChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => RadioGroup?.onChange(e.target.value)}
      />
      <RadioIconPrivate checked={isRadioChecked} disabled={disabled} data-test-option-id={value} />
      {label && <Label data-test-id={'radio__label'}>{label}</Label>}
    </Wrapper>
  );
}
