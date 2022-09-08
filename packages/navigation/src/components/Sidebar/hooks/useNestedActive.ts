import { useMemo } from 'react';

import { useSidebarContext } from '../context';
import { findActive, isItemAccordion } from '../helpers';
import { SidebarItemProps } from '../types';

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
