import { forwardRef } from 'react';

import { MobileFieldSelectMultiple } from './MobileFieldSelectMultiple';
import { MobileFieldSelectSingle } from './MobileFieldSelectSingle';
import { MobileFieldSelectProps } from './types';
import { isFieldSelectMultipleProps, isFieldSelectSingleProps } from './utils';

export const MobileFieldSelect = forwardRef<HTMLInputElement, MobileFieldSelectProps>((props, ref) => {
  if (isFieldSelectMultipleProps(props)) {
    return <MobileFieldSelectMultiple {...props} ref={ref} />;
  }

  if (isFieldSelectSingleProps(props)) {
    return <MobileFieldSelectSingle {...props} ref={ref} />;
  }

  return null;
});
