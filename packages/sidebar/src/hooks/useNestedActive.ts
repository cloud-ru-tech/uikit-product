import { useMemo } from 'react';

import { SidebarItemProps } from '../components/Sidebar/types';
import { useSidebarContext } from '../contexts';
import { findActive, isItemAccordion } from '../helpers';

export const useNestedActive = (item: SidebarItemProps, isMobile?: boolean): boolean => {
  const { active } = useSidebarContext();
  const hasInnerChildren = isItemAccordion(item, isMobile);

  return useMemo(() => {
    if (hasInnerChildren) {
      return Boolean(findActive(item, active));
    }

    return false;
  }, [hasInnerChildren, item, active]);
};
