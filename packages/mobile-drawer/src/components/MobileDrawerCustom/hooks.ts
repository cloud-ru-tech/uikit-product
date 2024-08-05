import { CSSProperties, MouseEvent, TouchEvent, useRef, useState } from 'react';

import { Position } from '../../types';

function getPageCoordinate(e: TouchEvent | MouseEvent, position: Position): number {
  const key = position === 'top' || position === 'bottom' ? 'pageY' : 'pageX';

  if (e.nativeEvent instanceof globalThis.MouseEvent) {
    return e.nativeEvent[key];
  } else if (e.nativeEvent instanceof globalThis.TouchEvent) {
    return e.nativeEvent.changedTouches[0][key];
  }

  return 0;
}

type UseSwipePropsProps = {
  onClose(): void;
  position: Position;
  enabled: boolean;
};

const TRANSFORM = 0;
const CLOSE_DELTA_IN_PX = 40;
const CLOSE_RATIO = 5;

export function useSwipeProps({ onClose, position, enabled }: UseSwipePropsProps) {
  const swipeRef = useRef<HTMLDivElement>(null);
  const itemSize =
    (position === 'bottom' || position === 'top' ? swipeRef.current?.offsetHeight : swipeRef.current?.offsetWidth) ?? 0;

  const [drag, setDrag] = useState({
    initial: TRANSFORM,
    start: 0,
    isDown: false,
    drag: 0,
    finished: true,
    pointers: true,
  });

  const getDrawerTransform = (value = drag.drag) => {
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

  const getMaskOpacity = (value = drag.drag) => 1 + value / itemSize;

  const shouldCloseDrawer = Math.abs(drag.drag) < Math.min(CLOSE_DELTA_IN_PX, itemSize / CLOSE_RATIO);

  const [styles, setStyles] = useState<{
    drawer: CSSProperties | undefined;
    mask: CSSProperties | undefined;
  }>();

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (!enabled) {
      return;
    }

    setDrag({
      ...drag,
      isDown: true,
      start: getPageCoordinate(e, position),
      initial: TRANSFORM,
      finished: false,
    });
  };

  const handleDragFinish = () => {
    if (!enabled) {
      return;
    }

    if (drag.finished) {
      return;
    }

    if (shouldCloseDrawer) {
      setStyles(undefined);

      return setDrag({
        initial: TRANSFORM,
        start: 0,
        isDown: false,
        drag: 0,
        finished: true,
        pointers: true,
      });
    }

    onClose();
    setStyles({
      drawer: { transform: getDrawerTransform() },
      mask: { opacity: getMaskOpacity() },
    });
    setDrag({ ...drag, drag: 0, isDown: false, finished: true, pointers: true });
    return;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!enabled) {
      return;
    }

    if (!drag.isDown) {
      return;
    }

    const pos = getPageCoordinate(e, position);
    const newDrag = drag.start - pos;
    const adjustedDrag = position === 'top' || position === 'left' ? Math.max(0, newDrag) : Math.min(0, newDrag);

    setDrag({
      ...drag,
      drag: adjustedDrag,
      pointers: Math.abs(drag.start - pos) < Number.MIN_SAFE_INTEGER,
    });

    setStyles({
      drawer: { transform: getDrawerTransform(adjustedDrag), transition: 'none' },
      mask: { opacity: getMaskOpacity(adjustedDrag), transition: 'none' },
    });
  };

  return {
    swipeRef,
    drawerStyles: styles?.drawer,
    maskStyles: styles?.mask,
    showPointer: !drag.pointers,
    swipeProps: {
      onTouchCancel: handleDragFinish,
      onTouchEnd: handleDragFinish,
      onTouchMove: handleDragMove,
      onTouchStart: handleDragStart,
      onMouseDown: handleDragStart,
      onMouseLeave: handleDragFinish,
      onMouseUp: handleDragFinish,
      onMouseMove: handleDragMove,
    },
    drawerMotionProps: {
      onLeaveActive: () => {
        setStyles(undefined);
      },
      onLeaveEnd: () => {
        setStyles(undefined);
      },
    },
  };
}
