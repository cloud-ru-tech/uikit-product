import { useEffect, useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { toast as RtToast } from 'react-toastify';

import { ToasterContainer } from '../components/ToasterContainer';
import { ToastStatuses } from './constants';
import { getToastComponent, getToastContainer } from './helpers';
import { OpenToast, ToastType, UpdateToast } from './types';

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

  const openToast: OpenToast = ({ type, toastProps, containerProps, toastOptions }) => {
    const { toastContainer, toastContainerProps } = getToastContainer({
      type,
      toastParent,
      toastRoot,
      containerProps,
    });

    const { toasterComponent, options } = getToastComponent({
      type,
      toastProps,
      toastOptions,
      containerId: toastContainerProps.containerId,
    });

    return new Promise(resolve => {
      render(<ToasterContainer {...toastContainerProps} />, toastContainer, () => {
        setTimeout(() => {
          resolve(RtToast(toasterComponent, options));
        }, 0);
      });
    });
  };

  const updateToast: UpdateToast = (id, { type, toastProps, toastOptions, containerId }) => {
    const { toasterComponent, options } = getToastComponent({ type, toastProps, toastOptions, containerId });

    return RtToast.update(id, {
      ...options,
      render: toasterComponent,
    });
  };

  return {
    openToast,
    updateToast,
    dismissToast: RtToast.dismiss,
    isToastActive: RtToast.isActive,
    types: ToastType,
    statuses: ToastStatuses,
  };
}

useToast.types = ToastType;
useToast.statuses = ToastStatuses;
