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

  const toggleButtonWidth = useEventHandler(
    ({ changedWidth, initialWidth }: { changedWidth: number; initialWidth: number }) => {
      if (changedWidth > initialWidth) {
        //try to add extra button
        tryShowingAction();
      } else if (changedWidth < initialWidth) {
        // check if button should be hidden
        tryHidingAction();
      }
    },
  );

  useEffect(() => {
    const listener = () => {
      tryHidingAction();

      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth);
      }
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
    if (containerRef.current) {
      toggleButtonWidth({
        initialWidth: containerRef.current.scrollWidth,
        changedWidth: widthRef.current,
      });
    }
  }, [items, containerRef, toggleButtonWidth]);

  useLayoutEffect(() => {
    toggleButtonWidth({
      initialWidth: widthRef.current,
      changedWidth: width,
    });

    widthRef.current = width;
  }, [width, toggleButtonWidth]);

  useLayoutEffect(() => {
    tryHidingAction();
  }, [tryHidingAction, visibleActionsAmount]);

  return {
    visibleActions: items.slice(0, visibleActionsAmount),
    hiddenActions: items.slice(visibleActionsAmount),
  };
}
