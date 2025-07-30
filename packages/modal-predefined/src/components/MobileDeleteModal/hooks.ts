import { useCallback, useRef, useState } from 'react';

export function useTextFieldValidation({ target, errorText }: { target: string | undefined; errorText: string }) {
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
      setError(errorText);
      ref.current?.focus();
    };
  };

  const reset = useCallback(() => {
    setValue('');
    setError('');
  }, []);

  return { value, onChange, handleSubmit, reset, ref, error };
}
