import cn from 'classnames';
import { MouseEvent, useCallback, useRef } from 'react';
import { toast, ToastContainerProps, ToastPosition, useToastContainer } from 'react-toastify';

import { useLayoutEffect } from '@snack-uikit/utils';

import { useStackedToastsContext } from '../../contexts';
import { CustomToast } from '../CustomToast';
import { isFn } from '../CustomToast/utils';
import { defaultProps } from './constants';
import { parseClassName } from './utils';

export function CustomToastContainer(props: ToastContainerProps) {
  const containerProps: ToastContainerProps = {
    ...defaultProps,
    ...props,
  };
  const stacked = props.stacked;
  const { collapsed, setCollapsed } = useStackedToastsContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { getToastToRender, isToastActive, count } = useToastContainer(containerProps);
  const { className, style, rtl, containerId } = containerProps;

  function getClassName(position: ToastPosition) {
    const defaultClassName = cn(`Toastify__toast-container-mobile`, `Toastify__toast-container--${position}`, {
      [`Toastify__toast-container--rtl`]: rtl,
    });
    return isFn(className)
      ? className({
          position,
          rtl,
          defaultClassName,
        })
      : cn(defaultClassName, parseClassName(className));
  }

  function collapseAll(e: MouseEvent) {
    setTimeout(() => {
      if (stacked && !e.isPropagationStopped()) {
        setCollapsed(true);
        toast.play();
      }
    }, 0);
  }

  function expandAll(e: MouseEvent) {
    setTimeout(() => {
      if (stacked && !e.isPropagationStopped()) {
        setCollapsed(false);
        toast.pause();
      }
    }, 0);
  }

  const updateStackedLayout = useCallback(() => {
    if (stacked && containerRef.current) {
      const nodes = containerRef.current.querySelectorAll('[data-in="true"]');
      const gap = 4;
      const isTop = containerProps.position?.includes('top');
      let usedHeight = 0;
      let prevS = 0;

      Array.from(nodes)
        .reverse()
        .forEach((n, i) => {
          const node = n as HTMLElement;
          node.classList.add(`Toastify__toast-mobile--stacked`);

          if (i > 0) node.dataset.collapsed = `${collapsed}`;

          if (!node.dataset.pos) node.dataset.pos = isTop ? 'top' : 'bot';

          const y = usedHeight * (collapsed ? 0.2 : 1) + (collapsed ? 0 : gap * i);

          node.style.setProperty('--y', `${isTop ? y : y * -1}px`);
          node.style.setProperty('--g', `${gap}`);
          node.style.setProperty('--s', `${1 - (collapsed ? prevS : 0)}`);

          usedHeight += node.offsetHeight;
          prevS += 0.025;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stacked, collapsed, count]);

  useLayoutEffect(() => {
    // Add small delay to prevent double execution in Safari
    const timeoutId = setTimeout(updateStackedLayout, 0);
    return () => clearTimeout(timeoutId);
  }, [updateStackedLayout]);

  return (
    <div
      ref={containerRef}
      className={'Toastify'}
      id={containerId as string}
      onMouseEnter={expandAll}
      onMouseLeave={collapseAll}
    >
      {getToastToRender((position, toastList) => {
        const containerStyle: React.CSSProperties = !toastList.length
          ? { ...style, pointerEvents: 'none' }
          : { ...style };

        return (
          <div className={getClassName(position)} style={containerStyle} key={`container-${position}`}>
            <div
              className={cn(
                'Toastify__toast-container-mobile-scroll',
                collapsed ? '' : 'Toastify__toast-container-mobile-scroll--active',
              )}
            >
              {toastList.map(({ content, props: toastProps }) => (
                <CustomToast
                  {...toastProps}
                  stacked={stacked}
                  collapseAll={() => {}}
                  isIn={isToastActive(toastProps.toastId, toastProps.containerId)}
                  style={toastProps.style}
                  key={`toast-${toastProps.key}`}
                >
                  {content}
                </CustomToast>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
