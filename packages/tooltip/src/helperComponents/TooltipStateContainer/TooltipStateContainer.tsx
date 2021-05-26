import { FC, useCallback, useState } from 'react';

export const TooltipStateContainer: FC = ({ children }) => {
  const [on, setOn] = useState(false);
  const set = useCallback(on => setOn(on), []);
  const hide = useCallback(() => setOn(false), []);
  const toggle = useCallback(() => setOn(prevState => !prevState), []);

  if (typeof children !== 'function') {
    return null;
  }

  return children({
    on,
    set,
    toggle,
    hide,
  });
};
