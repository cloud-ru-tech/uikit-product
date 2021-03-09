import { FC, useCallback, useContext, useMemo } from 'react';
import { css } from '@linaria/core';

import { RadioUncheckedSVG, RadioCheckedSVG } from '@aicloud/ui-icons';

import { RadioGroupContext } from 'components/Radio/components/RadioGroup/context';
import {
  HiddenRadio,
  TextContainer,
  IconContainer,
  Label,
  Description,
  CheckboxContainer,
} from './styled';

export interface IRadioIcon {
  checked?: boolean;
}

// TODO: we have to create className instead of wrapping component because of a bug
// https://github.com/NervJS/taro/issues/8325
export const radioUncheckedClassName = css`
  stroke: #d2d2d2;

  &:hover {
    stroke: #a0a0a0;
  }

  &[data-checked='true'] {
    stroke: #5558fa;

    &:hover {
      stroke: #484bd5;
    }
  }
`;

export const radioCheckedClassName = css`
  fill: #5558fa;

  &:hover {
    fill: #484bd5;
  }
`;

const checkedIconWrapper = css`
  position: absolute;
  animation-name: checked;
  animation-duration: 0.5s;
`;

export const RadioIcon: FC<IRadioIcon> = ({ checked }) => (
  <IconContainer>
    <RadioUncheckedSVG
      className={radioUncheckedClassName}
      size={14}
      data-checked={checked}
    />
    {checked && (
      <RadioCheckedSVG
        className={radioCheckedClassName}
        size={8}
        wrapperClasses={checkedIconWrapper}
      />
    )}
  </IconContainer>
);

export interface IRadioProps {
  value: string;
  label: string;
  description: string;
}

// TODO: можно добавить поддержку неконтроллируемого компонента(useState)
export const Radio: FC<IRadioProps> = ({ value = '', label, description }) => {
  const RadioGroup = useContext(RadioGroupContext);
  const checked = useMemo(
    () => RadioGroup !== null && RadioGroup.value === value,
    [value, RadioGroup],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (RadioGroup) {
        RadioGroup.onChange(e);
      }
    },
    [RadioGroup],
  );

  return (
    <CheckboxContainer data-grey-bg={checked}>
      <HiddenRadio
        type='radio'
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <RadioIcon checked={checked} />
      <TextContainer>
        <Label>{label}</Label>
        <Description>{description}</Description>
      </TextContainer>
    </CheckboxContainer>
  );
};
