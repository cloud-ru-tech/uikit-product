import React, { useEffect, useState } from 'react';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputPrivate, InputPrivateProps } from '@sbercloud/uikit-product-input-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { Texts, textProvider } from '../../../helpers/texts-provider';
import { InputWrapper, crossIconClassName, searchIconClassname } from './styled';

export type InputSearchProps = Pick<InputPrivateProps, 'className' | 'ref'> &
  Required<Pick<InputPrivateProps, 'value' | 'onChange'>>;

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ onChange, value, className }, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [search, setSearch] = useState(value);
    useEffect(() => {
      if (search === value) return;
      onChange(search);
    }, [onChange, search, value]);

    useEffect(() => {
      setSearch(value);
    }, [value]);

    return (
      <InputWrapper className={className}>
        <InputPrivate
          ref={ref}
          type={InputPrivate.types.Text}
          value={search}
          onChange={setSearch}
          postfix={
            search ? (
              <CloseInterfaceSVG className={crossIconClassName} onClick={() => setSearch('')} />
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
