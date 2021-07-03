import { FC } from 'react';

import { RadioGroupContext } from './context';
import { StyledRadioGroup } from './styled';

export type TRadioGroupProps = {
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup: FC<TRadioGroupProps> = ({ children, onChange, value, name }) => (
  <RadioGroupContext.Provider value={{ name, onChange, value }}>
    <StyledRadioGroup>{children}</StyledRadioGroup>
  </RadioGroupContext.Provider>
);
