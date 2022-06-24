import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

export enum NotificationBigStatus {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  WarningCritical = 'WarningCritical',
  WarningAlarm = 'WarningAlarm',
  Error = 'Error',
  ErrorAlarm = 'ErrorAlarm',
}

export enum NotificationBigVariant {
  Info = 'Info',
  Alarm = 'Alarm',
}

export const ICONS_BY_STATUS = {
  [NotificationBigStatus.Info]: PredefinedIconsPrivate.icons.Info,
  [NotificationBigStatus.Success]: PredefinedIconsPrivate.icons.Success,
  [NotificationBigStatus.Warning]: PredefinedIconsPrivate.icons.AttentionWarning,
  [NotificationBigStatus.WarningCritical]: PredefinedIconsPrivate.icons.AttentionCritical,
  [NotificationBigStatus.WarningAlarm]: PredefinedIconsPrivate.icons.AttentionCritical,
  [NotificationBigStatus.Error]: PredefinedIconsPrivate.icons.Failed,
  [NotificationBigStatus.ErrorAlarm]: PredefinedIconsPrivate.icons.Failed,
};

export const VARIANT_BY_STATUS = {
  [NotificationBigStatus.Info]: PredefinedIconsPrivate.variants.OnDark,
  [NotificationBigStatus.Success]: PredefinedIconsPrivate.variants.OnDark,
  [NotificationBigStatus.Warning]: PredefinedIconsPrivate.variants.OnDark,
  [NotificationBigStatus.WarningCritical]: PredefinedIconsPrivate.variants.OnDark,
  [NotificationBigStatus.WarningAlarm]: PredefinedIconsPrivate.variants.OnAccent,
  [NotificationBigStatus.Error]: PredefinedIconsPrivate.variants.OnDark,
  [NotificationBigStatus.ErrorAlarm]: PredefinedIconsPrivate.variants.OnAccent,
};
