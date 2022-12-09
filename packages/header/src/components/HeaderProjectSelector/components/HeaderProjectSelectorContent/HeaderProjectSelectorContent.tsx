import { ReactNode, RefObject, useContext, useEffect } from 'react';

import { Search } from '@sbercloud/uikit-product-search';

import { FloatingContext } from '../../contexts/FloatingContext';
import { HeaderProjectSelectorDivider } from '../HeaderProjectSelectorDivider';

export type HeaderProjectSelectorContentProps = {
  children: ReactNode;
  search: string;
  onSearchChange: (value: string) => void;
};

export function HeaderProjectSelectorContent({ children, search, onSearchChange }: HeaderProjectSelectorContentProps) {
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
      <HeaderProjectSelectorDivider />
      {children}
    </>
  );
}
