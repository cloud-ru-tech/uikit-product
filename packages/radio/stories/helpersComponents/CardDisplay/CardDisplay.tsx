import { ReactElement } from 'react';

import { Label, Wrapper } from './styled';

type CardProps = {
  label?: string;
  description?: string;
  icon?: ReactElement;
  disabled?: boolean;
  checked?: boolean;
};

export function CardDisplay({ label, icon, disabled, checked }: CardProps) {
  return (
    <Wrapper data-disabled={disabled} data-checked={checked}>
      {icon}
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
}
