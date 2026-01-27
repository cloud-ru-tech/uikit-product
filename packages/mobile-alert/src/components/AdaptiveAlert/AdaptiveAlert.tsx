import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Alert, AlertProps, AlertTop, AlertTopProps } from '@snack-uikit/alert';

import { MobileAlertTop } from '../MobileAlertTop';

export type AdaptiveAlertProps = WithLayoutType<AlertProps>;

export function AdaptiveAlert({ layoutType, ...props }: AdaptiveAlertProps) {
  const isMobile = layoutType === 'mobile';
  return <Alert truncate={isMobile ? { title: 2 } : undefined} {...props} />;
}

export type AdaptiveAlertTopProps = WithLayoutType<AlertTopProps>;

export function AdaptiveAlertTop({ layoutType, ...props }: AdaptiveAlertTopProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileAlertTop {...props} /> : <AlertTop {...props} />;
}

export type { AlertProps, AlertTopProps };
