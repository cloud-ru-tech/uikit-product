import { ReactElement } from 'react';

import { LayoutType } from '@cloud-ru/uikit-product-utils';

export type TextItem = {
  content: string;
  shouldFocusOnHover?: boolean;
};

export type ChatStatusAnnouncementProps = {
  icon?: ReactElement;
  content: string | TextItem[];
  contentClassName?: string;
  actionLabel: string;
  onActionClick?: () => void;
  layoutType: LayoutType;
  className?: string;
};
