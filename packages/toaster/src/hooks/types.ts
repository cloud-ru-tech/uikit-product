import { ReactText } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { ToasterBigProps, ToasterContainerProps, ToasterSmallProps } from '../components';

type ToastOptions = {
  id?: RtToastOptions['toastId'];
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

type ToastProps = ToasterBigProps | ToasterSmallProps;

export enum ToastType {
  Big = 'Big',
  Small = 'Small',
}

export type OpenToast = (args: {
  type: ToastType;
  toastProps: ToastProps;
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
}) => Promise<ReactText | undefined>;
