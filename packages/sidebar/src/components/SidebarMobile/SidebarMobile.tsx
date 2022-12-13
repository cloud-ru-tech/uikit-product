import { MouseEvent } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SIDEBAR_CONTEXT_STUB, SidebarContext } from '../../contexts/SidebarContext';
import { shouldBeDefaultClick } from '../../helpers';
import { SidebarItem, SidebarItemId, SidebarItemsGroup, SidebarOnActiveChange } from '../../types';
import { Accordion } from '../Accordion';
import { ListItem } from '../ListItem';
import * as S from './styled';

export type SidebarMobileProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItem[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
}>;

export function SidebarMobile({ list, footerItems, active, onActiveChange, ...rest }: SidebarMobileProps) {
  function handleItemClick(item: SidebarItem) {
    return (event: MouseEvent) => {
      if (shouldBeDefaultClick(event)) {
        return;
      }

      event.preventDefault();

      if (item.disabled) {
        return;
      }

      const id = (item.nestedList?.length ? active : item.id) as string;

      return onActiveChange?.({ id, href: item.href });
    };
  }

  const renderItems = (item: SidebarItem) => {
    if (item.nestedList?.length) {
      return <Accordion key={item.id} item={item} accordionLevel={0} isMobile />;
    }

    return <ListItem key={item.id} {...item} onClick={handleItemClick(item)} isMobile />;
  };

  return (
    <SidebarContext.Provider value={{ ...SIDEBAR_CONTEXT_STUB, handleItemClick, active }}>
      <S.Wrapper {...extractSupportProps(rest)}>
        <S.SidebarMobile>{list.map(group => group.items.map(renderItems))}</S.SidebarMobile>

        {Boolean(footerItems?.length) && (
          <>
            <Divider />

            <S.SidebarMobile>{footerItems?.map(renderItems)}</S.SidebarMobile>
          </>
        )}
      </S.Wrapper>
    </SidebarContext.Provider>
  );
}
