import { createRef, useEffect, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputPrivate, InputPrivateProps } from '@sbercloud/uikit-product-input-private';
import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { InputWrapStyled, searchIconClassname } from './styled';

export type ToolbarInputProps = Required<Pick<InputPrivateProps, 'value' | 'onChange' | 'placeholder'>> &
  Pick<InputPrivateProps, 'disabled'>;

export function ToolbarInput({ value, onChange, ...inputAndSupportProps }: WithSupportProps<ToolbarInputProps>) {
  const { languageCode } = useLanguage();
  const inputWrapperRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const [hasPrevSibling, setPrevSibling] = useState<undefined | boolean>();
  const [hasNextSibling, setNextSibling] = useState<undefined | boolean>();

  useEffect(() => {
    const inputWrapper = inputWrapperRef?.current;

    if (!inputWrapper) {
      return;
    }

    setPrevSibling(Boolean(inputWrapper.previousElementSibling) || undefined);
    setNextSibling(Boolean(inputWrapper.nextElementSibling) || undefined);
  }, [inputWrapperRef]);

  return (
    <InputWrapStyled
      ref={inputWrapperRef}
      data-has-prev-sibling={hasPrevSibling || undefined}
      data-has-next-sibling={hasNextSibling || undefined}
      data-test-id='toolbar__input'
    >
      <InputPrivate
        {...inputAndSupportProps}
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={InputPrivate.types.Text}
        postfix={
          value ? (
            <ButtonIcon
              icon={<CloseInterfaceSVG />}
              onClick={(): void => {
                onChange('');
                inputRef.current?.focus();
              }}
              tooltip={{ content: textProvider(languageCode, Texts.Clear) }}
              data-test-action-id='toolbar__input-clear-btn'
            />
          ) : (
            <SearchInterfaceSVG className={searchIconClassname} />
          )
        }
      />
    </InputWrapStyled>
  );
}
