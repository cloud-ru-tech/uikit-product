import { MouseEvent } from 'react';

import { useSidebarContext } from '../../context';
import { useNestedActive } from '../../hooks';
import { SidebarItemProps } from '../../types';
import { HoverMenu } from '../HoverMenu';
import * as S from './styled';

type SidebarCollapsedItemProps = {
  item: SidebarItemProps;
  onClick?(e: MouseEvent): void;
};

export function SidebarCollapsedItem({ item, onClick }: SidebarCollapsedItemProps) {
  const { active } = useSidebarContext();
  const nestedSelected = useNestedActive(item);

  const isActive = item.id === active || nestedSelected || undefined;
  const isDisabled = item.disabled || undefined;
  const noHover = !Boolean(onClick) || item.disabled || undefined;

  const collapsedItem = (
    <S.Item
      onClick={onClick}
      data-collapsed={true}
      data-disabled={isDisabled}
      data-no-hover={noHover}
      data-test-id={`sidebar__item-${item.id}`}
    >
      {item.icon && (
        <S.Icon data-test-id='sidebar__item__icon' data-disabled={isDisabled} data-active={isActive}>
          {item.icon}
        </S.Icon>
      )}
    </S.Item>
  );

  if (noHover) {
    return collapsedItem;
  }

  return <HoverMenu item={item}>{collapsedItem}</HoverMenu>;
}
