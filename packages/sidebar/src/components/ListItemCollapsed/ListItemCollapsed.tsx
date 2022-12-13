import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import { useSidebarContext } from '../../contexts';
import { isItemAccordion } from '../../helpers';
import { useNestedActive } from '../../hooks';
import { SidebarItem } from '../../types';
import { HoverMenu } from '../HoverMenu';
import { ListItemIcon } from '../ListItemIcon';
import * as S from './styled';

type ListItemCollapsedProps = {
  item: SidebarItem;
};

export function ListItemCollapsed({ item }: ListItemCollapsedProps) {
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
      {item.icon && <ListItemIcon icon={item.icon} active={isActive} disabled={isDisabled} status={item.status} />}
    </S.Item>
  );

  if (isDisabled) {
    return (
      <Tooltip type={Tooltip.types.Instant} content={item.label} placement={Tooltip.placements.Right}>
        {collapsedItem}
      </Tooltip>
    );
  }

  return <HoverMenu item={item}>{collapsedItem}</HoverMenu>;
}
