import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Modal, ModalCustom, ModalProps as DesktopModalProps } from '@snack-uikit/modal';

import { MobileModal, MobileModalProps } from '../MobileModal';
import { MobileModalCustom } from '../MobileModalCustom';

type ModalProps = DesktopModalProps & Pick<MobileModalProps, 'swipeEnabled'>;

export function AdaptiveModal({ size, layoutType, ...props }: WithLayoutType<ModalProps>) {
  const isMobile = layoutType === 'mobile';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isMobile ? <MobileModal {...props} /> : <Modal {...props} size={size} />;
}

export function useAdaptiveModalCustom({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? MobileModalCustom : ModalCustom;
}

export type { ModalProps };
