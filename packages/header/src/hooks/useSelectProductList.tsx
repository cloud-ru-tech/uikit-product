import { Avatar } from '@snack-uikit/avatar';
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

      items: group.items.filter(filterHidden).map(item => ({
        content: {
          option: item.name,
        },
        beforeContent: item.logo ?? <Avatar size='xs' name={item.name} showTwoSymbols shape='square' />,
        id: item.id,

        onClick: () => {
          onProductChange(item);
          closeDropList?.();
        },
        'data-test-id': `header__select-group-item-${item.id}`,
      })),
    })),
  };
}
