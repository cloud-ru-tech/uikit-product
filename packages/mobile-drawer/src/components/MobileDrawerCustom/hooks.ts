import mergeRefs from 'merge-refs';
import { CSSProperties, useRef, useState } from 'react';

import { DATA_SWIPE_DIRECTIONS_ATTRIBUTE, SwipeCallback, SwipeEventData, useSwipeable } from '@snack-uikit/utils';

import { Position } from '../../types';
import { POSITION_TO_SWIPE_DIRECTION_MAP, SWIPE_DIRECTION_TO_POSITION_MAP } from './constants';

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
      case 'top':
        return `translateY(${TRANSFORM - value}px)`;
      case 'right':
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

  const isContainedInArea = ({
    element,
    condition,
  }: {
    element: HTMLElement | undefined;
    condition(element: HTMLElement): boolean;
  }): boolean => {
    if (!element) {
      return false;
    }

    if (element === swipeRef.current) {
      return false;
    }

    if (!element.parentElement) {
      return false;
    }

    return condition(element) || isContainedInArea({ element: element.parentElement, condition });
  };

  const isSwipeEnabled = (eventData: SwipeEventData): boolean => {
    const element = eventData.event.target as HTMLElement;
    const equalDirectionsCondition = (el: HTMLElement) => {
      const directions = el.getAttribute(DATA_SWIPE_DIRECTIONS_ATTRIBUTE)?.split(' ') ?? [];
      return directions.some(direction => direction === eventData.dir);
    };

    if (isContainedInArea({ element, condition: equalDirectionsCondition })) {
      return false;
    }

    return position === SWIPE_DIRECTION_TO_POSITION_MAP[eventData.dir];
  };

  const handleSwipeStart: SwipeCallback = () => {
    swipeStart.current = Date.now();
  };

  const handleSwiping: SwipeCallback = eventData => {
    if (!isSwipeEnabled(eventData)) {
      return;
    }

    if (!canCloseDrawer.current) {
      return;
    }

    let adjustedDrag = 0;
    const element = eventData.event.target as HTMLElement;

    switch (position) {
      case 'left':
        if (isContainedInArea({ element, condition: el => el.scrollWidth - el.offsetWidth > el.scrollLeft })) {
          canCloseDrawer.current = false;
          return;
        }
        adjustedDrag = Math.max(0, -eventData.deltaX);
        break;
      case 'right':
        if (isContainedInArea({ element, condition: el => el.scrollLeft > 0 })) {
          canCloseDrawer.current = false;
          return;
        }
        adjustedDrag = Math.min(0, -eventData.deltaX);
        break;
      case 'top':
        if (isContainedInArea({ element, condition: el => el.scrollHeight - el.offsetHeight > el.scrollTop })) {
          canCloseDrawer.current = false;
          return;
        }
        adjustedDrag = Math.max(0, -eventData.deltaY);
        break;
      case 'bottom':
        if (isContainedInArea({ element, condition: el => el.scrollTop > 0 })) {
          canCloseDrawer.current = false;
          return;
        }
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
    if (!isSwipeEnabled(eventData)) {
      return resetStyles();
    }

    if (Date.now() - swipeStart.current > SWIPE_DURATION) {
      return resetStyles();
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
    enabled,
    availableDirections: [POSITION_TO_SWIPE_DIRECTION_MAP[position]],
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
