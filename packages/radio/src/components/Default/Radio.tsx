import { FC, useContext } from 'react';

import { RadioCheckedInterfaceSVG, RadioUncheckedInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { RadioGroupContext } from '../RadioGroup/context';
import { Description, HiddenRadio, IconContainer, Label, TextContainer, Wrapper } from './styled';

export interface IRadioIcon {
  checked?: boolean;
  disabled?: boolean;
}

export const RadioIcon: FC<IRadioIcon> = ({ checked, disabled }) => (
  <IconContainer data-checked={checked} data-disabled={disabled}>
    {checked ? <RadioCheckedInterfaceSVG size={20} /> : <RadioUncheckedInterfaceSVG size={20} />}
  </IconContainer>
);

export interface IRadioProps {
  value?: string | number;
  name?: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  wrapperClassName?: string;
}

export const Radio: FC<IRadioProps> = ({ value, name, label, description, disabled, checked, wrapperClassName }) => {
  const RadioGroup = useContext(RadioGroupContext);

  const isRadioChecked = typeof checked === 'boolean' ? checked : RadioGroup?.value === value;

  return (
    <Wrapper className={wrapperClassName} data-disabled={disabled} data-checked={isRadioChecked}>
      <HiddenRadio
        type='radio'
        name={name || RadioGroup?.name}
        value={value}
        disabled={disabled}
        checked={isRadioChecked}
        onChange={RadioGroup?.onChange}
      />
      <RadioIcon checked={isRadioChecked} disabled={disabled} />
      <TextContainer>
        <Label>{label}</Label>
        <Description>{description}</Description>
      </TextContainer>
    </Wrapper>
  );
};
