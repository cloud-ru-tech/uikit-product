import { ReactNode, useEffect } from 'react';

import { Search } from '@sbercloud/uikit-product-search';

import { HeaderProjectSelectorDivider } from '../HeaderProjectSelectorDivider';

export type HeaderProjectSelectorContentProps = {
  children: ReactNode;
  search: string;
  onSearchChange: (value: string) => void;
};

export function HeaderProjectSelectorContent({ children, search, onSearchChange }: HeaderProjectSelectorContentProps) {
  useEffect(
    () => () => {
      onSearchChange('');
    },
    [onSearchChange],
  );

  return (
    <>
      <Search
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
