import { FC, useCallback, useContext, useMemo } from 'react';

import { RadioUncheckedSVG, RadioCheckedSVG } from '@aicloud/ui-icons';

import { RadioGroupContext } from 'components/Radio/components/RadioGroup/context';

import {
  HiddenRadio,
  TextContainer,
  IconContainer,
  Label,
  Description,
  CheckboxContainer,
  radioCheckedClassName,
} from './styled';

export interface IRadioIcon {
  checked?: boolean;
  disabled?: boolean;
}

export const RadioIcon: FC<IRadioIcon> = ({ checked, disabled }) => (
  <IconContainer data-checked={checked} data-disabled={disabled}>
    <RadioUncheckedSVG size={14} />
    {checked && (
      <RadioCheckedSVG
        size={8}
        data-disabled={disabled}
        className={radioCheckedClassName}
      />
    )}
  </IconContainer>
);

export interface IRadioProps {
  value: string;
  label: string;
  disabled: boolean;
  description: string;
}

// TODO: можно добавить поддержку неконтроллируемого компонента(useState)
export const Radio: FC<IRadioProps> = ({
  value = '',
  label,
  description,
  disabled,
}) => {
  const RadioGroup = useContext(RadioGroupContext);
  const checked = useMemo(
    () => RadioGroup !== null && RadioGroup.value === value,
    [value, RadioGroup],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!RadioGroup || disabled) {
        return;
      }

      RadioGroup.onChange(e);
    },
    [RadioGroup],
  );

  return (
    <CheckboxContainer>
      <HiddenRadio
        type='radio'
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <RadioIcon checked={checked} disabled={disabled} />
      <TextContainer>
        <Label>{label}</Label>
        <Description>{description}</Description>
      </TextContainer>
    </CheckboxContainer>
  );
};
