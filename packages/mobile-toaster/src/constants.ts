import { MobileToasterContainerProps } from './components';
import { ToasterType } from './types';

export const TOASTER_TYPE = {
  SystemEvent: 'system-event',
  UserAction: 'user-action',
  Upload: 'upload',
} as const;

export const TOASTER_CONTAINER_DEFAULT_PROPS: Record<ToasterType, MobileToasterContainerProps> = {
  [TOASTER_TYPE.SystemEvent]: {
    position: 'top-center',
    displayCloseAllButton: true,
    type: TOASTER_TYPE.SystemEvent,
    stacked: true,
    draggable: false,
    draggableDirection: 'x',
  },
  [TOASTER_TYPE.UserAction]: {
    limit: 2,
    position: 'bottom-center',
    displayCloseAllButton: false,
    type: TOASTER_TYPE.UserAction,
  },
  [TOASTER_TYPE.Upload]: {
    limit: 1,
    position: 'bottom-right',
    displayCloseAllButton: true,
    type: TOASTER_TYPE.SystemEvent,
  },
};

export const AUTO_CLOSE_TIME: Record<ToasterType, number | false> = {
  [TOASTER_TYPE.SystemEvent]: 5000,
  [TOASTER_TYPE.UserAction]: 2000,
  [TOASTER_TYPE.Upload]: false,
};

export const TOASTER_ROOT_ID = 'toaster-root';
export const TOASTER_CONTAINER_PREFIX = 'toaster-container__';
