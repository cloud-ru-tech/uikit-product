import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Modal, ModalCustom, ModalProps } from '@snack-uikit/modal';

import { SIZE } from '../../constants';
import { Size } from '../../types';
import { MobileModal, MobileModalProps } from '../MobileModal';
import { MobileModalCustom } from '../MobileModalCustom';

export type AdaptiveModalProps = WithLayoutType<
  Omit<ModalProps, 'size'> & {
    size?: ModalProps['size'] | MobileModalProps['size'];
  }
>;

export function AdaptiveModal({ layoutType, size, ...props }: AdaptiveModalProps) {
  const isMobile = layoutType === 'mobile';
  const mobileSize = size && Object.values<string>(SIZE).includes(size) ? (size as Size) : undefined;
  const desktopProps = {
    ...props,
    size: size && ['s', 'm', 'l'].includes(size) ? size : undefined,
  } as ModalProps;

  return isMobile ? <MobileModal size={mobileSize} {...props} /> : <Modal {...desktopProps} />;
}

export function useAdaptiveModalCustom({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? MobileModalCustom : ModalCustom;
}

export type { ModalProps };
