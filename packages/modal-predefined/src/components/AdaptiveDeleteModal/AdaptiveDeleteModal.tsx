import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { DeleteModal, DeleteModalProps } from '../DeleteModal';
import { MobileDeleteModal } from '../MobileDeleteModal';

export function AdaptiveDeleteModal({ layoutType, ...props }: WithLayoutType<DeleteModalProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileDeleteModal {...props} /> : <DeleteModal {...props} />;
}

export type { DeleteModalProps };
