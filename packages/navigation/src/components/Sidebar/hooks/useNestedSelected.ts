import { useMemo } from 'react';

import { useSidebarContext } from '../context';
import { findSelected } from '../helpers';
import { Mode, SidebarItemProps } from '../types';

export const useNestedSelected = (item: SidebarItemProps): boolean => {
  const { selected } = useSidebarContext();
  const hasInnerChildren = Boolean(item.mode === Mode.Accordion && item.nestedList?.length);

  return useMemo(() => {
    if (hasInnerChildren) {
      return Boolean(findSelected(item, selected));
    }

    return false;
  }, [hasInnerChildren, item, selected]);
};
