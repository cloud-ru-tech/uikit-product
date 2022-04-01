import { ReactChildren, ReactText, useContext } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { TabContext } from '../../helpers/context';
import { TabId } from '../../helpers/types';

export type ContentProps = WithSupportProps<{
  value: TabId;
  children: ReactChildren | ReactText;
  className?: string;
}>;

export function Content({ className, value, children, ...rest }: ContentProps) {
  const { selectedTab } = useContext(TabContext);
  const isSelected = value === selectedTab;

  if (!isSelected) return null;

  return (
    <div className={className} data-test-id={`tabs__content:${value}`} {...rest}>
      {children}
    </div>
  );
}
