import mergeRefs from 'merge-refs';
import { CSSProperties, useRef, useState } from 'react';
import { SwipeCallback, useSwipeable } from 'react-swipeable';

import { Position } from '../../types';
import { POSITION_TO_SWIPE_DIRECTION_MAP } from './constants';

type UseSwipePropsProps = {
  onSwiped(): void;
  position: Position;
  enabled: boolean;
};

const TRANSFORM = 0;
const SWIPE_DURATION = 500;

export function useSwipeProps({ onSwiped, position, enabled }: UseSwipePropsProps) {
  const swipeRef = useRef<HTMLDivElement>(null);
  const canCloseDrawer = useRef(true);
  const itemSize =
    (position === 'bottom' || position === 'top' ? swipeRef.current?.offsetHeight : swipeRef.current?.offsetWidth) ?? 0;
  const swipeStart = useRef(0);

  const getInitialDrag = () => ({
    initial: TRANSFORM,
    start: 0,
    isDown: false,
    drag: 0,
    finished: true,
    pointers: true,
  });

  const [drag, setDrag] = useState(getInitialDrag);

  const [styles, setStyles] = useState<{
    drawer: CSSProperties | undefined;
    mask: CSSProperties | undefined;
  }>();

  const getDrawerTransform = (value: number) => {
    switch (position) {
      case 'bottom':
        return `translateY(${TRANSFORM - value}px)`;
      case 'top':
        return `translateY(${TRANSFORM - value}px)`;
      case 'right':
        return `translateX(${TRANSFORM - value}px)`;
      case 'left':
      default:
        return `translateX(${TRANSFORM - value}px)`;
    }
  };

  const getMaskOpacity = (value: number) => 1 + value / itemSize;

  const resetStyles = () => {
    setStyles(undefined);
    setDrag(getInitialDrag());
  };

  const handleSwipeStart: SwipeCallback = () => {
    swipeStart.current = Date.now();
  };

  const handleSwiping: SwipeCallback = eventData => {
    if (!enabled) {
      return;
    }

    if (eventData.dir !== POSITION_TO_SWIPE_DIRECTION_MAP[position]) {
      return;
    }

    let adjustedDrag = 0;

    switch (position) {
      case 'left':
        adjustedDrag = Math.max(0, -eventData.deltaX);
        break;
      case 'right':
        adjustedDrag = Math.min(0, -eventData.deltaX);
        break;
      case 'top':
        adjustedDrag = Math.max(0, -eventData.deltaY);
        break;
      case 'bottom':
        adjustedDrag = Math.min(0, -eventData.deltaY);
        break;
      default:
        break;
    }

    setDrag(prevDrag => ({
      ...prevDrag,
      drag: adjustedDrag,
      pointers: eventData.absX < Number.MIN_SAFE_INTEGER,
    }));

    setStyles({
      drawer: { transform: getDrawerTransform(adjustedDrag), transition: 'none' },
      mask: { opacity: getMaskOpacity(adjustedDrag), transition: 'none' },
    });
  };

  const handleSwiped: SwipeCallback = eventData => {
    if (!enabled) {
      return;
    }

    if (eventData.dir !== POSITION_TO_SWIPE_DIRECTION_MAP[position]) {
      return resetStyles();
    }

    if (Date.now() - swipeStart.current > SWIPE_DURATION) {
      return resetStyles();
    }

    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      offsetWidth = 0,
      scrollHeight = 0,
      offsetHeight = 0,
    } = (eventData.event.target ?? {}) as Record<string, number | undefined>;

    switch (position) {
      case 'right':
        if (scrollLeft > 0) {
          canCloseDrawer.current = false;
          return resetStyles();
        }
        break;
      case 'left':
        if (scrollWidth - offsetWidth > scrollLeft) {
          canCloseDrawer.current = false;
          return resetStyles();
        }
        break;
      case 'bottom':
        if (scrollTop > 0) {
          canCloseDrawer.current = false;
          return resetStyles();
        }
        break;
      case 'top':
        if (scrollHeight - offsetHeight > scrollTop) {
          canCloseDrawer.current = false;
          return resetStyles();
        }
        break;
      default:
        break;
    }

    if (!canCloseDrawer.current) {
      canCloseDrawer.current = true;
      return resetStyles();
    }

    onSwiped();
    setStyles({ drawer: { transform: getDrawerTransform(drag.drag) }, mask: { opacity: getMaskOpacity(drag.drag) } });
    setDrag(prevDrag => ({ ...prevDrag, drag: 0, isDown: false, finished: true, pointers: true }));
  };

  const { ref, ...swipeProps } = useSwipeable({
    onSwipeStart: handleSwipeStart,
    onSwiping: handleSwiping,
    onSwiped: handleSwiped,
    trackMouse: true,
  });

  return {
    swipeRef: mergeRefs(ref as (value: HTMLDivElement) => void, swipeRef),
    drawerStyles: styles?.drawer,
    maskStyles: styles?.mask,
    showPointer: !drag.pointers,
    swipeProps,
    drawerMotionProps: {
      onLeaveActive: () => setStyles(undefined),
      onLeaveEnd: () => setStyles(undefined),
    },
  };
}
