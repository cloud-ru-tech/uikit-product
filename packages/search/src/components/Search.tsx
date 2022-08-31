import mergeRefs from 'merge-refs';
import { forwardRef, useRef } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../helpers';
import { Size, Variant } from './constants';
import * as S from './styled';

export type SearchProps = WithSupportProps<{
  className?: string;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  size?: Size;
  variant?: Variant;
  placeholder?: string;
}>;

const ForwardedSearch = forwardRef<HTMLInputElement, SearchProps>(
  (
    { className, value, onChange, disabled, size = Size.Medium, variant = Variant.Filled, placeholder, ...rest },
    ref,
  ) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = mergeRefs(ref, innerRef);
    const hasClearButton = value && !disabled;
    const handleClearSearch = () => {
      onChange('');
      innerRef.current?.focus();
    };

    return (
      <S.SearchWrapper
        className={className}
        data-size={size}
        data-filled={variant === Variant.Filled || variant === Variant.FilledWithStroke || undefined}
        data-stroke={variant === Variant.FilledWithStroke || undefined}
        data-disabled={disabled || undefined}
        {...extractSupportProps(rest)}
      >
        <S.Input
          ref={inputRef}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder || textProvider(languageCode, Texts.Search)}
          prefix={<S.SearchIcon size={18} data-disabled={disabled || undefined} />}
          postfix={
            hasClearButton && (
              <ButtonIcon
                icon={<CloseInterfaceSVG size={18} />}
                onClick={handleClearSearch}
                tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
                tabIndex={-1}
              />
            )
          }
        />
      </S.SearchWrapper>
    );
  },
);

export const Search = ForwardedSearch as typeof ForwardedSearch & {
  sizes: typeof Size;
  variants: typeof Variant;
};

Search.sizes = Size;
Search.variants = Variant;
