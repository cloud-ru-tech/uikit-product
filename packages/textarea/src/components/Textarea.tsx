import mergeRefs from 'merge-refs';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../helpers/texts-provider';
import { ClearButton, TextArea, Wrapper } from './styled';

export type TextareaProps = {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  maxRows?: number;
  maxLength?: number;
  ref?: HTMLTextAreaElement;
};

const MIN_ROWS = 3;

export const Textarea = React.forwardRef<HTMLTextAreaElement, WithSupportProps<TextareaProps>>(
  (
    { className, value = '', onChange, placeholder, maxRows, maxLength, error = false, disabled = false, ...rest },
    ref,
  ) => {
    const { languageCode } = useLanguage();
    const [isFocused, setIsFocused] = useState(false);
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = mergeRefs(innerRef, ref);

    const onChangeHandler = useCallback(e => onChange(e.target.value), [onChange]);
    const onWrapperFocusHandler = useCallback(() => innerRef.current?.focus(), []);
    const onTextareaFocusHandler = useCallback(() => setIsFocused(true), []);
    const onTextareaBlurHandler = useCallback(() => setIsFocused(false), []);
    const onClearHandler = useCallback(() => onChange(''), [onChange]);

    const maxRowsWithDefault = useMemo(() => (maxRows ? Math.max(maxRows, MIN_ROWS) : undefined), [maxRows]);
    const hasClearButton = value.length !== 0 && !disabled;

    return (
      <Wrapper
        onFocus={onWrapperFocusHandler}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        data-focused={isFocused || undefined}
        {...extractSupportProps(rest)}
      >
        <TextArea
          ref={textareaRef}
          className={className}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          data-test-id='textarea__input'
          disabled={disabled}
          minRows={MIN_ROWS}
          maxRows={maxRowsWithDefault}
          maxLength={maxLength}
          onBlur={onTextareaBlurHandler}
          onFocus={onTextareaFocusHandler}
        />
        {hasClearButton && (
          <ClearButton
            icon={<CloseInterfaceSVG />}
            onClick={onClearHandler}
            tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
            data-test-id='textarea__clear-button'
          />
        )}
      </Wrapper>
    );
  },
);
