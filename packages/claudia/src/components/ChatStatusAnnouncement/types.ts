import { ReactElement } from 'react';

import { LayoutType } from '@sbercloud/uikit-product-utils';

export type TextItem = {
  content: string;
  shouldFocusOnHover?: boolean;
};

export type ChatStatusAnnouncementProps = {
  icon?: ReactElement;
  content: string | TextItem[];
  actionLabel: string;
  onActionClick?: () => void;
  layoutType: LayoutType;
};
