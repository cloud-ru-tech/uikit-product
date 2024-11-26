// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';
import { Id, toast, ToastOptions as RtToastOptions } from 'react-toastify';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { toaster } from '@snack-uikit/toaster';
import { isBrowser } from '@snack-uikit/utils';

import {
  MobileToasterContainer,
  MobileToasterContainerProps,
  MobileToastSystemEvent,
  MobileToastSystemEventProps,
  MobileToastUserAction,
  MobileToastUserActionProps,
} from './components';
import {
  AUTO_CLOSE_TIME,
  TOASTER_CONTAINER_DEFAULT_PROPS,
  TOASTER_CONTAINER_PREFIX,
  TOASTER_ROOT_ID,
  TOASTER_TYPE,
} from './constants';
import { StackedToastsProvider } from './contexts';
import {
  OpenToast,
  SystemEventOptions,
  Toaster,
  ToasterId,
  ToasterPropsMap,
  ToasterType,
  ToastOptions,
  UpdateToast,
  UserActionOptions,
} from './types';

function getMobileToasterContainer({
  type,
  toasterParent,
  containerProps,
}: {
  type: ToasterType;
  toasterParent?: HTMLElement;
  containerProps?: MobileToasterContainerProps;
}) {
  const containerId = containerProps?.containerId || `${TOASTER_CONTAINER_PREFIX}${type}`;

  const toasterContainerProps = {
    ...TOASTER_CONTAINER_DEFAULT_PROPS[type],
    ...(containerProps || {}),
    containerId,
  };

  const toasterRootId = `${TOASTER_ROOT_ID}__${type}`;

  let rootInDOM = toasterParent ? toasterParent.querySelector(`#${toasterRootId}`) : null;

  if (!rootInDOM && toasterParent && isBrowser()) {
    rootInDOM = document.createElement('div');
    rootInDOM.id = toasterRootId;
    toasterParent.appendChild(rootInDOM);
  }

  return {
    toasterContainer: rootInDOM,
    toasterContainerProps,
  };
}

function getToastOptions<T extends keyof ToasterPropsMap>({
  type,
  toastOptions,
  containerId,
  toasterProps,
}: {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  toastOptions?: ToastOptions;
  containerId?: MobileToasterContainerProps['containerId'];
}): RtToastOptions {
  return {
    toastId: toastOptions?.id,
    onClose: ((data: { id: ToasterId }) => {
      toastOptions?.onClose?.(data?.id);
    }) as RtToastOptions['onClose'],
    autoClose: toasterProps?.loading ? false : AUTO_CLOSE_TIME[type],
    containerId: containerId || `${TOASTER_CONTAINER_PREFIX}${type}`,
  };
}

function getToastComponent<T extends keyof ToasterPropsMap>({
  type,
  toasterProps,
}: {
  type: T;
  toasterProps: ToasterPropsMap[T];
}) {
  switch (type) {
    case TOASTER_TYPE.UserAction:
      return <MobileToastUserAction {...(toasterProps as MobileToastUserActionProps)} />;
    case TOASTER_TYPE.SystemEvent:
      return <MobileToastSystemEvent {...(toasterProps as MobileToastSystemEventProps)} />;
    default:
      return undefined;
  }
}

export const openMobileToast: OpenToast = ({
  type,
  toasterProps,
  containerProps,
  toastOptions,
  toasterParent = isBrowser() ? document.body : undefined,
}) => {
  const { toasterContainer, toasterContainerProps } = getMobileToasterContainer({
    type,
    toasterParent,
    containerProps,
  });

  const options = getToastOptions({
    type,
    toasterProps,
    toastOptions,
    containerId: toasterContainerProps.containerId,
  });

  const toasterComponent = getToastComponent({
    type,
    toasterProps,
  });

  return new Promise(resolve => {
    render(
      <StackedToastsProvider>
        <MobileToasterContainer {...toasterContainerProps} />
      </StackedToastsProvider>,
      toasterContainer,
      () => {
        setTimeout(() => {
          resolve(toast(toasterComponent, options));
        }, 0);
      },
    );
  });
};

export const updateMobileToast: UpdateToast = (id, { type, toasterProps, toastOptions, containerId }) => {
  const options = getToastOptions({ type, toasterProps, toastOptions, containerId });

  const toastComponent = getToastComponent({
    type,
    toasterProps,
  });

  return toast.update(id, {
    ...options,
    render: toastComponent,
  });
};

export const dismissMobileToast = (params?: Id) => toast.dismiss(params);
export const isToastActive = toast.isActive;

const userAction = {
  success(options: UserActionOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'success' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  neutral(options: UserActionOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'neutral' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  error(options: UserActionOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'error' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  warning(options: UserActionOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'warning' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  update: {
    success(id: ToasterId, options: UserActionOptions) {
      updateMobileToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'success' },
      });
    },

    neutral(id: ToasterId, options: UserActionOptions) {
      updateMobileToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'neutral' },
      });
    },

    warning(id: ToasterId, options: UserActionOptions) {
      updateMobileToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'warning' },
      });
    },

    error(id: ToasterId, options: UserActionOptions) {
      updateMobileToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'error' },
      });
    },
  },

  dismiss(id?: ToasterId) {
    return toast.dismiss(id);
  },
};

const systemEvent = {
  success(options: SystemEventOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'success' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  neutral(options: SystemEventOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'neutral' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  warning(options: SystemEventOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'warning' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  error(options: SystemEventOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'error' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  errorCritical(options: SystemEventOptions) {
    return openMobileToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'errorCritical' },
      toastOptions: {
        id: options.id,
        onClose: options.onClose,
      },
    });
  },

  update: {
    success(id: ToasterId, options: SystemEventOptions) {
      return updateMobileToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'success' },
      });
    },

    neutral(id: ToasterId, options: SystemEventOptions) {
      return updateMobileToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'neutral' },
      });
    },

    warning(id: ToasterId, options: SystemEventOptions) {
      return updateMobileToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'warning' },
      });
    },

    error(id: ToasterId, options: SystemEventOptions) {
      return updateMobileToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'error' },
      });
    },

    errorCritical(id: ToasterId, options: SystemEventOptions) {
      return updateMobileToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'errorCritical' },
      });
    },
  },

  dismiss(id?: ToasterId) {
    return toast.dismiss(id);
  },
};

export const mobileToaster: Toaster = {
  userAction,
  systemEvent,
};

export function adaptiveToaster({ layoutType }: WithLayoutType<void>): Toaster {
  const isMobile = layoutType === 'mobile';

  return isMobile ? mobileToaster : toaster;
}
