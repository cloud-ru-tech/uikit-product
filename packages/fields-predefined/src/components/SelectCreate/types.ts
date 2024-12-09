import { DrawerProps, ModalProps } from '@sbercloud/uikit-product-mobile-modal';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

type CommonModalDrawerProps = 'open' | 'onClose' | 'approveButton' | 'cancelButton';
type CreateLayoutModalProps = WithLayoutType<Omit<ModalProps, CommonModalDrawerProps>>;
type CreateLayoutDrawerProps = WithLayoutType<Omit<DrawerProps, CommonModalDrawerProps>>;

export type LayoutProps =
  | {
      /** По клику на кнопку создания открывать модальное окно или дровер */
      createLayoutType: 'modal';
      /** Пропсы передаваемые в модалку или дровер создания новой опции */
      createLayoutProps: CreateLayoutModalProps;
    }
  | {
      createLayoutType: 'drawer';
      createLayoutProps: CreateLayoutDrawerProps;
    };

export type EntityName = {
  plural: string;
  single: string;
};
