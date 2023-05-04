import { cx } from '@linaria/core';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TooltipPrivate } from '@sbercloud/uikit-product-tooltip-private';

import * as S from './styled';

type ContainerProps = PropsWithChildren<{
  getTrigger: (show: boolean) => React.ReactNode;
  className?: string;
}>;

export function Container({ getTrigger, children, className }: ContainerProps) {
  const triggerEl = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>();

  const handleEvent = useCallback(
    (event: MouseEvent) => {
      if (!show) return;

      const isTrigger = triggerEl.current?.contains(event.target as Node);
      if (isTrigger) return;

      const isClickInside = tooltipRef?.contains(event.target as Node);
      if (isClickInside) return;

      setShow(false);
    },
    [tooltipRef, show],
  );

  useEffect(() => {
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, [handleEvent]);

  const handleTrigger = () => setShow(show => !show);
  useEffect(() => {
    const element = triggerEl.current;
    element?.addEventListener('click', handleTrigger);
    return () => {
      element?.removeEventListener('click', handleTrigger);
    };
  }, [triggerEl]);

  const trigger = useMemo(() => getTrigger(show), [getTrigger, show]);

  return (
    <TooltipPrivate
      delayShow={0}
      delayHide={0}
      placement={TooltipPrivate.placements.BottomEnd}
      trigger={TooltipPrivate.triggerTypes.Click}
      visible={show}
      getTooltipRef={setTooltipRef}
      classNameContainer={cx(S.tooltipClassName, className)}
      tooltip={children}
    >
      <div ref={triggerEl}>{trigger}</div>
    </TooltipPrivate>
  );
}
