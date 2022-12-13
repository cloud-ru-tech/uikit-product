import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SidebarContextProvider } from '../../contexts';
import { getLevelsTree } from '../../helpers';
import { useIsCollapsedState } from '../../hooks';
import { Mode, SidebarItem, SidebarItemId, SidebarItemsGroup, SidebarOnActiveChange, Status } from '../../types';
import { Content } from '../Content';
import { Footer } from '../Footer';
import * as S from './styled';

export type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItem[];
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
        <S.ContentWrapper>
          <Content level={rootLevel} />
        </S.ContentWrapper>
        <Footer items={footerItems} />
      </SidebarContextProvider>
    </S.Sidebar>
  );
}

Sidebar.listModes = Mode;
Sidebar.itemStatuses = Status;
