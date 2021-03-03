import { FC, useCallback, useState } from 'react';

export const TooltipStateContainer: FC = ({ children }) => {
  const [on, setOn] = useState(false);
  const set = useCallback(on => setOn(on), []);
  const hide = useCallback(() => setOn(false), []);
  const toggle = useCallback(() => setOn(prevState => !prevState), []);
  return typeof children === 'function'
    ? children({
        on,
        set,
        toggle,
        hide,
      })
    : null;
};
