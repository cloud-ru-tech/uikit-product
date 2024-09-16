import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Alert, AlertProps, AlertTop, AlertTopProps } from '@snack-uikit/alert';

import { MobileAlertTop } from '../MobileAlertTop';

export function AdaptiveAlert({ layoutType, ...props }: WithLayoutType<AlertProps>) {
  const isMobile = layoutType === 'mobile';
  return <Alert truncate={isMobile ? { title: 2 } : undefined} {...props} />;
}

export function AdaptiveAlertTop({ layoutType, ...props }: WithLayoutType<AlertTopProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileAlertTop {...props} /> : <AlertTop {...props} />;
}

export type { AlertProps, AlertTopProps };
