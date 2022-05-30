import { forwardRef } from 'react';

import { SimpleInput } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../helperComponents';

export type InputSecurityProps = Omit<InputMasterProps, 'children'> & {
  placeholder?: string;
};

const ForwardedInputSecurity = forwardRef<HTMLInputElement, InputSecurityProps>(({ placeholder, ...props }, ref) => (
  <InputMaster {...props}>
    {props => <SimpleInput {...props} type={SimpleInput.types.Password} placeholder={placeholder} ref={ref} />}
  </InputMaster>
));

export const InputSecurity = ForwardedInputSecurity as typeof ForwardedInputSecurity & {
  sizes: typeof InputMaster.sizes;
};

InputSecurity.sizes = InputMaster.sizes;
