import { ReactElement, ReactNode } from 'react';

import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE } from './constants';

export type TextItem = {
  content: ReactNode;
  shouldFocusOnHover?: boolean;
};

export type Appearance = ValueOf<typeof APPEARANCE>;

export type ChatStatusAnnouncementWithSingleItem = {
  icon?: ReactElement;
  content: ReactNode;
  items?: undefined;
  contentClassName?: string;
  actionLabel: string;
  onActionClick?: () => void;
  layoutType: LayoutType;
  className?: string;
  appearance?: Appearance;
};

export type ChatStatusAnnouncementPropsWithList = {
  icon?: ReactElement;
  content?: undefined;
  items: TextItem[];
  contentClassName?: string;
  actionLabel: string;
  onActionClick?: () => void;
  layoutType: LayoutType;
  className?: string;
  appearance?: Appearance;
};

export type ChatStatusAnnouncementProps = ChatStatusAnnouncementWithSingleItem | ChatStatusAnnouncementPropsWithList;
