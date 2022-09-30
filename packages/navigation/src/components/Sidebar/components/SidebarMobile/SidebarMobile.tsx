import { MouseEvent } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';

import { SIDEBAR_CONTEXT_STUB, SidebarContext } from '../../context/SidebarContext';
import { shouldBeDefaultClick } from '../../helpers/shouldBeDefaultClick';
import { SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarOnActiveChange } from '../../types';
import { SidebarAccordion } from '../SidebarAccordion';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

export type SidebarMobileProps = {
  list: SidebarItemsGroup[];
  footerItems?: SidebarItemProps[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
};

export function SidebarMobile({ list, footerItems, active, onActiveChange }: SidebarMobileProps) {
  function handleItemClick(item: SidebarItemProps) {
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

  const renderItems = (item: SidebarItemProps) => {
    if (item.nestedList?.length) {
      return <SidebarAccordion key={item.id} item={item} accordionLevel={0} isMobile />;
    }

    return <SidebarItem key={item.id} {...item} onClick={handleItemClick(item)} isMobile />;
  };

  return (
    <SidebarContext.Provider value={{ ...SIDEBAR_CONTEXT_STUB, handleItemClick, active }}>
      <S.SidebarMobile>{list.map(group => group.items.map(renderItems))}</S.SidebarMobile>

      {Boolean(footerItems?.length) && (
        <>
          <Divider />

          <S.SidebarMobile>{footerItems?.map(renderItems)}</S.SidebarMobile>
        </>
      )}
    </SidebarContext.Provider>
  );
}
