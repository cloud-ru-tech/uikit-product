import React, { FC } from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import { css } from '@linaria/core';

import { ITooltipProps } from '../../types';
import Z_INDEX from 'vars/zIndex';

export const tooltipStyle = css`
  border: none;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: ${Z_INDEX.TOOLTIP};
`;

export const triggerStyle = css`
  height: 100%;
`;
// FIXME: any; + может стоит переименовать, так как будет еще другой тултип с подсказкой
export const Tooltip: FC<ITooltipProps> = ({
  children,
  tooltip,
  hideArrow,
  ...props
}) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }): React.ReactNode => {
      const tooltipProps = getTooltipProps({
        ref: tooltipRef,
        className: tooltipStyle,
      });
      return (
        <div {...tooltipProps}>
          {!hideArrow && (
            <div
              {...getArrowProps({
                ref: arrowRef,
                className: 'tooltip-arrow',
                'data-placement': placement,
              })}
            />
          )}
          {tooltip}
        </div>
      );
    }}
  >
    {({ getTriggerProps, triggerRef }): React.ReactNode => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: triggerStyle,
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);
