import { MouseEvent } from 'react';

import { useSidebarContext } from '../../context';
import { useNestedSelected } from '../../hooks';
import { SidebarItemProps } from '../../types';
import * as S from './styled';

type SidebarCollapsedItemProps = {
  item: SidebarItemProps;
  onClick?(e: MouseEvent): void;
};

export function SidebarCollapsedItem({ item, onClick }: SidebarCollapsedItemProps) {
  const { selected } = useSidebarContext();
  const nestedSelected = useNestedSelected(item);
  const isSelected = item.id === selected || nestedSelected || undefined;
  const isDisabled = item.disabled || undefined;
  const noHover = !Boolean(onClick) || undefined;

  return (
    <S.Item onClick={onClick} data-disabled={isDisabled} data-no-hover={noHover} data-test-id='sidebar__collapsed-item'>
      {item.icon && (
        <S.Icon data-test-id='sidebar__collapsed-item__icon' data-disabled={isDisabled} data-selected={isSelected}>
          {item.icon}
        </S.Icon>
      )}
    </S.Item>
  );
}
