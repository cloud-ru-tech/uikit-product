import { FocusEvent } from 'react';

import { FieldProps } from '../FieldProps';

export function createFieldFillBlurHandler(onFieldFill: FieldProps['onFieldFill'], analyticsName?: string) {
  return (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    if (value) {
      onFieldFill(analyticsName ?? name);
    }
  };
}
