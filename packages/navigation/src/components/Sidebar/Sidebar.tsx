import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SidebarFooter, SidebarMain } from './components';
import { SidebarContextProvider } from './context';
import * as S from './styled';
import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup } from './types';

export type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  selected?: SidebarItemId;
  footerItems?: SidebarItemProps[];
  onBackClick?(): void;
  onItemClick: SidebarItemProps['onClick'];
  className?: string;
}>;

export function Sidebar({ list, selected, footerItems, onItemClick, onBackClick, className, ...rest }: SidebarProps) {
  return (
    <S.Sidebar className={className} {...extractSupportProps(rest)}>
      <SidebarContextProvider onBackClick={onBackClick} selected={selected} list={list} onItemClick={onItemClick}>
        <SidebarMain />

        <SidebarFooter items={footerItems} />
      </SidebarContextProvider>
    </S.Sidebar>
  );
}

Sidebar.listModes = Mode;
