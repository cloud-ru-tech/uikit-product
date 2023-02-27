import { FocusEvent, useState } from 'react';

export const useFocus = ({
  onFocus,
  onBlur,
}: {
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
} = {}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    onBlur?.(event);
  };

  return { isFocus, handleFocus, handleBlur };
};
