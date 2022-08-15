import { useRef } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../helpers';
import { Size, Variant } from './constants';
import * as S from './styled';

export type SearchProps = WithSupportProps<{
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  size?: Size;
  variant?: Variant;
}>;

export function Search({
  value,
  onChange,
  disabled,
  size = Size.Medium,
  variant = Variant.Filled,
  ...rest
}: SearchProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const inputRef = useRef<HTMLInputElement>(null);
  const hasClearButton = value && !disabled;
  const handleClearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <S.SearchWrapper
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
        placeholder={textProvider(languageCode, Texts.Search)}
        prefix={<S.SearchIcon size={18} data-disabled={disabled || undefined} />}
        postfix={
          hasClearButton && (
            <ButtonIcon
              icon={<CloseInterfaceSVG size={18} tabIndex={-1} />}
              onClick={handleClearSearch}
              tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
            />
          )
        }
      />
    </S.SearchWrapper>
  );
}

Search.sizes = Size;
Search.variants = Variant;
