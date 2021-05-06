import { FC, useContext } from 'react';

import { RadioUncheckedSVG, RadioCheckedSVG } from '@sbercloud/icons';

import { RadioGroupContext } from 'components/Radio/components/RadioGroup/context';

import {
  HiddenRadio,
  TextContainer,
  IconContainer,
  Label,
  Description,
  Wrapper,
} from './styled';

export interface IRadioIcon {
  checked?: boolean;
  disabled?: boolean;
}

export const RadioIcon: FC<IRadioIcon> = ({ checked, disabled }) => (
  <IconContainer data-checked={checked} data-disabled={disabled}>
    {checked ? <RadioCheckedSVG size={20} /> : <RadioUncheckedSVG size={20} />}
  </IconContainer>
);

export interface IRadioProps {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  wrapperClassName?: string;
}

export const Radio: FC<IRadioProps> = ({
  value,
  label,
  description,
  disabled,
  checked,
  wrapperClassName,
}) => {
  const RadioGroup = useContext(RadioGroupContext);

  const isRadioChecked =
    typeof checked === 'boolean' ? checked : RadioGroup?.value === value;

  return (
    <Wrapper
      className={wrapperClassName}
      data-disabled={disabled}
      data-checked={isRadioChecked}
    >
      <HiddenRadio
        type='radio'
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
