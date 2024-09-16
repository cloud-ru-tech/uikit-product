import { DeleteModal, DeleteModalProps } from '@sbercloud/uikit-product-modal-predefined';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Modal, ModalCustom, ModalProps as DesktopModalProps } from '@snack-uikit/modal';

import { MobileDeleteModal } from '../MobileDeleteModal';
import { MobileModal, MobileModalProps } from '../MobileModal';
import { MobileModalCustom } from '../MobileModalCustom';

type ModalProps = DesktopModalProps & Pick<MobileModalProps, 'swipeEnabled'>;

export function AdaptiveModal({ size, layoutType, ...props }: WithLayoutType<ModalProps>) {
  const isMobile = layoutType === 'mobile';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isMobile ? <MobileModal {...props} /> : <Modal {...props} size={size} />;
}

export function AdaptiveDeleteModal({ layoutType, ...props }: WithLayoutType<DeleteModalProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileDeleteModal {...props} /> : <DeleteModal {...props} />;
}

export function useAdaptiveModalCustom({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? MobileModalCustom : ModalCustom;
}

export type { ModalProps, DeleteModalProps };
