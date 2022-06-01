import mergeRefs from 'merge-refs';
import { forwardRef } from 'react';

import { useInputMask } from '../../hooks';
import { SimpleInputProps } from '../simple';
import { MASKS_CONFIG, Masks } from './constants';
import { StyledSimpleInput } from './styled';

export type InputMaskPrivateProps = Omit<SimpleInputProps, 'placeholder'> & {
  mask: Masks;
};

const InputMaskPrivateForwarded = forwardRef<HTMLInputElement, InputMaskPrivateProps>(({ mask, ...props }, ref) => {
  const { inputRef, placeholder, value, onFocus, onBlur, onChange } = useInputMask({
    options: MASKS_CONFIG[mask],
    value: props.value,
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur(event, value) {
      if (mask === Masks.Phone && value === '7') {
        onChange('');
      }

      props.onBlur?.(event);
    },
  });

  return (
    <StyledSimpleInput
      {...props}
      ref={mergeRefs(ref, inputRef)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});

export const InputMaskPrivate = InputMaskPrivateForwarded as typeof InputMaskPrivateForwarded & {
  masks: typeof Masks;
};

InputMaskPrivate.masks = Masks;
