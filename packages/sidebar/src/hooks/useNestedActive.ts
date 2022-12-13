import { useMemo } from 'react';

import { useSidebarContext } from '../contexts';
import { findActive, isItemAccordion } from '../helpers';
import { SidebarItem } from '../types';

export const useNestedActive = (item: SidebarItem, isMobile?: boolean): boolean => {
  const { active } = useSidebarContext();
  const hasInnerChildren = isItemAccordion(item, isMobile);

  return useMemo(() => {
    if (hasInnerChildren) {
      return Boolean(findActive(item, active));
    }

    return false;
  }, [hasInnerChildren, item, active]);
};
