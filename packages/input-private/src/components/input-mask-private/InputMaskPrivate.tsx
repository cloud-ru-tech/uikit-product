import mergeRefs from 'merge-refs';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';

import { SimpleInput, SimpleInputProps } from '../simple';
import { MASKS_CONFIG, Masks } from './constants';

export type InputMaskPrivateProps = SimpleInputProps & {
  mask: Masks;
};

const InputMaskPrivateForwarded = forwardRef<HTMLInputElement, InputMaskPrivateProps>(
  ({ mask, onChange, ...props }, ref) => {
    const { ref: imaskRef, value, unmaskedValue, typedValue, maskRef } = useIMask(MASKS_CONFIG[mask]);

    const inputRef = mergeRefs(ref, imaskRef) as React.Ref<HTMLInputElement> | undefined;

    const hasMounted = useRef(false);

    useEffect(() => {
      if (hasMounted.current) {
        onChange(unmaskedValue);
      } else {
        hasMounted.current = true;
      }
    }, [unmaskedValue]);

    const syncMask = useCallback((newValue: string) => {
      if (maskRef.current) {
        maskRef.current.el.value = newValue;
        maskRef.current.unmaskedValue = newValue;
        maskRef.current.value = newValue;
        maskRef.current.updateValue();
      }
    }, []);

    useEffect(() => syncMask(props.value), [props.value]);

    const handleFocus = () => {
      maskRef.current.updateOptions({ lazy: false });
    };

    const handleBlur = () => {
      maskRef.current.updateOptions({ lazy: true });

      if (mask === Masks.Phone && unmaskedValue === '7') syncMask('');
    };

    return (
      <SimpleInput
        {...props}
        ref={inputRef}
        value={value}
        onChange={syncMask}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  },
);

export const InputMaskPrivate = InputMaskPrivateForwarded as typeof InputMaskPrivateForwarded & {
  masks: typeof Masks;
};

InputMaskPrivate.masks = Masks;
