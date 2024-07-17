import { type InputMask } from 'imask';
import mergeRefs from 'merge-refs';
import { forwardRef } from 'react';
import { useIMask } from 'react-imask';

import { AdaptiveFieldText, FieldTextProps } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { BASE_MASK_OPTIONS, MASK_OPTIONS } from './constants';
import { Mask } from './types';

export type FieldMaskProps = WithLayoutType<
  Omit<FieldTextProps, 'value' | 'onChange' | 'inputMode'> & {
    value?: string;
    onChange?(value: string, mask: InputMask): void;
    mask: Mask;
  }
>;

export const FieldMask = forwardRef<HTMLInputElement, FieldMaskProps>(
  ({ value: valueProp, onChange, mask, ...props }, ref) => {
    const maskOptions = MASK_OPTIONS[mask];

    const {
      ref: maskedRef,
      value,
      setValue,
    } = useIMask(
      { ...BASE_MASK_OPTIONS, ...maskOptions.options },
      {
        defaultValue: valueProp,
        onAccept: onChange,
      },
    );

    return (
      <AdaptiveFieldText
        // @ts-expect-error maskedRef type is not compatible with ref type
        ref={mergeRefs(ref, maskedRef)}
        value={value}
        onChange={setValue}
        placeholder={maskOptions.placeholder}
        inputMode={maskOptions.inputMode ?? 'numeric'}
        {...props}
      />
    );
  },
);
