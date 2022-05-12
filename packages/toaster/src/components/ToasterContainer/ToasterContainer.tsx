import { cx } from '@linaria/core';
import {
  ToastContainer as RtToastContainer,
  ToastContainerProps as RtToastContainerProps,
  ToastPosition,
  toast,
} from 'react-toastify';

import * as S from './styled';

export type ToasterContainerProps = {
  position?: ToastPosition;
  limit?: number;
  containerId?: RtToastContainerProps['containerId'];
};

export function ToasterContainer({
  position = toast.POSITION.BOTTOM_RIGHT,
  limit = 5,
  containerId,
}: ToasterContainerProps) {
  return (
    <RtToastContainer
      hideProgressBar
      closeOnClick={false}
      autoClose={false}
      closeButton={false}
      draggable={false}
      className={cx(S.toastContainerClassName, position)}
      toastClassName={S.toastClassName}
      bodyClassName={S.toastBodyClassName}
      position={position}
      limit={limit}
      containerId={containerId}
      enableMultiContainer={Boolean(containerId)}
    />
  );
}

ToasterContainer.position = toast.POSITION;
