import { forwardRef, LiHTMLAttributes } from 'react';

import { HeaderProjectSelectorBox } from '../HeaderProjectSelectorBox';
import { HeaderProjectSelectorListItem } from '../HeaderProjectSelectorListItem';

export type HeaderProjectSelectorBoxListItemProps = LiHTMLAttributes<HTMLElement>;

export const HeaderProjectSelectorBoxListItem = forwardRef<HTMLElement, HeaderProjectSelectorBoxListItemProps>(
  function HeaderProjectSelectorBoxListItem(props, ref) {
    return <HeaderProjectSelectorBox {...props} as={HeaderProjectSelectorListItem} ref={ref} />;
  },
);
