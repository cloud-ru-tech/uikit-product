import { ReactNode, RefObject, useContext, useEffect } from 'react';

import { Search } from '@sbercloud/uikit-product-search';

import { FloatingContext } from '../../contexts';
import { Divider } from '../Divider';

export type ContentProps = {
  children: ReactNode;
  search: string;
  onSearchChange: (value: string) => void;
};

export function Content({ children, search, onSearchChange }: ContentProps) {
  const { initialFocusRef } = useContext(FloatingContext);

  useEffect(() => () => onSearchChange(''), [onSearchChange]);

  return (
    <>
      <Search
        ref={initialFocusRef as RefObject<HTMLInputElement>}
        value={search}
        onChange={onSearchChange}
        size={Search.sizes.Large}
        variant={Search.variants.Transparent}
        data-test-id='header-project-selector__search'
      />
      <Divider />
      {children}
    </>
  );
}
