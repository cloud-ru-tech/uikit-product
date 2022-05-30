import { forwardRef } from 'react';

import { InputPhonePrivate } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../helperComponents';

export type InputPhoneProps = Omit<InputMasterProps, 'children'>;

const ForwardedInputPhone = forwardRef<HTMLInputElement, InputPhoneProps>((props, ref) => (
  <InputMaster {...props}>{props => <InputPhonePrivate {...props} ref={ref} />}</InputMaster>
));

export const InputPhone = ForwardedInputPhone as typeof ForwardedInputPhone & {
  sizes: typeof InputMaster.sizes;
};

InputPhone.sizes = InputMaster.sizes;
