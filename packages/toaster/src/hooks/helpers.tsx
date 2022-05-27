import { MutableRefObject } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { ToasterBig, ToasterBigProps } from '../components/ToasterBig';
import { ToasterContainerProps } from '../components/ToasterContainer';
import { ToasterSmall, ToasterSmallProps } from '../components/ToasterSmall';
import { DEFAULT_AUTO_CLOSE, TOAST_CONTAINER_DEFAULT_PROPS, TOAST_ROOT_ID } from './constants';
import { ToastOptions, ToastPropsMap, ToastRoot, ToastType } from './types';

export function getToastContainer({
  type,
  toastRoot,
  toastParent,
  containerProps,
}: {
  type: ToastType;
  toastRoot: MutableRefObject<ToastRoot>;
  toastParent: HTMLElement;
  containerProps?: ToasterContainerProps;
}) {
  const containerId = containerProps?.containerId || `toast-container__${type}`;

  const toastContainerProps = {
    ...TOAST_CONTAINER_DEFAULT_PROPS[type],
    ...(containerProps || {}),
    containerId,
  };

  if (!toastRoot.current) {
    const toastRootId = `${TOAST_ROOT_ID}__${type}`;

    const rootInDOM = toastParent.querySelector(`#${toastRootId}`);

    if (rootInDOM) {
      toastRoot.current = rootInDOM;
    } else {
      toastRoot.current = document.createElement('div');
      toastRoot.current.id = toastRootId;
      toastParent.appendChild(toastRoot.current);
    }
  }

  return {
    toastContainer: toastRoot.current,
    toastContainerProps,
  };
}

export const getToastComponent = <T extends keyof ToastPropsMap>({
  type,
  toastProps,
  toastOptions,
  containerId: containerIdProp,
}: {
  type: T;
  toastProps: ToastPropsMap[T];
  toastOptions?: ToastOptions;
  containerId?: ToasterContainerProps['containerId'];
}) => {
  const containerId = containerIdProp || `toast-container__${type}`;

  const options: RtToastOptions = {
    toastId: toastOptions?.id,
    onClose: toastOptions?.onClose,
    autoClose: toastOptions?.autoClose ?? DEFAULT_AUTO_CLOSE,
    containerId,
  };

  let toasterComponent = type === ToastType.Small ? <ToasterSmall {...(toastProps as ToasterSmallProps)} /> : undefined;

  if (type === ToastType.Big) {
    const toasterBigProps = toastProps as ToasterBigProps;
    if (toasterBigProps.actions?.length) {
      options.autoClose = false;
    }

    toasterComponent = <ToasterBig {...toasterBigProps} />;
  }

  return { toasterComponent, options, containerId };
};
