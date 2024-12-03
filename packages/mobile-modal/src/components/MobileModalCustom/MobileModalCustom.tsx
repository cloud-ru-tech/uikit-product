import { MobileDrawerCustom, MobileDrawerCustomProps } from '@sbercloud/uikit-product-mobile-drawer';
import { WithSupportProps } from '@snack-uikit/utils';

import { MODE, SIZE } from '../../constants';
import {
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
} from '../../helperComponents';
import { Mode, Size } from '../../types';

export type MobileModalCustomProps = Pick<
  MobileDrawerCustomProps,
  'open' | 'onClose' | 'className' | 'children' | 'swipeEnabled' | 'closeButtonEnabled'
> &
  WithSupportProps<{
    /**
     * Режим отображения модального окна:
     * <br> - __`Regular`__ -  есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку
     * <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc`
     * <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части
     * @default Mode.Regular
     */
    mode?: Mode;
    /**
     * Размер модального окна
     * @default Size.Auto
     */
    size?: Size;
  }>;

export function MobileModalCustom({
  size = SIZE.Auto,
  mode = MODE.Regular,
  swipeEnabled = true,
  closeButtonEnabled = false,
  ...rest
}: MobileModalCustomProps) {
  return (
    <MobileDrawerCustom
      {...rest}
      modalMode={mode}
      size={size === SIZE.Auto ? 'auto' : '100%'}
      hasBorderRadius={true}
      position='bottom'
      swipeEnabled={swipeEnabled}
      closeButtonEnabled={closeButtonEnabled}
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
