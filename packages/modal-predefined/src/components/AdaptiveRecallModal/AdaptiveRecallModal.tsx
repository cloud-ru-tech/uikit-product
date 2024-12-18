import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { MobileRecallModal } from '../MobileRecallModal';
import { RecallModal, RecallModalProps } from '../RecallModal';

export function AdaptiveRecallModal({ layoutType, ...props }: WithLayoutType<RecallModalProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileRecallModal {...props} /> : <RecallModal {...props} />;
}

export type { RecallModalProps };
