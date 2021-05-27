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

export const toaster = (toastProps: ToasterProps, options: ToastOptions = {}): void => {
  rcToast(<Toaster {...toastProps} />, options);
};
