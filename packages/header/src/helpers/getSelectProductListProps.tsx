import { MouseEventHandler } from 'react';

import { Avatar } from '@snack-uikit/avatar';
import { HotSpot } from '@snack-uikit/hot-spot';
import { ListProps } from '@snack-uikit/list';

import { SelectProductsProps } from '../helperComponents';
import { filterHidden } from '../helperComponents/DrawerMenu/utils';

export function getSelectProductListProps({
  allProducts,
  onProductChange,
  selectedProduct,
  closeDropList,
}: SelectProductsProps): ListProps {
  return {
    selection: {
      mode: 'single',
      value: selectedProduct.id,
    },
    items: allProducts.map(group => ({
      label: group.heading,
      mode: 'secondary',
      type: 'group',

      items: group.items.filter(filterHidden).map(item => ({
        content: {
          option: item.name,
        },
        beforeContent: item.logo ?? (
          <Avatar size='xs' name={item.name} showTwoSymbols shape='square' appearance='neutral' />
        ),

        ...(item.hotSpot ? { afterContent: <HotSpot {...item.hotSpot} /> } : {}),

        id: item.id,
        itemWrapRender(itemInner) {
          const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
            if (!e.metaKey) {
              e.preventDefault();
              closeDropList?.();
            }

            onProductChange(item, e);
          };

          return (
            <a target='_blank' href={item.href} rel='noreferrer' onClick={handleClick}>
              {itemInner}
            </a>
          );
        },
        'data-test-id': `header__select-group-platform__item-${item.id}`,
      })),
    })),
  };
}
