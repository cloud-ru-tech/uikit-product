import mergeRefs from 'merge-refs';
import { ChangeEvent, RefObject, forwardRef, useCallback, useRef, useState } from 'react';

import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import { TextareaPrivate } from '../private';
import * as S from './styled';

export type SimpleTextareaProps = {
  value: string;
  onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  className?: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  maxLength?: number;
  autosize?: boolean;
  error?: boolean;
  ref?: RefObject<HTMLTextAreaElement>;
};

export const SimpleTextarea = forwardRef<HTMLTextAreaElement, WithSupportProps<SimpleTextareaProps>>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      minRows,
      maxRows,
      maxLength,
      error = false,
      disabled = false,
      autosize = true,
      ...rest
    },
    ref,
  ) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = mergeRefs(innerRef, ref);
    const onWrapperFocusHandler = useCallback(() => innerRef.current?.focus(), []);
    const onTextareaFocusHandler = useCallback(() => setIsFocused(true), []);
    const onTextareaBlurHandler = useCallback(() => setIsFocused(false), []);
    const onClearHandler = useCallback(() => onChange(''), [onChange]);
    const hasClearButton = !!value.length && !disabled;

    return (
      <S.Wrapper
        onFocus={onWrapperFocusHandler}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        data-focused={isFocused || undefined}
        data-autosize={autosize || undefined}
        className={className}
        {...extractSupportProps(rest)}
      >
        <TextareaPrivate
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autosize={autosize}
          minRows={minRows}
          maxRows={maxRows}
          onFocus={onTextareaFocusHandler}
          onBlur={onTextareaBlurHandler}
          data-test-id='textarea__input'
        />
        {hasClearButton && (
          <S.ClearButton
            icon={<CloseInterfaceSVG />}
            onClick={onClearHandler}
            tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
            data-test-id='textarea__clear-button'
          />
        )}
      </S.Wrapper>
    );
  },
);
