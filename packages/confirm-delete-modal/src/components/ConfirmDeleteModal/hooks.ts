import { useCallback, useRef, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';

export function useTextFieldValidation(target: string | undefined) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onChange = (newValue: string) => {
    setValue(() => newValue);

    if (target === newValue) {
      setError('');
    }
  };

  const handleSubmit = (cb: () => void) => {
    if (target === value || target === undefined) {
      return () => {
        setError('');
        cb();
      };
    }

    return () => {
      setError(textProvider<string>(languageCode, Texts.InvalidName));
      ref.current?.focus();
    };
  };

  const reset = useCallback(() => {
    setValue('');
    setError('');
  }, []);

  return { value, onChange, handleSubmit, reset, ref, error };
}
