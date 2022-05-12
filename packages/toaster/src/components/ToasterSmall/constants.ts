import { PredefinedIconsPrivate } from '@sbercloud/uikit-react-predefined-icons-private';

export enum ToasterSmallStatus {
  Success = 'Success',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

export const ICON_STATUS_TYPE = {
  [ToasterSmallStatus.Success]: PredefinedIconsPrivate.icons.Success,
  [ToasterSmallStatus.Error]: PredefinedIconsPrivate.icons.Failed,
  [ToasterSmallStatus.Loading]: PredefinedIconsPrivate.icons.Loading,
};
