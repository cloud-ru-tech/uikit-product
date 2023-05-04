import { ReactNode, useCallback, useState } from 'react';

type ChildrenFunctionParams = {
  on: boolean;
  set: (on: boolean) => void;
  toggle: () => void;
  hide: () => void;
};

export type TooltipStateContainerPrivateProps = {
  children: (params: ChildrenFunctionParams) => ReactNode;
};

export function TooltipStateContainerPrivate({ children }: TooltipStateContainerPrivateProps) {
  const [on, setOn] = useState(false);
  const set = useCallback((on: boolean) => setOn(on), []);
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
}
