import { forwardRef, LiHTMLAttributes } from 'react';

import { HeaderProjectSelectorBox, HeaderProjectSelectorBoxProps } from '../HeaderProjectSelectorBox';
import { HeaderProjectSelectorListItem } from '../HeaderProjectSelectorListItem';

export type HeaderProjectSelectorBoxListItemProps = LiHTMLAttributes<HTMLElement> & HeaderProjectSelectorBoxProps;

export const HeaderProjectSelectorBoxListItem = forwardRef<HTMLElement, HeaderProjectSelectorBoxListItemProps>(
  function HeaderProjectSelectorBoxListItem(props, ref) {
    return <HeaderProjectSelectorBox {...props} as={HeaderProjectSelectorListItem} ref={ref} />;
  },
);
