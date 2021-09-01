import { ReactElement } from 'react';

import { Description, Label, TextContainer, Wrapper } from './styled';

type CardProps = {
  label?: string;
  description?: string;
  icon?: ReactElement;
  disabled?: boolean;
  checked?: boolean;
};

export function Card({ label, description, icon, disabled, checked }: CardProps) {
  return (
    <Wrapper data-disabled={disabled} data-checked={checked}>
      {icon}
      <TextContainer>
        {label && <Label>{label}</Label>}
        {description && <Description>{description}</Description>}
      </TextContainer>
    </Wrapper>
  );
}
