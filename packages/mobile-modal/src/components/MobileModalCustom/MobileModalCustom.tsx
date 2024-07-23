import { ReactNode } from 'react';

import { MobileDrawerCustom } from '@sbercloud/uikit-product-mobile-drawer';
import { WithSupportProps } from '@snack-uikit/utils';

import { SIZE } from '../../constants';
import {
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
} from '../../helperComponents';
import { Size } from '../../types';

export type MobileModalCustomProps = WithSupportProps<{
  /** Управляет состоянием показан/не показан. */
  open: boolean;
  /** Колбек закрытия компонента. */
  onClose(): void;
  /**
   * Режим отображения модального окна:
   * <br> - __`Regular`__ -  есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку
   * <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc`
   * <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части
   * @default Mode.Regular
   */
  // mode?: Mode;
  /**
   * Размер модального окна
   * @default Size.Auto
   */
  size?: Size;
  /** CSS-класс */
  className?: string;
  /** Контент */
  children: ReactNode;
}>;

export function MobileModalCustom({ size = SIZE.Auto, ...rest }: MobileModalCustomProps) {
  return (
    <MobileDrawerCustom
      {...rest}
      size={size === SIZE.Auto ? 'auto' : '100%'}
      hasBorderRadius={true}
      position='bottom'
    />
  );
}

export namespace MobileModalCustom {
  export type HeaderProps = ModalHeaderProps;
  export type BodyProps = ModalBodyProps;
  export type FooterProps = ModalFooterProps;
  export const Header = ModalHeader;
  export const Body = ModalBody;
  export const Footer = ModalFooter;
}
