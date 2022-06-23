import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

export enum NotificationSmallStatus {
  Success = 'Success',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

export const ICON_STATUS_TYPE = {
  [NotificationSmallStatus.Success]: PredefinedIconsPrivate.icons.Success,
  [NotificationSmallStatus.Error]: PredefinedIconsPrivate.icons.Failed,
  [NotificationSmallStatus.Loading]: PredefinedIconsPrivate.icons.Loading,
};
