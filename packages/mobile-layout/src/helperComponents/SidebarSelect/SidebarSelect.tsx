import cn from 'classnames';
import { useMemo, useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { MobileDroplist, MobileDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MobileBlockBasic } from '../../components';
import { useItemsContent, useSearchFilter, useSelectedItem } from './hooks';
import styles from './styles.module.scss';
import { SidebarItem } from './types';

export type SidebarSelectProps = WithSupportProps<{
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  selected?: string | number;
  onSelect?(id: string | number): void;
  className?: string;
  collapse?: MobileDroplistProps['collapse'];
  hasSearch?: boolean;
}>;

export function SidebarSelect({
  className,
  items,
  footerItems = [],
  selected,
  onSelect,
  collapse,
  hasSearch,
  ...otherProps
}: SidebarSelectProps) {
  const [searchValue, setSearchValue] = useState('');
  const { filteredList, searchCollapseState } = useSearchFilter(items, searchValue);
  const list = useItemsContent(filteredList, onSelect);
  const footerList = useItemsContent(footerItems);
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = useSelectedItem(items, selected);

  const selectedCollapsedState = useMemo(() => {
    if (selectedItem.item) {
      return { defaultValue: selectedItem.path };
    }
  }, [selectedItem.item, selectedItem.path]);

  const handleSelect = (value: string | number) => {
    if (value) {
      onSelect?.(value);
    }

    setIsOpen(false);
  };

  const allItems = useMemo(() => [...list, ...footerList], [list, footerList]);

  const shouldShowSearch = hasSearch ?? (allItems.length > 15 || searchValue);

  return (
    <MobileDroplist
      selection={{ mode: 'single', value: selected, onChange: handleSelect }}
      items={allItems}
      open={isOpen}
      onOpenChange={setIsOpen}
      collapse={searchValue ? searchCollapseState : collapse || selectedCollapsedState}
      search={shouldShowSearch ? { value: searchValue, onChange: setSearchValue } : undefined}
      scrollToSelectedItem
    >
      <MobileBlockBasic className={cn(styles.wrapper, className)} {...extractSupportProps(otherProps)}>
        <TruncateString className={styles.triggerText} text={selectedItem.item?.label || ''} />

        {selectedItem.item?.afterContent}

        {isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
      </MobileBlockBasic>
    </MobileDroplist>
  );
}
