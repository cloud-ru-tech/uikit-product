import { cx } from '@linaria/core';
import { ChangeEvent, RefObject, forwardRef, useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { WithSupportProps, excludeSupportProps, extractDataProps, extractSupportProps } from '@sbercloud/uikit-utils';

import * as S from './styled';

export type TextareaPrivateProps = {
  value: string;
  onChange?: (value: string, e?: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  maxLength?: number;
  autosize?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: RefObject<HTMLTextAreaElement>;
};

const MIN_ROWS = 3;

export const TextareaPrivate = forwardRef<HTMLTextAreaElement, WithSupportProps<TextareaPrivateProps>>(
  (
    {
      value = '',
      onChange,
      onFocus,
      onBlur,
      placeholder,
      className,
      minRows = MIN_ROWS,
      maxRows,
      maxLength,
      disabled = false,
      autosize = true,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value, e),
      [onChange],
    );
    const maxRowsWithDefault = useMemo(() => (maxRows ? Math.max(maxRows, minRows) : undefined), [minRows, maxRows]);

    const commonProps = {
      // Workaround for ref. Outdated @types/react-textarea-autosize package
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: ref as any,
      className: cx(S.textareaClassName, className),
      value,
      placeholder,
      disabled,
      maxLength,
      onChange: onChangeHandler,
      onBlur,
      onFocus,
      ...extractDataProps(excludeSupportProps(rest)),
      ...extractSupportProps(rest),
    };

    if (autosize) {
      return <TextareaAutosize minRows={minRows} maxRows={maxRowsWithDefault} {...commonProps} />;
    }

    return <textarea {...commonProps} />;
  },
);
