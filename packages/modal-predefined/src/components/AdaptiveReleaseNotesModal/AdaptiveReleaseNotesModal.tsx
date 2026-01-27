import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { ReleaseNotesModalProps } from '../../types';
import { MobileReleaseNotesModal } from '../MobileReleaseNotesModal';
import { ReleaseNotesModal } from '../ReleaseNotesModal';

export type AdaptiveReleaseNotesModalProps = WithLayoutType<ReleaseNotesModalProps>;

export function AdaptiveReleaseNotesModal({ layoutType, ...props }: AdaptiveReleaseNotesModalProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileReleaseNotesModal {...props} /> : <ReleaseNotesModal {...props} />;
}

export type { ReleaseNotesModalProps };
