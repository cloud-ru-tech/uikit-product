import { useSidebarContext } from '../../context';
import { isItemAccordion } from '../../helpers';
import { useNestedActive } from '../../hooks';
import { SidebarItemProps } from '../../types';
import { HoverMenu } from '../HoverMenu';
import { SidebarItemIcon } from '../SidebarItemIcon';
import * as S from './styled';

type SidebarCollapsedItemProps = {
  item: SidebarItemProps;
};

export function SidebarCollapsedItem({ item }: SidebarCollapsedItemProps) {
  const { active, handleItemClick } = useSidebarContext();
  const nestedSelected = useNestedActive(item);
  const onClick = handleItemClick(item);

  const isActive = item.id === active || nestedSelected || undefined;
  const isDisabled = item.disabled || undefined;

  const collapsedItem = (
    <S.Item
      onClick={isItemAccordion(item) ? undefined : onClick}
      data-collapsed={true}
      data-disabled={isDisabled}
      data-test-id={`sidebar__item-${item.id}`}
    >
      {item.icon && <SidebarItemIcon icon={item.icon} active={isActive} disabled={isDisabled} status={item.status} />}
    </S.Item>
  );

  if (isDisabled) {
    return collapsedItem;
  }

  return <HoverMenu item={item}>{collapsedItem}</HoverMenu>;
}
