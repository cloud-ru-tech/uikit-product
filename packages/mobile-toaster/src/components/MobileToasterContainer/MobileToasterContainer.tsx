import './style.css';

import cn from 'classnames';
import { MouseEvent, useState } from 'react';
import {
  DraggableDirection,
  toast,
  ToastContainerProps as RtToastContainerProps,
  ToastItem,
  ToastPosition,
} from 'react-toastify';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { useLayoutEffect } from '@snack-uikit/utils';

import { TOASTER_CONTAINER_PREFIX, TOASTER_TYPE } from '../../constants';
import { useStackedToastsContext } from '../../contexts/StackedToastsContext';
import { CustomToastContainer } from '../../helperComponents/CustomToastContainer';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../../testIds';
import { ToasterType } from '../../types';
import styles from './styles.module.scss';

export type MobileToasterContainerProps = {
  position?: ToastPosition;
  limit?: number;
  stacked?: boolean;
  draggable?: boolean;
  draggableDirection?: DraggableDirection;
  containerId?: RtToastContainerProps['containerId'];
  displayCloseAllButton?: boolean;
  type?: ToasterType;
};

export function MobileToasterContainer({
  position = 'bottom-right',
  stacked = false,
  draggable = false,
  draggableDirection = 'x',
  limit,
  containerId,
  displayCloseAllButton,
  type = TOASTER_TYPE.SystemEvent,
}: MobileToasterContainerProps) {
  const { languageCode } = useLanguage();
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isCloseAllButtonHidden, setIsCloseAllButtonHidden] = useState(false);
  const { collapsed, setCollapsed } = useStackedToastsContext();

  const defaultLimit = !stacked && !limit ? 5 : limit;

  const closeAll = () => {
    toast.dismiss();
    setIsCloseAllButtonHidden(true);
    setCollapsed(true);
  };

  const showLess = (e: MouseEvent) => {
    e.stopPropagation();
    if (stacked) {
      if (!collapsed) {
        toast.play();
      } else {
        toast.pause();
      }

      setCollapsed(!collapsed);
    }
  };

  useLayoutEffect(() => {
    const unsubscribe = toast.onChange(({ status, containerId }: ToastItem) => {
      if (containerId === `${TOASTER_CONTAINER_PREFIX}${TOASTER_TYPE.SystemEvent}`) {
        if (status === 'added') {
          setIsCloseAllButtonHidden(false);
          setNotificationCounter(prev => prev + 1);
        }
        if (status === 'removed') {
          setNotificationCounter(prev => {
            if (prev === 1) {
              setCollapsed(true);
            }

            return prev - 1;
          });
        }
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasCloseButtons = displayCloseAllButton && notificationCounter > 1 && !isCloseAllButtonHidden;
  return (
    <>
      {hasCloseButtons && (
        <div className={cn(styles.buttonCloseColumnWrapper, styles[position])}>
          <button
            type='button'
            className={styles.buttonShowLess}
            onClick={showLess}
            data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.buttonShowLessColumn}
          >
            {textProvider(languageCode, collapsed ? Texts.ShowMore : Texts.ShowLess)}
          </button>
          <button
            type='button'
            className={styles.buttonCloseColumn}
            onClick={closeAll}
            data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn}
          >
            {textProvider(languageCode, Texts.CloseAll)}
          </button>
        </div>
      )}
      <CustomToastContainer
        hideProgressBar
        closeOnClick={false}
        autoClose={false}
        closeButton={false}
        draggable={draggable}
        draggableDirection={draggableDirection}
        className={cn('osThemeSnack', styles[position], {
          [styles.containerWithCloseAllButton]: hasCloseButtons,
          'osThemeSnack__toast-container__system-event': type === TOASTER_TYPE.SystemEvent,
          'osThemeSnack__toast-container__user-action': type === TOASTER_TYPE.UserAction,
        })}
        toastClassName={styles.toaster}
        bodyClassName={styles.toaster}
        position={position}
        limit={defaultLimit}
        containerId={containerId}
        stacked={stacked}
      />

      <div
        className={cn('osThemeSnack', styles[position], {
          [styles.containerWithCloseAllButton]: hasCloseButtons,
          'osThemeSnack__toast-container__system-event': type === TOASTER_TYPE.SystemEvent,
          'osThemeSnack__toast-container__user-action': type === TOASTER_TYPE.UserAction,
        })}
      ></div>
    </>
  );
}
