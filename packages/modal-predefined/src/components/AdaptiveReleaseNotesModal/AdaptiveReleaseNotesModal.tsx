import { ReleaseNotesModalProps } from '../../types';
import { MobileReleaseNotesModal } from '../MobileReleaseNotesModal';
import { ReleaseNotesModal } from '../ReleaseNotesModal';

export function AdaptiveReleaseNotesModal({ layoutType, ...props }: ReleaseNotesModalProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileReleaseNotesModal {...props} /> : <ReleaseNotesModal {...props} />;
}

export type { ReleaseNotesModalProps };
