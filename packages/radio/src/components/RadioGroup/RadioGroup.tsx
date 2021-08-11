import { FC } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { RadioGroupContext } from './context';
import { StyledRadioGroup } from './styled';

export type RadioGroupProps = {
  value?: string | number;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup: FC<WithSupportProps<RadioGroupProps>> = ({ children, onChange, value, name, ...rest }) => (
  <RadioGroupContext.Provider value={{ name, onChange, value }}>
    <StyledRadioGroup {...extractSupportProps(rest)}>{children}</StyledRadioGroup>
  </RadioGroupContext.Provider>
);
