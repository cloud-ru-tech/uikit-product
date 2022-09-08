import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SidebarFooter, SidebarMain } from './components';
import { SidebarContextProvider } from './context';
import { useIsCollapsedState } from './hooks';
import * as S from './styled';
import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarOnActiveChange } from './types';

export type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItemProps[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  className?: string;
}>;

export function Sidebar({ list, active, footerItems, onActiveChange, className, ...rest }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsedState();

  return (
    <S.Sidebar data-collapsed={isCollapsed || undefined} className={className} {...extractSupportProps(rest)}>
      <SidebarContextProvider
        active={active}
        list={list}
        onActiveChange={onActiveChange}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      >
        <SidebarMain />

        <SidebarFooter items={footerItems} />
      </SidebarContextProvider>
    </S.Sidebar>
  );
}

Sidebar.listModes = Mode;
