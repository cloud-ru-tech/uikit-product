import { useRef, useState } from 'react';

import { MobileDropdown } from '@cloud-ru/uikit-product-mobile-dropdown';
import { LAYOUT_TYPE, LayoutType } from '@cloud-ru/uikit-product-utils';
import { Dropdown } from '@snack-uikit/dropdown';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { useOutsideClick } from '../../hooks';
import { ChipProps, ChipType, SIZE, Size } from '../../types';
import { Chip } from '../Chip';
import styles from './styles.module.scss';

type DropdownContentProps = {
  dropdownItems: ChipProps[];
  closeDropdown: () => void;
  isMobile: boolean;
  size: Size;
};

function DropdownContent({ size, dropdownItems, closeDropdown, isMobile }: DropdownContentProps) {
  const isMobileChipSize = isMobile || size === SIZE.M;

  const TypographyComponent = isMobileChipSize ? Typography.SansBodyM : Typography.SansBodyS;

  return (
    <div className={styles.dropdown} data-mobile={isMobile || undefined}>
      {dropdownItems.map(item => (
        <button
          key={item.id}
          data-mobile={isMobileChipSize || undefined}
          className={styles.dropdownItem}
          onClick={() => {
            closeDropdown();
            item?.onClick?.();
          }}
        >
          <TypographyComponent>
            <TruncateString variant='end' placement='top' text={item.label} maxLines={1} />
          </TypographyComponent>
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
        content={
          <DropdownContent
            size={size}
            isMobile={isMobile}
            closeDropdown={closeDropdown}
            dropdownItems={dropdownItems}
          />
        }
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
      content={
        <DropdownContent size={size} isMobile={isMobile} closeDropdown={closeDropdown} dropdownItems={dropdownItems} />
      }
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
