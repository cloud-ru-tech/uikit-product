import { useState } from 'react';

export const useFocus = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onFocus = () => setIsFocus(true);
  const onBluer = () => setIsFocus(false);

  return { isFocus, onFocus, onBluer };
};
