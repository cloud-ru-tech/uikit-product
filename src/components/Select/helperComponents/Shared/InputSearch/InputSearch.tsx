import React, { useState, useEffect } from 'react';
import { css } from '@linaria/core';

import { SearchSVG, CrossSVG } from '@aicloud/ui-icons';

import { Input } from 'components/Input';
import { IInputProps } from 'components/Input/helpers/types';

import { crossIconClassName, searchIconClassname } from './styled';

export interface IInputSearchProps extends Omit<IInputProps, 'onChange'> {
  value?: string;
  onChange?: (search?: string) => void;
}

const searchIconWrapperClassName = css`
  margin-right: 12px;
`;

export const InputSearch = React.forwardRef<
  HTMLInputElement,
  IInputSearchProps
>(({ onChange, value, ...inputProps }, ref) => {
  const [search, setSearch] = useState<string | undefined>(value);
  useEffect(() => {
    if (search === value) return;
    onChange?.(search);
  }, [search]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <Input
      {...inputProps}
      ref={ref}
      type='embed'
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
      }}
      postfix={
        search ? (
          <CrossSVG
            className={crossIconClassName}
            wrapperClasses={searchIconWrapperClassName}
            onClick={(): void => {
              setSearch('');
            }}
          />
        ) : (
          <SearchSVG
            className={searchIconClassname}
            wrapperClasses={searchIconWrapperClassName}
          />
        )
      }
      placeholder='Поиск'
    />
  );
});
