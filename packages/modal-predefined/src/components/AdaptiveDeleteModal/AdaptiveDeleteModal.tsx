import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { DeleteModal, DeleteModalProps } from '../DeleteModal';
import { MobileDeleteModal } from '../MobileDeleteModal';

export type AdaptiveDeleteModalProps = WithLayoutType<DeleteModalProps>;

export function AdaptiveDeleteModal({ layoutType, ...props }: AdaptiveDeleteModalProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileDeleteModal {...props} /> : <DeleteModal {...props} />;
}

export type { DeleteModalProps };
