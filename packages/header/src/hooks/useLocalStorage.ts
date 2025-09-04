import { useCallback, useState } from 'react';

export function useLocalStorage<T extends string = string>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [value, setValueState] = useState((localStorage.getItem(key) as T) ?? defaultValue);

  const setValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, newValue);
      setValueState(newValue);
    },
    [key],
  );

  return [value, setValue];
}
