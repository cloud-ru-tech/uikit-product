import { cx } from '@linaria/core';
import { MouseEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Placements, TooltipPrivateProps, TriggerTypes } from '../../helpers/types';
import { tooltipClassName, triggerClassName } from './styled';

export const TooltipPrivate = ({
  popperOptions,
  children,
  tooltip,
  classNameContainer,
  classNameArrow,
  classNameTrigger,
  getTooltipRef,
  ...props
}: WithSupportProps<TooltipPrivateProps>) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible, tooltipRef } = usePopperTooltip(
    {
      interactive: true,
      ...props,
    },
    popperOptions,
  );

  useEffect(() => {
    getTooltipRef?.(tooltipRef);
  }, [tooltipRef]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <span
        ref={setTriggerRef}
        className={cx(triggerClassName, classNameTrigger)}
        data-test-trigger-id='tooltip__trigger-element'
      >
        {children}
      </span>
      {visible &&
        ReactDOM.createPortal(
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            role='tooltip'
            {...getTooltipProps()}
            ref={setTooltipRef}
            className={cx(tooltipClassName, classNameContainer)}
            onClick={handleClick}
            {...extractSupportProps(props)}
          >
            {tooltip}
            <div {...getArrowProps()} className={classNameArrow} />
          </div>,
          document.body,
        )}
    </>
  );
};

TooltipPrivate.triggerTypes = TriggerTypes;
TooltipPrivate.placements = Placements;
