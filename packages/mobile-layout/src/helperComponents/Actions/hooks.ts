import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useEventHandler } from '@snack-uikit/utils';

import { ActionsProps } from './types';

type UseDynamicListProps = {
  items: ActionsProps['items'];
  containerRef: RefObject<HTMLDivElement>;
  buttonRefs: RefObject<HTMLButtonElement[]>;
};

export function useDynamicList({ items, containerRef }: UseDynamicListProps): {
  visibleActions: ActionsProps['items'];
  hiddenActions: ActionsProps['items'];
} {
  const [visibleActions, setVisibleActions] = useState<ActionsProps['items']>(items);
  const [hiddenActions, setHiddenActions] = useState<ActionsProps['items']>([]);
  const [width, setWidth] = useState(Infinity);
  const widthRef = useRef(width);

  const tryHidingAction = useEventHandler(() => {
    const container = containerRef.current;

    if (container && container.scrollWidth - container.offsetWidth > 0) {
      const actionToHide = visibleActions.at(-1);

      if (actionToHide) {
        setVisibleActions(actions => actions.slice(0, -1));
        setHiddenActions(actions => [actionToHide, ...actions]);
      }
    }
  });

  const tryShowingAction = useEventHandler(() => {
    const actionToShow = hiddenActions[0];

    if (actionToShow) {
      setVisibleActions(actions => [...actions, actionToShow]);
      setHiddenActions(actions => actions.slice(1));
    }
  });

  useEffect(() => {
    const listener = () => {
      tryHidingAction();
      containerRef.current && setWidth(containerRef.current.scrollWidth);
    };

    document.fonts.addEventListener('loadingdone', listener);
    return () => document.fonts.removeEventListener('loadingdone', listener);
  }, [containerRef, tryHidingAction]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (container) {
      const observer = new ResizeObserver(entities =>
        entities.forEach(entity => {
          if (entity.target === container) {
            const [{ inlineSize: newWidth }] = entity.contentBoxSize;
            setWidth(Math.floor(newWidth));
          }
        }),
      );

      observer.observe(container);

      return () => observer.disconnect();
    }
  }, [containerRef]);

  useLayoutEffect(() => {
    if (width > widthRef.current) {
      //try to add extra button
      tryShowingAction();
    } else if (width < widthRef.current) {
      // check if button should be hidden
      tryHidingAction();
    }

    widthRef.current = width;
  }, [tryHidingAction, tryShowingAction, width]);

  useLayoutEffect(() => {
    tryHidingAction();
  }, [tryHidingAction, visibleActions]);

  return { visibleActions, hiddenActions };
}
