import { ChangeEvent, forwardRef, useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { excludeSupportProps, extractDataProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { styledTextareaPrivate } from './styled';
import { TextareaPrivateProps } from './types';

const MIN_ROWS = 3;

const StylelessTextareaPrivate = forwardRef<HTMLTextAreaElement, TextareaPrivateProps>(
  (
    {
      name,
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
      ref: ref,
      className,
      name,
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

export type { TextareaPrivateProps };

export const TextareaPrivate = styledTextareaPrivate(StylelessTextareaPrivate);
