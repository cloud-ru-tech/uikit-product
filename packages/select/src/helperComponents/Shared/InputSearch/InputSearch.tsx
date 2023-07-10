import { forwardRef } from 'react';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputPrivate, InputPrivateProps } from '@sbercloud/uikit-product-input-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';
import { crossIconClassName, InputWrapper, searchIconClassname } from './styled';

export type InputSearchProps = Pick<InputPrivateProps, 'className' | 'ref' | 'onMouseDown' | 'onFocus'> &
  Required<Pick<InputPrivateProps, 'value' | 'onChange'>>;

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ onChange, onMouseDown, onFocus, value, className }, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

    function handleClearClick() {
      onChange('');
    }

    return (
      <InputWrapper className={className}>
        <InputPrivate
          ref={ref}
          type={InputPrivate.types.Text}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          postfix={
            value ? (
              <CloseInterfaceSVG className={crossIconClassName} onClick={handleClearClick} />
            ) : (
              <SearchInterfaceSVG className={searchIconClassname} />
            )
          }
          placeholder={textProvider<string>(languageCode, Texts.Search)}
          data-test-id='select__input-search'
        />
      </InputWrapper>
    );
  },
);
