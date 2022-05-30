import { forwardRef } from 'react';

import { InputMaskPrivate, InputMaskPrivateProps } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../helperComponents';

export type InputMaskProps = Omit<InputMasterProps, 'children'> & {
  mask: InputMaskPrivateProps['mask'];
};

const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps>(({ mask, ...props }, ref) => (
  <InputMaster {...props}>{props => <InputMaskPrivate {...props} mask={mask} ref={ref} />}</InputMaster>
));

export const InputMask = ForwardedInputMask as typeof ForwardedInputMask & {
  sizes: typeof InputMaster.sizes;
  masks: typeof InputMaskPrivate.masks;
};

InputMask.sizes = InputMaster.sizes;
InputMask.masks = InputMaskPrivate.masks;
