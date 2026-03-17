import cn from 'classnames';
import { CSSProperties, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { getRunningLineKey } from '../utils';
import styles from './styles.module.scss';

export type SiteRunningLineProps = {
  /** Массив элементов (иконок или любых React-элементов) */
  items: Array<ReactNode>;
  /** Разделитель между элементами (необязательно) */
  separator?: ReactNode;
  /** Скорость анимации: время в секундах для прохождения одного набора элементов. Больше значение = медленнее */
  duration?: number;
  /** Дополнительный класс для контейнера */
  className?: string;
};

export function SiteRunningLine({ items, duration = 30, className, separator }: SiteRunningLineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(2);

  const trackContent = useMemo(
    () =>
      items.flatMap((item, index) => {
        const elements: ReactNode[] = [];
        if (separator != null && index > 0) {
          elements.push(<Fragment key={getRunningLineKey('separator', index, separator)}>{separator}</Fragment>);
        }
        elements.push(<Fragment key={getRunningLineKey('item', index, item)}>{item}</Fragment>);
        return elements;
      }),
    [items, separator],
  );

  const trackCopyContent = useMemo(() => {
    if (separator == null) return trackContent;

    return [
      ...trackContent,
      <Fragment key={getRunningLineKey('separator', items.length, separator)}>{separator}</Fragment>,
    ];
  }, [items.length, separator, trackContent]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const measure = measureRef.current;

    if (!wrapper || !measure) return undefined;

    const updateMetrics = () => {
      const nextContentWidth = measure.getBoundingClientRect().width;
      const wrapperWidth = wrapper.getBoundingClientRect().width;

      if (!nextContentWidth || !wrapperWidth) return;

      setContentWidth(nextContentWidth);
      setRepeatCount(Math.max(2, Math.ceil(wrapperWidth / nextContentWidth) + 1));
    };

    updateMetrics();

    if (typeof ResizeObserver === 'undefined') return undefined;

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(measure);

    return () => resizeObserver.disconnect();
  }, [items, separator]);

  const duplicatedContent = Array.from({ length: repeatCount }, (_, index) => (
    <div className={styles.trackCopy} aria-hidden={index > 0} key={getRunningLineKey('copy', index)}>
      {trackCopyContent}
    </div>
  ));

  if (!items.length) return null;

  return (
    <div className={cn(styles.wrapper, className)} role='marquee' aria-hidden ref={wrapperRef}>
      <div className={styles.measure} ref={measureRef} aria-hidden>
        {trackCopyContent}
      </div>
      <div
        className={styles.track}
        style={
          {
            animationDuration: `${duration}s`,
            ['--site-running-line-shift' as string]: `-${contentWidth}px`,
            ['--site-running-line-play-state' as string]: contentWidth ? 'running' : 'paused',
          } as CSSProperties
        }
      >
        {duplicatedContent}
      </div>
    </div>
  );
}
