import {
  AttentionInterfaceSVG,
  CircleCancelFilledInterfaceSVG,
  CircleCheckFilledInterfaceSVG,
  InfoInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

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
  [NotificationBigStatus.Info]: InfoInterfaceSVG,
  [NotificationBigStatus.Success]: CircleCheckFilledInterfaceSVG,
  [NotificationBigStatus.Warning]: AttentionInterfaceSVG,
  [NotificationBigStatus.WarningCritical]: AttentionInterfaceSVG,
  [NotificationBigStatus.WarningAlarm]: AttentionInterfaceSVG,
  [NotificationBigStatus.Error]: CircleCancelFilledInterfaceSVG,
  [NotificationBigStatus.ErrorAlarm]: CircleCancelFilledInterfaceSVG,
};
