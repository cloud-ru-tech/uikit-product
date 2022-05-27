import { ReactText } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { ToasterBigProps, ToasterContainerProps, ToasterSmallProps } from '../components';

export type ToastRoot = HTMLDivElement | Element | undefined;

export type ToastOptions = {
  id?: RtToastOptions['toastId'];
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

export enum ToastType {
  Big = 'Big',
  Small = 'Small',
}

export type ToastPropsMap = {
  [ToastType.Small]: ToasterSmallProps;
  [ToastType.Big]: ToasterBigProps;
};

export type OpenToast = <T extends keyof ToastPropsMap>({
  type,
  toastProps,
  containerProps,
  toastOptions,
}: {
  type: T;
  toastProps: ToastPropsMap[T];
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
}) => Promise<ReactText | undefined>;

export type UpdateToast = <T extends keyof ToastPropsMap>(
  id: string | number,
  {
    type,
    toastProps,
    toastOptions,
    containerId,
  }: {
    type: T;
    toastProps: ToastPropsMap[T];
    toastOptions?: ToastOptions;
    containerId?: ToasterContainerProps['containerId'];
  },
) => void;
