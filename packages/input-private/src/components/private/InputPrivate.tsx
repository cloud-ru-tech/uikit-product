import { ChangeEventHandler, MouseEventHandler, forwardRef } from 'react';

import { excludeSupportProps, extractDataProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Types } from './constants';
import { styledInputPrivate } from './styled';
import { InputPrivateProps } from './types';

const StylelessForwardedPrivateInput = forwardRef<HTMLInputElement, InputPrivateProps>(
  (
    {
      name,
      value = '',
      onChange,
      placeholder,
      id,
      className,
      type = Types.Text,
      disabled = false,
      autoFocus = false,
      autoComplete = false,
      maxLength,
      onFocus,
      onBlur,
      prefix,
      postfix,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => onChange?.(e.target.value, e);
    const stopPropagation: MouseEventHandler<HTMLInputElement> = e => e.stopPropagation();

    return (
      <>
        {prefix}
        <input
          name={name}
          maxLength={maxLength}
          id={id}
          className={className}
          autoFocus={autoFocus}
          autoComplete={autoComplete ? 'on' : 'off'}
          ref={ref}
          value={value}
          onChange={onChangeHandler}
          onClick={stopPropagation}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          {...extractDataProps(excludeSupportProps(rest))}
          {...extractSupportProps(rest)}
        />
        {postfix}
      </>
    );
  },
);

const StyledForwardedPrivateInput = styledInputPrivate(StylelessForwardedPrivateInput);

export type { InputPrivateProps };

export const InputPrivate = StyledForwardedPrivateInput as typeof StyledForwardedPrivateInput & {
  types: typeof Types;
};

InputPrivate.types = Types;
