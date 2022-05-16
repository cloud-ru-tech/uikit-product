import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { RadioGroupContext } from './context';

export type RadioGroupProps = WithSupportProps<{
  value?: React.ReactText;
  onChange: (value: React.ReactText) => void;
  children: React.ReactNode;
}>;

export function RadioGroup({ children, onChange, value, ...rest }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ onChange, value }}>
      <div {...extractSupportProps(rest)}>{children}</div>
    </RadioGroupContext.Provider>
  );
}
