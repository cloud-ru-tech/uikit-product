import { FC } from 'react';

import { StyledRadioGroup } from './styled';
import { RadioGroupContext } from './context';

export type TRadioGroupProps = {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup: FC<TRadioGroupProps> = ({
  children,
  onChange,
  value,
  name,
}) => (
  <RadioGroupContext.Provider value={{ name, onChange, value }}>
    <StyledRadioGroup>{children}</StyledRadioGroup>
  </RadioGroupContext.Provider>
);
