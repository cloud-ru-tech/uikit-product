import mergeRefs from 'merge-refs';
import { forwardRef } from 'react';

import { InputMaskOptions, useInputMask } from '../../hooks';
import { SimpleInput, SimpleInputProps } from '../Simple';

const options: InputMaskOptions = {
  mask: '000 000-00-00',
  placeholderChar: 'X',
};

export type InputPhonePrivateProps = Omit<SimpleInputProps, 'prefix' | 'placeholder'>;

export const InputPhonePrivate = forwardRef<HTMLInputElement, InputPhonePrivateProps>((props, ref) => {
  const { inputRef, placeholder, value, onFocus, onBlur, onChange } = useInputMask({
    options,
    value: props.value,
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  });

  return (
    <SimpleInput
      {...props}
      ref={mergeRefs(ref, inputRef)}
      prefix='+7'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});
