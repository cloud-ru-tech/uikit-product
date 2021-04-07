import {
  toast as rcToast,
  ToastContainer as RCToastContainer,
  ToastContainerProps,
  ToastOptions,
} from 'react-toastify';

import { Toast, ToastProps } from '../../helperComponents/Toast';

import {
  toastClassName,
  toastContainerClassName,
  toastBodyClassName,
} from './styled';

import 'react-toastify/dist/ReactToastify.css';

export type { ToastOptions };

export const ToastContainer: React.FC<ToastContainerProps> = props => (
  <RCToastContainer
    hideProgressBar
    closeOnClick
    autoClose={false}
    closeButton={false}
    draggable={false}
    className={toastContainerClassName}
    toastClassName={toastClassName}
    bodyClassName={toastBodyClassName}
    {...props}
  />
);

export const toast = (
  toastProps: ToastProps,
  options: ToastOptions = {},
): void => {
  rcToast(<Toast {...toastProps} />, {
    closeOnClick: !Array.isArray(toastProps.actions),
    ...options,
  });
};
