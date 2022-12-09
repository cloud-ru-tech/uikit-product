import { MouseEvent, ReactNode, useContext } from 'react';

import { ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import { EditInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { keyboardSelectHandler, useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { FloatingContext } from '../../contexts/FloatingContext';
import { ItemContext } from '../../contexts/ItemContext';
import { NavigationContext } from '../../contexts/NavigationContext';
import { SelectionContext } from '../../contexts/SelectionContext';
import * as S from './styled';

export type HeaderProjectSelectorOptionListItemProps = {
  value: string;
  index: number | null;
  children: ReactNode;
  onEdit?(value: string): void;
};

export function HeaderProjectSelectorOptionListItem({
  value,
  index,
  children,
  onEdit,
}: HeaderProjectSelectorOptionListItemProps) {
  const { selectedValue, setSelectedValue } = useContext(SelectionContext);
  const { activeIndex, setActiveIndex } = useContext(NavigationContext);
  const { setIsOpen } = useContext(FloatingContext);
  const { getProps, setElement } = useContext(ItemContext);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const isActive = index === activeIndex;
  const isSelected = value === selectedValue;
  const handleEditClick = onEdit
    ? (event: MouseEvent) => {
        event.stopPropagation();

        setIsOpen(false);
        onEdit(value);
      }
    : undefined;

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
      toolbar={
        handleEditClick && (
          <S.Actions>
            <ButtonIconTransparent
              icon={<EditInterfaceSVG />}
              tabIndex={-1}
              onClick={handleEditClick}
              data-test-id='header-project-selector__option-list-item-edit-button'
              tooltip={{ content: textProvider(languageCode, Texts.HeaderProjectSelectorEditOption) }}
            />
          </S.Actions>
        )
      }
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
