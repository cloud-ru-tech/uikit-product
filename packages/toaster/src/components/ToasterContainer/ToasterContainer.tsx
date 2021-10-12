import 'react-toastify/dist/ReactToastify.css';

import {
  ToastContainer as RCToastContainer,
  ToastContainerProps,
  ToastOptions,
  toast as rcToast,
} from 'react-toastify';

import { Toaster, ToasterProps, Variants } from '../Toaster';
import { toastBodyClassName, toastClassName, toastContainerClassName } from './styled';

export type { ToastOptions, ToasterProps };

export function ToasterContainer(props: ToastContainerProps) {
  return (
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
}

ToasterContainer.variants = Variants;

export const dismissToast = rcToast.dismiss;
export const updateToast = rcToast.update;
export const isActiveToast = rcToast.isActive;

export const customToast = (node: React.ReactNode, options: ToastOptions = {}) => rcToast(node, options);
export const toaster = (toastProps: ToasterProps, options: ToastOptions = {}) =>
  rcToast(<Toaster {...toastProps} />, options);

toaster.variants = Variants;
