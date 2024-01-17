import { KeyboardEvent, ReactElement, useRef, useState } from 'react';

import { Avatar } from '@snack-uikit/avatar';
import { Dropdown } from '@snack-uikit/droplist';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import { ItemsGroup, SelectGroupSection } from '../../../SelectGroupSection';
import styles from './styles.modules.scss';

type Product = {
  id: string;
  name: string;
  category: string;
  logo?: ReactElement;
};

export type SelectProductsProps = {
  options: ItemsGroup<Product>[];
  onChange(product: Product): void;
  selectedItem: Product;
};

export function SelectProduct({ options, onChange, selectedItem }: SelectProductsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigateInsideRef = useRef<HTMLDivElement>(null);
  const navigateOutsideRef = useRef<HTMLDivElement>(null);

  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
      setTimeout(() => navigateInsideRef.current?.focus(), 0);
    }
  };

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className={styles.droplist}>
          <SelectGroupSection
            navigateInsideRef={navigateInsideRef}
            navigateOutsideRef={navigateOutsideRef}
            groups={options}
            onItemChange={onChange}
            selectedItem={selectedItem}
             />
        </div>
      }
      placement='bottom'
    >
      <div
        className={styles.select}
        tabIndex={0}
        role={'menu'}
        data-open={isOpen || undefined}
        onKeyDown={handleSelectKeyDown}
        ref={navigateOutsideRef}
      >
        <div className={styles.logo}>
          {selectedItem.logo ?? <Avatar size='xs' name={selectedItem.name} showTwoSymbols shape='square' />}
        </div>

        <div className={styles.selectedSection}>
          <div className={styles.selectedHeading}>{selectedItem.category}</div>

          <div className={styles.selectedOption}>
            <TruncateString text={selectedItem.name} hideTooltip />
          </div>
        </div>

        <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>
      </div>
    </Dropdown>
  );
}
