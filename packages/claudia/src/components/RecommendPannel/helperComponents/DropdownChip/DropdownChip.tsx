import { useRef, useState } from 'react';

import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { Dropdown } from '@snack-uikit/dropdown';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { useOutsideClick } from '../../hooks';
import { ChipProps, ChipType, Size } from '../../types';
import { Chip } from '../Chip';
import styles from './styles.module.scss';

type DropdownContentProps = {
  dropdownItems: ChipProps[];
  closeDropdown: () => void;
};

function DropdownContent({ dropdownItems, closeDropdown }: DropdownContentProps) {
  return (
    <div className={styles.dropdown}>
      {dropdownItems.map(item => (
        <button
          key={item.id}
          className={styles.dropdownItem}
          onClick={() => {
            closeDropdown();
            item?.onClick?.();
          }}
        >
          <Typography.SansBodyS>
            <TruncateString variant='end' placement='top' text={item.label} maxLines={1} />
          </Typography.SansBodyS>
        </button>
      ))}
    </div>
  );
}

type DropdownChip = {
  label: string;
  type: ChipType;
  size: Size;
  layoutType?: LayoutType;
  dropdownItems: ChipProps[];
};

export function DropdownChip({ size, layoutType, type, label, dropdownItems }: DropdownChip) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;

  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  useOutsideClick([ref], closeDropdown);

  if (isMobile) {
    return (
      <MobileDropdown
        open={isDropdownOpen}
        content={<DropdownContent closeDropdown={closeDropdown} dropdownItems={dropdownItems} />}
      >
        <Chip
          ref={ref}
          isVisible={true}
          className={styles.dropdownChip}
          type={type}
          label={label}
          size={size}
          layoutType={layoutType}
          onClick={openDropdown}
        />
      </MobileDropdown>
    );
  }

  return (
    <Dropdown
      triggerRef={ref}
      open={isDropdownOpen}
      placement='bottom-end'
      content={<DropdownContent closeDropdown={closeDropdown} dropdownItems={dropdownItems} />}
    >
      <Chip
        isVisible={true}
        className={styles.dropdownChip}
        type={type}
        label={label}
        size={size}
        layoutType={layoutType}
        onClick={openDropdown}
      />
    </Dropdown>
  );
}
