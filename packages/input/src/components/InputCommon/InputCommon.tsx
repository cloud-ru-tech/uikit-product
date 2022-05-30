import { forwardRef } from 'react';

import { SimpleInput } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../helperComponents';

export type InputCommonProps = Omit<InputMasterProps, 'children'> & {
  placeholder?: string;
};

const ForwardedInputCommon = forwardRef<HTMLInputElement, InputCommonProps>(({ placeholder, ...props }, ref) => (
  <InputMaster {...props}>
    {props => <SimpleInput {...props} placeholder={placeholder} ellipsis ref={ref} />}
  </InputMaster>
));

export const InputCommon = ForwardedInputCommon as typeof ForwardedInputCommon & {
  sizes: typeof InputMaster.sizes;
};

InputCommon.sizes = InputMaster.sizes;
