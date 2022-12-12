import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SidebarContextProvider } from '../../contexts';
import { getLevelsTree } from '../../helpers';
import { useIsCollapsedState } from '../../hooks';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarMain } from '../SidebarMain';
import * as S from './styled';
import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarOnActiveChange, Status } from './types';

export type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItemProps[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  className?: string;
}>;

export function Sidebar({ list, active, footerItems, onActiveChange, className, ...rest }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsedState();
  const rootLevel = getLevelsTree(list);

  return (
    <S.Sidebar data-collapsed={isCollapsed || undefined} className={className} {...extractSupportProps(rest)}>
      <SidebarContextProvider
        active={active}
        onActiveChange={onActiveChange}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        levels={rootLevel}
      >
        <S.MainContentWrapper>
          <SidebarMain level={rootLevel} />
        </S.MainContentWrapper>
        <SidebarFooter items={footerItems} />
      </SidebarContextProvider>
    </S.Sidebar>
  );
}

Sidebar.listModes = Mode;
Sidebar.itemStatuses = Status;
