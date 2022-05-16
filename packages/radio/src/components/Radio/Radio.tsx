import { useContext } from 'react';

import { RadioCheckedInterfaceSVG, RadioUncheckedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps, extractDataTestProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { RadioGroupContext } from '../RadioGroup/context';
import { HiddenRadio, IconContainer, Label, Wrapper } from './styled';

type RadioIcon = WithSupportProps<{
  checked?: boolean;
  disabled?: boolean;
}>;

function RadioIcon({ checked, disabled, ...rest }: RadioIcon) {
  return (
    <IconContainer data-checked={checked} data-disabled={disabled} {...extractDataTestProps(rest)}>
      {checked ? <RadioCheckedInterfaceSVG size={20} /> : <RadioUncheckedInterfaceSVG size={20} />}
    </IconContainer>
  );
}

export type RadioProps = WithSupportProps<{
  value: React.ReactText;
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => RadioGroup?.onChange(e.target.value)}
      />
      <RadioIcon checked={isRadioChecked} disabled={disabled} data-test-option-id={value} />
      {label && <Label data-test-id={'radio__label'}>{label}</Label>}
    </Wrapper>
  );
}
