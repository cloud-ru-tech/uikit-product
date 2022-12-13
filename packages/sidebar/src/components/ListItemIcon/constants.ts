import { StatusBadge, StatusBadgeProps } from '@sbercloud/uikit-product-status';

import { Texts } from '../../helpers';
import { Status } from '../../types';

export const BADGE_STATUS_BY_SIDEBAR_STATUS: Record<Status, StatusBadgeProps['type']> = {
  [Status.Active]: StatusBadge.types.Success,
  [Status.Suspended]: StatusBadge.types.Failed,
};

export const TEXT_BY_SIDEBAR_STATUS: Record<Status, Texts> = {
  [Status.Active]: Texts.StatusActive,
  [Status.Suspended]: Texts.StatusSuspended,
};
