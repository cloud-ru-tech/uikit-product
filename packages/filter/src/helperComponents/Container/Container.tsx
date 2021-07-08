import { cx } from '@linaria/core';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { isVisible } from '../../helpers/isVisible';
import * as S from './styled';

interface IContainerProps {
  getTrigger: (show: boolean) => React.ReactNode;
  className?: string;
}

export const Container: React.FC<IContainerProps> = ({ getTrigger, children, className }) => {
  const triggerEl = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>();

  const handleEvent = useCallback(
    event => {
      const isElVisible = isVisible(event.target);
      if (!isElVisible) return;

      const isTrigger = triggerEl.current?.contains(event.target);
      if (isTrigger) return;

      const isClickInside = tooltipRef?.contains(event.target);
      if (isClickInside) return;

      setShow(false);
    },
    [tooltipRef],
  );

  useEffect(() => {
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, [handleEvent]);

  const handleTrigger = () => setShow(show => !show);
  useEffect(() => {
    triggerEl.current?.addEventListener('click', handleTrigger);
    return () => {
      triggerEl.current?.removeEventListener('click', handleTrigger);
    };
  }, [triggerEl]);

  const trigger = useMemo(() => getTrigger(show), [getTrigger, show]);

  return (
    <Tooltip
      delayShow={0}
      delayHide={0}
      placement={Tooltip.placements.BottomEnd}
      trigger='click'
      tooltipShown={show}
      getTooltipRef={setTooltipRef}
      className={cx(S.tooltipClassName, className)}
      classNameWrapper={S.tooltipWrapperClassName}
      tooltip={children}
    >
      <div ref={triggerEl}>{trigger}</div>
    </Tooltip>
  );
};
