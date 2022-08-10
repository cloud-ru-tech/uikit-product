import React from 'react';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputPrivate, InputPrivateProps } from '@sbercloud/uikit-product-input-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';
import { crossIconClassName, InputWrapper, searchIconClassname } from './styled';

export type InputSearchProps = Pick<InputPrivateProps, 'className' | 'ref'> &
  Required<Pick<InputPrivateProps, 'value' | 'onChange'>>;

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ onChange, value, className }, ref) => {
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
