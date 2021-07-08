import { cx } from '@linaria/core';
import TooltipTrigger from 'react-popper-tooltip';

import { Placements, TooltipPrivateProps } from '../../helpers/types';
import { tooltipClassName, triggerClassName } from './styled';

export const TooltipPrivate = ({
  children,
  tooltip,
  hideArrow,
  classNameContainer,
  classNameArrow,
  classNameTrigger,
  ...props
}: TooltipPrivateProps) => (
  <TooltipTrigger
    {...props}
    tooltip={({ arrowRef, tooltipRef, getArrowProps, getTooltipProps, placement }): React.ReactNode => {
      const tooltipProps = getTooltipProps({
        ref: tooltipRef,
        className: cx(tooltipClassName, classNameContainer),
      });
      return (
        <div {...tooltipProps}>
          {!hideArrow && (
            <div
              {...getArrowProps({
                ref: arrowRef,
                className: cx('tooltip-arrow', classNameArrow),
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
          className: cx(triggerClassName, classNameTrigger),
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

TooltipPrivate.placements = Placements;
