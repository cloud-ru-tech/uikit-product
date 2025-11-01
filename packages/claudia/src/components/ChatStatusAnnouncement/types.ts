import { ReactElement, ReactNode } from 'react';

import { LayoutType } from '@sbercloud/uikit-product-utils';

export type TextItem = {
  content: ReactNode;
  shouldFocusOnHover?: boolean;
};

export type ChatStatusAnnouncementProps = {
  icon?: ReactElement;
  content: ReactNode | TextItem[];
  actionLabel: string;
  onActionClick?: () => void;
  layoutType: LayoutType;
  className?: string;
};
