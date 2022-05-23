import mergeRefs from 'merge-refs';
import { forwardRef, useCallback, useRef, useState } from 'react';

import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage } from '@sbercloud/uikit-product-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';
import { StyledPrivateTextarea } from './styled';
import { SimpleTextareaProps } from './types';

const StylelessSimpleTextarea = forwardRef<HTMLTextAreaElement, SimpleTextareaProps>(
  (
    {
      name,
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
      <div
        onFocus={onWrapperFocusHandler}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        data-focused={isFocused || undefined}
        data-autosize={autosize || undefined}
        className={className}
        {...extractSupportProps(rest)}
      >
        <StyledPrivateTextarea
          ref={textareaRef}
          name={name}
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
            tabIndex={-1}
          />
        )}
      </div>
    );
  },
);

export type { SimpleTextareaProps };

export const SimpleTextarea = S.styledSimpleTextarea(StylelessSimpleTextarea);
