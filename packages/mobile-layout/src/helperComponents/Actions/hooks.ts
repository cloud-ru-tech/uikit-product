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
  const [visibleActionsAmount, setVisibleActionsAmount] = useState<number>(items.length);
  const [width, setWidth] = useState(Infinity);
  const widthRef = useRef(width);

  const tryHidingAction = useEventHandler(() => {
    const container = containerRef.current;

    if (container && container.scrollWidth - container.offsetWidth > 0) {
      const actionToHide = items[visibleActionsAmount - 1];

      if (actionToHide) {
        setVisibleActionsAmount(value => value - 1);
      }
    }
  });

  const tryShowingAction = useEventHandler(() => {
    const actionToShow = items[visibleActionsAmount];

    if (actionToShow) {
      setVisibleActionsAmount(value => value + 1);
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
  }, [tryHidingAction, tryShowingAction, width, items]);

  useLayoutEffect(() => {
    tryHidingAction();
  }, [tryHidingAction, visibleActionsAmount]);

  return {
    visibleActions: items.slice(0, visibleActionsAmount),
    hiddenActions: items.slice(visibleActionsAmount),
  };
}
