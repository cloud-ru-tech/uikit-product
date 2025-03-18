import { Id, ToastOptions as RtToastOptions } from 'react-toastify';

import { ToastUploadProps } from '@snack-uikit/toaster';
import { ValueOf } from '@snack-uikit/utils';

import { MobileToasterContainerProps, MobileToastSystemEventProps, MobileToastUserActionProps } from './components';
import { TOASTER_TYPE } from './constants';

export type ToasterId = Id;
export type PromisedId = Promise<ToasterId>;

export type ToastOptions = {
  id?: ToasterId;
  autoClose?: RtToastOptions['autoClose'];
  onClose?(id?: ToasterId): void;
};

export type ToasterType = ValueOf<typeof TOASTER_TYPE>;

export type ToasterPropsMap = {
  [TOASTER_TYPE.UserAction]: MobileToastUserActionProps;
  [TOASTER_TYPE.SystemEvent]: MobileToastSystemEventProps;
  [TOASTER_TYPE.Upload]: ToastUploadProps & { loading?: boolean };
};

type OpenNotificationProps<T extends keyof ToasterPropsMap> = {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  containerProps?: MobileToasterContainerProps;
  toastOptions?: ToastOptions;
  toasterParent?: HTMLDivElement;
};

type DefaultToasterProps<T extends keyof ToasterPropsMap> = {
  toasterProps: ToasterPropsMap[T];
};

export type OpenToast = <T extends keyof ToasterPropsMap>(
  props: DefaultToasterProps<T> & OpenNotificationProps<T>,
) => PromisedId;

export type UpdateToast = <T extends keyof ToasterPropsMap>(
  id: string | number,
  props: {
    type: T;
    toasterProps: ToasterPropsMap[T];
    toastOptions?: ToastOptions;
    containerId?: MobileToasterContainerProps['containerId'];
  },
) => void;

export type UserActionOptions = Omit<MobileToastUserActionProps, 'appearance'> & Pick<ToastOptions, 'id' | 'onClose'>;
export type SystemEventOptions = Omit<MobileToastSystemEventProps, 'appearance'> & Pick<ToastOptions, 'id' | 'onClose'>;
export type UploadOptions = ToastUploadProps & Pick<ToastOptions, 'id' | 'onClose'>;

export type Toaster = {
  userAction: {
    success(options: UserActionOptions): PromisedId;
    neutral(options: UserActionOptions): PromisedId;
    warning(options: UserActionOptions): PromisedId;
    error(options: UserActionOptions): PromisedId;
    update: {
      success(id: ToasterId, options: UserActionOptions): void;
      neutral(id: ToasterId, options: UserActionOptions): void;
      warning(id: ToasterId, options: UserActionOptions): void;
      error(id: ToasterId, options: UserActionOptions): void;
    };
    dismiss(id?: ToasterId): void;
  };
  systemEvent: {
    success(options: SystemEventOptions): PromisedId;
    neutral(options: SystemEventOptions): PromisedId;
    warning(options: SystemEventOptions): PromisedId;
    error(options: SystemEventOptions): PromisedId;
    errorCritical(options: SystemEventOptions): PromisedId;
    update: {
      success(id: ToasterId, options: SystemEventOptions): void;
      neutral(id: ToasterId, options: SystemEventOptions): void;
      warning(id: ToasterId, options: SystemEventOptions): void;
      error(id: ToasterId, options: SystemEventOptions): void;
      errorCritical(id: ToasterId, options: SystemEventOptions): void;
    };
    dismiss(id?: ToasterId): void;
  };
  upload: {
    startOrUpdate(options: UploadOptions): void;
    dismiss(id?: ToasterId): void;
  };
};
