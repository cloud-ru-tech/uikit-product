import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { FieldDate, FieldDateProps, FieldSelect, FieldSelectProps } from '@snack-uikit/fields';

import { MobileFieldDate } from '../MobileFieldDate';
import { MobileFieldSelect } from '../MobileFieldSelect';

export function AdaptiveFieldSelect({ layoutType, ...props }: WithLayoutType<FieldSelectProps>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileFieldSelect {...props} /> : <FieldSelect {...props} />;
}

export function AdaptiveFieldDate({ layoutType, ...props }: WithLayoutType<FieldDateProps>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileFieldDate {...props} /> : <FieldDate {...props} />;
}

export type { FieldSelectProps, FieldDateProps };
