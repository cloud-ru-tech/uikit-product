import mergeRefs from 'merge-refs';
import { forwardRef, useRef, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG, EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { InputPrivateProps } from '../Private';
import { Sizes, Types } from './constants';
import * as S from './styled';
import { SimpleInputProps } from './types';

const StylelessForwardedInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  (
    {
      name,
      value = '',
      onChange,
      onFocus,
      onBlur,
      placeholder,
      id,
      className,
      prefix,
      moreButton,
      size = Sizes.Medium,
      type = Types.Text,
      disabled = false,
      error = false,
      autoComplete = false,
      ellipsis = false,
      maxLength,
      ...rest
    },
    ref,
  ) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [innerType, setInnerType] = useState(type);
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = mergeRefs(ref, innerRef);

    const hasMoreButton = Boolean(moreButton);
    const hasClearButton = Boolean(value) && !disabled;
    const hasShowButton = Boolean(value) && !disabled && type === Types.Password;

    const onClearHandler = () => {
      onChange('');
      innerRef.current?.focus();
    };

    const showHidePasswordHandler = () => {
      if (innerType === Types.Text) {
        setInnerType(Types.Password);
      } else {
        setInnerType(Types.Text);
      }

      setTimeout(() =>
        innerRef.current?.setSelectionRange(innerRef.current.value.length, innerRef.current.value.length),
      );

      innerRef.current?.focus();
    };

    return (
      <div
        className={className}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        {...extractSupportProps(rest)}
      >
        <S.Input
          data-size={size}
          data-ellipsis={ellipsis || undefined}
          data-test-id={'private-input'}
          name={name}
          id={id}
          autoComplete={autoComplete}
          ref={inputRef}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={innerType as unknown as InputPrivateProps['type']}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          prefix={
            prefix && (
              <S.Prefix data-size={size} data-disabled={disabled || undefined}>
                {prefix}
              </S.Prefix>
            )
          }
          postfix={
            (hasClearButton || hasShowButton) && (
              <S.Postfix data-size={size}>
                {hasClearButton && (
                  <S.PostfixButtonWrapper>
                    <ButtonIcon
                      icon={<CloseInterfaceSVG />}
                      onClick={onClearHandler}
                      tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
                      data-test-id={'input__clear-button'}
                      tabIndex={-1}
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
                      tabIndex={-1}
                    />
                  </S.PostfixButtonWrapper>
                )}
              </S.Postfix>
            )
          }
        />
        {hasMoreButton && (
          <S.MoreButtonWrapper data-size={size}>
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
