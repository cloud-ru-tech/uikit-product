import { cx } from '@linaria/core';
import { useEffect, useState } from 'react';
import {
  toast,
  ToastContainer as RtToastContainer,
  ToastContainerProps as RtToastContainerProps,
  ToastItem,
  ToastPosition,
} from 'react-toastify';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../texts-provider';
import * as S from './styled';

export type NotificationContainerProps = {
  position?: ToastPosition;
  limit?: number;
  containerId?: RtToastContainerProps['containerId'];
  displayCloseAllButton?: boolean;
};

export function NotificationContainer({
  position = toast.POSITION.BOTTOM_RIGHT,
  limit = 5,
  containerId,
  displayCloseAllButton,
}: NotificationContainerProps) {
  const { languageCode } = useLanguage();
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isCloseAllButtonHidden, setIsCloseAllButtonHidden] = useState(false);
  const closeAll = () => {
    toast.dismiss();
    setIsCloseAllButtonHidden(true);
  };

  useEffect(() => {
    const unsubscribe = toast.onChange((payload: ToastItem) => {
      const { status } = payload;
      if (status === 'added') {
        setIsCloseAllButtonHidden(false);
        setNotificationCounter(prev => prev + 1);
      }
      if (status === 'removed') {
        setNotificationCounter(prev => prev - 1);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const hasCloseAllButton = displayCloseAllButton && notificationCounter > 2 && !isCloseAllButtonHidden;

  return (
    <>
      <RtToastContainer
        hideProgressBar
        closeOnClick={false}
        autoClose={false}
        closeButton={false}
        draggable={false}
        className={cx(S.notificationContainerClassName, position)}
        style={{ marginBottom: `${hasCloseAllButton ? '32px' : '0px'}` }}
        toastClassName={S.notificationClassName}
        bodyClassName={S.notificationBodyClassName}
        position={position}
        limit={limit}
        containerId={containerId}
        enableMultiContainer={Boolean(containerId)}
      />
      {hasCloseAllButton && (
        <button className={cx(S.clearAllContainerClassName, position)} onClick={closeAll}>
          {textProvider(languageCode, Texts.CloseAllButton)}
        </button>
      )}
    </>
  );
}

NotificationContainer.position = toast.POSITION;
