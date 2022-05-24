import { FocusEvent, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IMask, useIMask } from 'react-imask';

export type InputMaskOptions = IMask.AnyMaskedOptions;

export function useInputMask({
  options,
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  options: InputMaskOptions;
  value: string;
  onChange: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>, value: string) => void;
}) {
  const maskOptions = useMemo(() => ({ lazy: false, ...options }), [options]);
  const [placeholder, setPlaceholder] = useState<string>();
  const { ref, value: maskedValue, unmaskedValue, maskRef } = useIMask(maskOptions);
  const isFirstRenderRef = useRef(true);
  const handleChange = useCallback(
    (value: string) => {
      maskRef.current.el.value = value;
      maskRef.current.unmaskedValue = value;
      maskRef.current.value = value;
      maskRef.current.updateValue();
    },
    [maskRef],
  );

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    maskRef.current.updateOptions({ lazy: false });
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    maskRef.current.updateOptions({ lazy: true });
    onBlur?.(event, unmaskedValue);
  }

  useEffect(() => {
    setPlaceholder(maskRef.current.value);
    maskRef.current.updateOptions({ lazy: true });
  }, [maskRef, options]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    onChange(unmaskedValue);
  }, [onChange, unmaskedValue]);

  useEffect(() => handleChange(value), [handleChange, value]);

  return {
    placeholder,
    inputRef: ref as Ref<HTMLInputElement>,
    value: maskedValue,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };
}
