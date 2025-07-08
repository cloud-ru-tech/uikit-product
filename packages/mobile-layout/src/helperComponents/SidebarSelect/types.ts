import { MouseEvent, ReactNode } from 'react';

import { MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

export type SidebarItem = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  href?: string;
  afterContent?: ReactNode;
  disabledReason?: ReactNode;
  disabledReasonPlacement?: MobileTooltipProps['placement'];
  items?: SidebarItem[];
};
