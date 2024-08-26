import 'rc-drawer/assets/index.css';

import cn from 'classnames';
import RcDrawer from 'rc-drawer';
import { PropsWithChildren, RefObject } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MODAL_MODE, POSITION, SIZE, SIZE_AS_VALUES } from '../../constants';
import {
  ButtonClose,
  DrawerBody,
  DrawerBodyProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
} from '../../helperComponents';
import { ModalMode, Mode, Position, Size } from '../../types';
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
    /**
     * Режим отображения для модального окна:
     * <br> - __`Regular`__ -  есть закрытие по свайпу, клик на оверлей и нажатие кнопки `Esc` закрывают модалку
     * <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc`
     * <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части
     * @default Mode.Regular
     */
    modalMode?: ModalMode;
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
    /** Показывать ли кнопку закрытия */
    closeButtonEnabled?: boolean;
    /** Ссылка на скроллящийся элемент дровера */
    scrollRef?: RefObject<HTMLElement>;
  }>
>;

function MobileDrawerCustomComponent({
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
  modalMode = MODAL_MODE.Regular,
  closeButtonEnabled = true,
  scrollRef,
  ...rest
}: MobileDrawerCustomProps) {
  const isPredefinedSize = typeof size === 'string' && SIZE_AS_VALUES.includes(size);
  const [open, setOpen] = useUncontrolledProp(openProp, false);
  const hasBlur = ([MODAL_MODE.Forced, MODAL_MODE.Aggressive] as ModalMode[]).includes(modalMode);
  const hasSwipe = ([MODAL_MODE.Regular, MODAL_MODE.Aggressive] as ModalMode[]).includes(modalMode);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const { swipeRef, drawerStyles, maskStyles, drawerMotionProps, swipeProps, showPointer } = useSwipeProps({
    position,
    onClose: handleClose,
    enabled: hasSwipe && swipeEnabled,
    scrollRef,
  });

  return (
    <RcDrawer
      mask={true}
      maskClosable={true}
      keyboard={true}
      maskClassName={cn(styles.mask, {
        [styles.maskBlur]: hasBlur,
      })}
      {...{
        width: !isPredefinedSize && (position === POSITION.Right || position === POSITION.Left) ? size : 'null',
        height: !isPredefinedSize && (position === POSITION.Top || position === POSITION.Bottom) ? size : 'null',
      }}
      open={open}
      placement={position}
      destroyOnClose={true}
      push={false}
      afterOpenChange={setOpen}
      onClose={modalMode === MODAL_MODE.Regular ? handleClose : undefined}
      getContainer={container}
      className={styles.drawer}
      rootClassName={cn(styles.drawerRoot, rootClassName, {
        [styles.drawerBlur]: hasBlur,
      })}
      {...extractSupportProps(rest)}
      data-content-wrapper={true}
      data-blur={hasBlur || undefined}
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
        {...(swipeEnabled && hasSwipe ? swipeProps : undefined)}
        ref={swipeRef}
        data-swipe={swipeEnabled || undefined}
        data-pointers={showPointer || undefined}
      >
        {swipeEnabled && <div className={styles.swiper} data-position={position} />}

        {children}

        {closeButtonEnabled && (
          <div className={styles.headerElements}>
            <ButtonClose onClick={onClose} />
          </div>
        )}
      </div>
    </RcDrawer>
  );
}

/** Компонент-конструктор */
export const MobileDrawerCustom = MobileDrawerCustomComponent as typeof MobileDrawerCustomComponent & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
};

MobileDrawerCustom.Header = DrawerHeader;
MobileDrawerCustom.Body = DrawerBody;
MobileDrawerCustom.Footer = DrawerFooter;

export namespace MobileDrawerCustom {
  export type HeaderProps = DrawerHeaderProps;
  export type BodyProps = DrawerBodyProps;
  export type FooterProps = DrawerFooterProps;
}
