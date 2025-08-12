import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { MobileRecallModal } from '../MobileRecallModal';
import { RecallModal, RecallModalProps } from '../RecallModal';

export type AdaptiveRecallModalProps = WithLayoutType<RecallModalProps>;

export function AdaptiveRecallModal({ layoutType, ...props }: AdaptiveRecallModalProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileRecallModal {...props} /> : <RecallModal {...props} />;
}

export type { RecallModalProps };
