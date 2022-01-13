import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
  forwardRef,
} from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from './constants';
import { StyledInput } from './styled';

export type InputPrivateProps = {
  value: string;
  onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
  className?: string;
  placeholder?: string;
  type?: Types;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: boolean;
  maxLength?: number;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  postfix?: ReactNode;
  ref?: RefObject<HTMLInputElement>;
};

const ForwardedPrivateInput = forwardRef<HTMLInputElement, WithSupportProps<InputPrivateProps>>(
  (
    {
      value = '',
      onChange,
      placeholder,
      className,
      type = Types.Text,
      disabled = false,
      autoFocus = false,
      autoComplete = false,
      maxLength,
      onFocus,
      onBlur,
      postfix,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => onChange?.(e.target.value, e);
    const stopPropagation: MouseEventHandler<HTMLInputElement> = e => e.stopPropagation();

    return (
      <>
        <StyledInput
          maxLength={maxLength}
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
          {...extractSupportProps(rest)}
        />
        {postfix}
      </>
    );
  },
);

export const InputPrivate = ForwardedPrivateInput as typeof ForwardedPrivateInput & {
  types: typeof Types;
};

InputPrivate.types = Types;
