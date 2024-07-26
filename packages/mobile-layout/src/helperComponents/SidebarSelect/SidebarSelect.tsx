import cn from 'classnames';
import { useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MobileBlockBasic } from '../../components';
import { useItemsContent } from './helpers';
import styles from './styles.module.scss';
import { SidebarItem } from './types';

export type SidebarSelectProps = WithSupportProps<{
  items: SidebarItem[];
  selected?: string | number;
  onSelect?(id: string | number): void;
  className?: string;
}>;

export function SidebarSelect({ className, items, selected, onSelect, ...otherProps }: SidebarSelectProps) {
  const list = useItemsContent(items, onSelect);
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = items.find(item => item.id === selected);

  const handleSelect = (value: string | number) => {
    if (value) {
      onSelect?.(value);
    }

    setIsOpen(false);
  };

  return (
    <>
      <MobileDropdown
        selection={{ mode: 'single', value: selected, onChange: handleSelect }}
        items={list}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <MobileBlockBasic className={cn(styles.wrapper, className)} {...extractSupportProps(otherProps)}>
          <TruncateString className={styles.triggerText} text={selectedItem?.label || ''} />

          {isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
        </MobileBlockBasic>
      </MobileDropdown>
    </>
  );
}
