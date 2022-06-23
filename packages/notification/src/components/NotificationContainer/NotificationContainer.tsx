import { cx } from '@linaria/core';
import {
  ToastContainer as RtToastContainer,
  ToastContainerProps as RtToastContainerProps,
  ToastPosition,
  toast,
} from 'react-toastify';

import * as S from './styled';

export type NotificationContainerProps = {
  position?: ToastPosition;
  limit?: number;
  containerId?: RtToastContainerProps['containerId'];
};

export function NotificationContainer({
  position = toast.POSITION.BOTTOM_RIGHT,
  limit = 5,
  containerId,
}: NotificationContainerProps) {
  return (
    <RtToastContainer
      hideProgressBar
      closeOnClick={false}
      autoClose={false}
      closeButton={false}
      draggable={false}
      className={cx(S.notificationContainerClassName, position)}
      toastClassName={S.notificationClassName}
      bodyClassName={S.notificationBodyClassName}
      position={position}
      limit={limit}
      containerId={containerId}
      enableMultiContainer={Boolean(containerId)}
    />
  );
}

NotificationContainer.position = toast.POSITION;
