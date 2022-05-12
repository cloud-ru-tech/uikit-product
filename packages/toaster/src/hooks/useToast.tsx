import { useEffect, useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { toast as RtToast, ToastOptions as RtToastOptions } from 'react-toastify';

import { ToasterBigProps, ToasterSmallProps } from '../components';
import { ToasterBig } from '../components/ToasterBig';
import { ToasterContainer } from '../components/ToasterContainer';
import { ToasterSmall } from '../components/ToasterSmall';
import { DEFAULT_AUTO_CLOSE, TOAST_CONTAINER_DEFAULT_PROPS, ToastStatuses } from './constants';
import { OpenToast, ToastType } from './types';

const TOAST_ROOT_ID = 'toast-root';
const toastParent = document.body;

export function useToast() {
  const toastRoot = useRef<HTMLDivElement | Element>();

  useEffect(
    () => () => {
      if (toastRoot.current) {
        unmountComponentAtNode(toastRoot.current);
        toastParent.removeChild(toastRoot.current);
        toastRoot.current = undefined;
      }
    },
    [],
  );

  const getToastContainer = (type: ToastType) => {
    if (toastRoot.current) return toastRoot.current;

    const toastRootId = `${TOAST_ROOT_ID}__${type}`;

    const rootInDOM = toastParent.querySelector(`#${toastRootId}`);

    if (rootInDOM) {
      toastRoot.current = rootInDOM;
    } else {
      toastRoot.current = document.createElement('div');
      toastRoot.current.id = toastRootId;
      toastParent.appendChild(toastRoot.current);
    }

    return toastRoot.current;
  };

  const openToast: OpenToast = ({ type, toastProps, containerProps, toastOptions }) => {
    const toastContainerDiv = getToastContainer(type);
    const containerId = containerProps?.containerId || `toast-container__${type}`;

    const toastContainerProps = {
      ...TOAST_CONTAINER_DEFAULT_PROPS[type],
      ...(containerProps || {}),
      containerId,
    };

    const options: RtToastOptions = {
      toastId: toastOptions?.id,
      onClose: toastOptions?.onClose,
      autoClose: toastOptions?.autoClose || DEFAULT_AUTO_CLOSE,
      containerId,
    };

    let toasterComponent =
      type === ToastType.Small ? <ToasterSmall {...(toastProps as ToasterSmallProps)} /> : undefined;

    if (type === ToastType.Big) {
      const toasterBigProps = toastProps as ToasterBigProps;
      if (toasterBigProps.actions?.length) {
        options.autoClose = false;
      }

      toasterComponent = <ToasterBig {...toasterBigProps} />;
    }

    return new Promise(resolve => {
      render(<ToasterContainer {...toastContainerProps} />, toastContainerDiv, () => {
        setTimeout(() => {
          resolve(RtToast(toasterComponent, options));
        }, 0);
      });
    });
  };

  return {
    openToast,
    updateToast: RtToast.update,
    dismissToast: RtToast.dismiss,
    isToastActive: RtToast.isActive,
    types: ToastType,
    statuses: ToastStatuses,
  };
}

useToast.types = ToastType;
useToast.statuses = ToastStatuses;
