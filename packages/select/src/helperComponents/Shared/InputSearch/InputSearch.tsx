import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Input, InputProps } from '@sbercloud/uikit-react-input';
import { useLanguage } from '@sbercloud/uikit-utils';
import { useEffect, useState } from 'react';

import { Texts, textProvider } from '../../../helpers/texts-provider';
import { crossIconClassName, searchIconClassname } from './styled';

export interface IInputSearchProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (search?: string) => void;
}

export const InputSearch: React.FC<IInputSearchProps> = ({ onChange, value, getInstance, ...inputProps }) => {
  const { code: language } = useLanguage({ onlyEnabledLanguage: true });
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
          <CloseInterfaceSVG
            className={crossIconClassName}
            onClick={(): void => {
              setSearch('');
            }}
          />
        ) : (
          <SearchInterfaceSVG className={searchIconClassname} />
        )
      }
      placeholder={textProvider<string>(language, Texts.search)}
    />
  );
};
