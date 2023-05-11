import cn from 'classnames';

import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SidebarContextProvider } from '../../contexts';
import { getLevelsTree } from '../../helpers';
import { useIsCollapsedState } from '../../hooks';
import { Mode, SidebarItem, SidebarItemId, SidebarItemsGroup, SidebarOnActiveChange, Status } from '../../types';
import { Content } from '../Content';
import { Footer } from '../Footer';
import styles from './styles.module.scss';

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
    <aside
      data-collapsed={isCollapsed || undefined}
      className={cn(styles.sidebar, className)}
      style={{
        backgroundColor: `var(${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND})`,
        borderColor: `var(${GLOBAL_CSS_COLOR.NAVIGATION_BORDER})`,
      }}
      {...extractSupportProps(rest)}
    >
      <SidebarContextProvider
        active={active}
        onActiveChange={onActiveChange}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        levels={rootLevel}
      >
        <div className={styles.contentWrapper}>
          <Content level={rootLevel} />
        </div>
        <Footer items={footerItems} />
      </SidebarContextProvider>
    </aside>
  );
}

Sidebar.listModes = Mode;
Sidebar.itemStatuses = Status;
