import { ReactNode, useContext } from 'react';

import { keyboardSelectHandler } from '@sbercloud/uikit-product-utils';

import { FloatingContext } from '../../contexts/FloatingContext';
import { ItemContext } from '../../contexts/ItemContext';
import { NavigationContext } from '../../contexts/NavigationContext';
import { SelectionContext } from '../../contexts/SelectionContext';
import * as S from './styled';

export type HeaderProjectSelectorOptionListItemProps = {
  value: string;
  index: number | null;
  children: ReactNode;
};

export function HeaderProjectSelectorOptionListItem({
  value,
  index,
  children,
}: HeaderProjectSelectorOptionListItemProps) {
  const { selectedValue, setSelectedValue } = useContext(SelectionContext);
  const { activeIndex, setActiveIndex } = useContext(NavigationContext);
  const { setIsOpen } = useContext(FloatingContext);
  const { getProps, setElement } = useContext(ItemContext);
  const isActive = index === activeIndex;
  const isSelected = value === selectedValue;

  function handleSelect() {
    setSelectedValue(value);
    setActiveIndex(null);
    setIsOpen(false);
  }

  function setItem(element: HTMLElement | null) {
    setElement(element, index);
  }

  return (
    <S.Wrapper
      role='option'
      tabIndex={isActive ? 0 : 1}
      data-active={isActive || undefined}
      data-selected={isSelected || undefined}
      data-test-id='header-project-selector__option-list-item'
      data-test-value={value}
      ref={setItem}
      {...getProps({ onClick: handleSelect, onKeyDown: keyboardSelectHandler(handleSelect) })}
    >
      {children}
    </S.Wrapper>
  );
}
