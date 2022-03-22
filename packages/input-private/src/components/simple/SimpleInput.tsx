import mergeRefs from 'merge-refs';
import { forwardRef, useRef, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { CloseInterfaceSVG, EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import { InputPrivate, InputPrivateProps } from '../private';
import { Sizes, Types } from './constants';
import * as S from './styled';
import { SimpleInputProps } from './types';

const StylelessForwardedInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  (
    {
      value = '',
      onChange,
      placeholder,
      className,
      moreButton,
      size = Sizes.Medium,
      type = Types.Text,
      disabled = false,
      error = false,
      autoFocus = false,
      autoComplete = false,
      maxLength,
      ...rest
    },
    ref,
  ) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [isFocused, setIsFocused] = useState(false);
    const [innerType, setInnerType] = useState(type);

    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = mergeRefs(ref, innerRef);

    const onFocusWrapper = () => {
      innerRef.current?.focus();
      setIsFocused(true);
    };

    const onFocusInput = () => setIsFocused(true);
    const onBlurInput = () => setIsFocused(false);

    const onClearHandler = () => {
      onChange('');
      onFocusWrapper();
    };

    const hasMoreButton = Boolean(moreButton);
    const hasClearButton = Boolean(value) && !disabled;
    const hasShowButton = Boolean(value) && !disabled && type === Types.Password;

    const showHidePasswordHandler = () => {
      if (innerType === Types.Text) {
        setInnerType(Types.Password);
      } else {
        setInnerType(Types.Text);
      }

      setTimeout(() =>
        innerRef.current?.setSelectionRange(innerRef.current.value.length, innerRef.current.value.length),
      );

      onFocusWrapper();
    };

    return (
      <div className={className} {...extractSupportProps(rest)}>
        <S.InputWrapper
          onFocus={onFocusWrapper}
          data-size={size}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          data-focused={isFocused || undefined}
          data-has-more-button={hasMoreButton || undefined}
        >
          <InputPrivate
            data-test-id={'private-input'}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            // eslint-disable-next-line
            // @ts-ignore
            ref={inputRef}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={innerType as unknown as InputPrivateProps['type']}
            disabled={disabled}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            postfix={
              <>
                {hasClearButton && (
                  <S.PostfixButtonWrapper>
                    <ButtonIcon
                      icon={<CloseInterfaceSVG />}
                      onClick={onClearHandler}
                      tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
                      data-test-id={'input__clear-button'}
                    />
                  </S.PostfixButtonWrapper>
                )}
                {hasShowButton && (
                  <S.PostfixButtonWrapper>
                    <ButtonIcon
                      icon={innerType === type ? <EyeOpenedInterfaceSVG /> : <EyeClosedInterfaceSVG />}
                      onClick={showHidePasswordHandler}
                      tooltip={{
                        content: textProvider(languageCode, Texts.Show),
                      }}
                      data-test-id={'input__show-password-button'}
                    />
                  </S.PostfixButtonWrapper>
                )}
              </>
            }
          />
        </S.InputWrapper>
        {hasMoreButton && (
          <S.MoreButtonWrapper
            data-size={size}
            data-error={error || undefined}
            data-disabled={disabled || undefined}
            data-focused={isFocused || undefined}
          >
            <S.MoreButton
              icon={<S.MoreIcon />}
              disabled={disabled}
              onClick={moreButton?.onClick}
              tooltip={
                moreButton?.tooltipText
                  ? {
                      content: moreButton?.tooltipText,
                    }
                  : undefined
              }
              data-test-id={'input__more-button'}
            />
          </S.MoreButtonWrapper>
        )}
      </div>
    );
  },
);

const StyledForwardedInput = S.styledSimpleInput(StylelessForwardedInput);

export type { SimpleInputProps };

export const SimpleInput = StyledForwardedInput as typeof StyledForwardedInput & {
  sizes: typeof Sizes;
  types: typeof Types;
};

SimpleInput.sizes = Sizes;
SimpleInput.types = Types;
