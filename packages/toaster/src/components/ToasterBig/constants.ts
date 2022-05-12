import {
  AttentionInterfaceSVG,
  CircleCancelFilledInterfaceSVG,
  CircleCheckFilledInterfaceSVG,
  InfoInterfaceSVG,
} from '@sbercloud/uikit-react-icons';

export enum ToasterBigStatus {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  WarningCritical = 'WarningCritical',
  WarningAlarm = 'WarningAlarm',
  Error = 'Error',
  ErrorAlarm = 'ErrorAlarm',
}

export enum ToasterBigVariant {
  Info = 'Info',
  Alarm = 'Alarm',
}

export const ICONS_BY_STATUS = {
  [ToasterBigStatus.Info]: InfoInterfaceSVG,
  [ToasterBigStatus.Success]: CircleCheckFilledInterfaceSVG,
  [ToasterBigStatus.Warning]: AttentionInterfaceSVG,
  [ToasterBigStatus.WarningCritical]: AttentionInterfaceSVG,
  [ToasterBigStatus.WarningAlarm]: AttentionInterfaceSVG,
  [ToasterBigStatus.Error]: CircleCancelFilledInterfaceSVG,
  [ToasterBigStatus.ErrorAlarm]: CircleCancelFilledInterfaceSVG,
};
