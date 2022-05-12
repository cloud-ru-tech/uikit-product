import { ToasterBig } from '../components/ToasterBig';
import { ToasterContainer, ToasterContainerProps } from '../components/ToasterContainer';
import { ToasterSmall } from '../components/ToasterSmall';
import { ToastType } from './types';

export const ToastStatuses = {
  [ToastType.Big]: ToasterBig.statuses,
  [ToastType.Small]: ToasterSmall.statuses,
};

export const TOAST_CONTAINER_DEFAULT_PROPS: Record<ToastType, ToasterContainerProps> = {
  [ToastType.Big]: {
    limit: 5,
    position: ToasterContainer.position.BOTTOM_RIGHT,
  },
  [ToastType.Small]: {
    limit: 1,
    position: ToasterContainer.position.BOTTOM_CENTER,
  },
};

export const DEFAULT_AUTO_CLOSE = 5000;
