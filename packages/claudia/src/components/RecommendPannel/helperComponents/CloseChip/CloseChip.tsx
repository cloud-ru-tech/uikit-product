import { ReactNode, useRef, useState } from 'react';

import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { Dropdown } from '@snack-uikit/dropdown';
import { Typography } from '@snack-uikit/typography';

import { useOutsideClick } from '../../hooks';
import { Size } from '../../types';
import styles from './styles.module.scss';

type DropdownContentProps = {
  content: ReactNode;
  onClick: () => void;
  closeDropdown: () => void;
};

function DropdownContent({ content, onClick, closeDropdown }: DropdownContentProps) {
  const onDropdownItemClick = () => {
    closeDropdown();
    onClick();
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownItem} onClick={onDropdownItemClick}>
        <Typography.SansBodyS>{content}</Typography.SansBodyS>
      </button>
    </div>
  );
}

type CloseChipProps = {
  content: ReactNode;
  size: Size;
  layoutType?: LayoutType;
  onClick: () => void;
  isVisible?: boolean;
};

export function CloseChip({ size, content, onClick, isVisible, layoutType }: CloseChipProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;
  const isMobileChipSize = isMobile || size === Size.M;

  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  useOutsideClick([ref], closeDropdown);

  if (isMobile) {
    return (
      <MobileDropdown
        open={isDropdownOpen}
        content={<DropdownContent closeDropdown={closeDropdown} content={content} onClick={onClick} />}
      >
        <button
          data-hidden={!isVisible || undefined}
          data-mobile={true}
          className={styles.closeChip}
          ref={ref}
          onClick={openDropdown}
        >
          <MoreInterfaceSVG size={24} />
        </button>
      </MobileDropdown>
    );
  }

  return (
    <Dropdown
      open={isDropdownOpen}
      triggerRef={ref}
      placement='bottom-end'
      content={<DropdownContent closeDropdown={closeDropdown} content={content} onClick={onClick} />}
    >
      <button
        data-hidden={!isVisible || undefined}
        data-mobile={isMobileChipSize || undefined}
        className={styles.closeChip}
        onClick={openDropdown}
      >
        <MoreInterfaceSVG size={24} />
      </button>
    </Dropdown>
  );
}
