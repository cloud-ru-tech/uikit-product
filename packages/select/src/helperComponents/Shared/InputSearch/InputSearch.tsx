import { CrossSVG, SearchSVG } from '@sbercloud/icons';
import { Input, InputProps } from '@sbercloud/uikit-react-input';
import { useEffect, useState } from 'react';

import { crossIconClassName, searchIconClassname } from './styled';

export interface IInputSearchProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (search?: string) => void;
}

export const InputSearch: React.FC<IInputSearchProps> = ({ onChange, value, getInstance, ...inputProps }) => {
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
      getInstance={getInstance}
      type={Input.types.embed}
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
      }}
      postfix={
        search ? (
          <CrossSVG
            className={crossIconClassName}
            onClick={(): void => {
              setSearch('');
            }}
          />
        ) : (
          <SearchSVG className={searchIconClassname} />
        )
      }
      placeholder='Поиск'
    />
  );
};
