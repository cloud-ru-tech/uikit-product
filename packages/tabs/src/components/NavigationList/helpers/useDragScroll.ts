import { PointerEventHandler, RefObject, useRef, useState } from 'react';

const DRAG_MOUSEDOWN_DELAY_MS = 50;

export const useDragScroll = (containerRef: RefObject<HTMLDivElement>) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const dragSliderStateRef = useRef({
    startX: 0,
    scrollLeft: 0,
    isMouseDown: false,
  });

  const handleDocumentPointerMove = (event: PointerEvent) => {
    const scrolledElement = containerRef.current;
    if (!scrolledElement) {
      return;
    }

    const x = event.pageX - scrolledElement.offsetLeft;
    const diff = x - dragSliderStateRef.current.startX;
    scrolledElement.scrollLeft = dragSliderStateRef.current.scrollLeft - diff;

    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDocumentPointerUp = () => {
    document.removeEventListener('pointerup', handleDocumentPointerUp);
    document.removeEventListener('pointermove', handleDocumentPointerMove);

    dragSliderStateRef.current.isMouseDown = false;

    setTimeout(() => {
      setIsDragActive(false);
    }, 0);
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    const scrolledElement = containerRef.current;
    if (!scrolledElement) {
      return;
    }

    dragSliderStateRef.current.isMouseDown = true;

    document.addEventListener('pointerup', handleDocumentPointerUp);

    setTimeout(() => {
      if (!dragSliderStateRef.current.isMouseDown) {
        return;
      }

      document.addEventListener('pointermove', handleDocumentPointerMove);

      dragSliderStateRef.current.startX = event.pageX - scrolledElement.offsetLeft;
      dragSliderStateRef.current.scrollLeft = scrolledElement.scrollLeft;
    }, DRAG_MOUSEDOWN_DELAY_MS);
  };

  const handleClickCapture: PointerEventHandler<HTMLDivElement> = e => {
    if (!isDragActive) {
      return;
    }
    if (e.target === e.currentTarget) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  return {
    isDragActive,
    handlePointerDown,
    handleClickCapture,
  };
};
