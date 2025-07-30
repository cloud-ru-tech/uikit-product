import { useCallback, useRef, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';

export function useTextFieldValidation(target: string | undefined) {
  const { t } = useLocale('ModalPredefined');

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
      setError(t('invalidText.name'));
      ref.current?.focus();
    };
  };

  const reset = useCallback(() => {
    setValue('');
    setError('');
  }, []);

  return { value, onChange, handleSubmit, reset, ref, error };
}
