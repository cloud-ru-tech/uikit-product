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
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <RadioGroupContext.Provider value={{ name, onChange: handleChange, value }}>
      <StyledRadioGroup>{children}</StyledRadioGroup>
    </RadioGroupContext.Provider>
  );
};
