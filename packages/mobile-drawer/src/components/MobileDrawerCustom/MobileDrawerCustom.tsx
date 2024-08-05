import 'rc-drawer/assets/index.css';

import cn from 'classnames';
import RcDrawer from 'rc-drawer';
import { PropsWithChildren } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { POSITION, SIZE, SIZE_AS_VALUES } from '../../constants';
import { Mode, Position, Size } from '../../types';
import { motionProps } from './constants';
import { useSwipeProps } from './hooks';
import styles from './styles.module.scss';

export type MobileDrawerCustomProps = WithSupportProps<
  PropsWithChildren<{
    /** Управление состоянием показан/не показан. */
    open: boolean;
    /** Колбэк закрытия */
    onClose(): void;
    /** Режим отображения */
    mode?: Mode;
    /** Расположение открытого Drawer */
    position?: Position;
    /** CSS-класс для элемента с контентом */
    className?: string;
    /** CSS-класс для корневого элемента */
    rootClassName?: string;
    /** Размер */
    size?: Size | string | number;
    /** Контейнер в котором будет рендерится Drawer. По-умолчанию - body */
    container?: string | HTMLElement;
    /** Есть ли радиус у дровера */
    hasBorderRadius?: boolean;
    /** Работает ли закрытие на свайп */
    swipeEnabled?: boolean;
  }>
>;

export function MobileDrawerCustom({
  open: openProp,
  position = POSITION.Left,
  onClose,
  rootClassName,
  className,
  size = SIZE.S,
  container,
  children,
  hasBorderRadius = false,
  swipeEnabled = true,
  ...rest
}: MobileDrawerCustomProps) {
  const isPredefinedSize = typeof size === 'string' && SIZE_AS_VALUES.includes(size);
  const [open, setOpen] = useUncontrolledProp(openProp, false);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const { swipeRef, drawerStyles, maskStyles, drawerMotionProps, swipeProps, showPointer } = useSwipeProps({
    position,
    onClose: handleClose,
    enabled: swipeEnabled,
  });

  return (
    <RcDrawer
      mask={true}
      maskClosable={true}
      keyboard={true}
      maskClassName={styles.mask}
      {...{
        width: !isPredefinedSize && (position === POSITION.Right || position === POSITION.Left) ? size : 'null',
        height: !isPredefinedSize && (position === POSITION.Top || position === POSITION.Bottom) ? size : 'null',
      }}
      open={open}
      placement={position}
      destroyOnClose={true}
      push={false}
      afterOpenChange={setOpen}
      onClose={handleClose}
      getContainer={container}
      className={styles.drawer}
      rootClassName={cn(styles.drawerRoot, rootClassName)}
      {...extractSupportProps(rest)}
      data-content-wrapper={true}
      data-border-radius={hasBorderRadius || undefined}
      data-size={isPredefinedSize ? size : undefined}
      data-mode='regular'
      data-position={position}
      contentWrapperStyle={drawerStyles}
      maskStyle={maskStyles}
      motion={{
        ...(typeof motionProps.motion === 'function' ? motionProps.motion(position) : motionProps.motion),
        ...drawerMotionProps,
      }}
      maskMotion={motionProps.maskMotion}
    >
      <div
        className={cn(className, styles.content)}
        {...swipeProps}
        ref={swipeRef}
        data-pointers={showPointer || undefined}
      >
        <div className={styles.swiper} data-position={position} />

        {children}
      </div>
    </RcDrawer>
  );
}
