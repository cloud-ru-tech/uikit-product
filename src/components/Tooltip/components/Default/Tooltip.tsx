import { FC } from 'react';
import TooltipTrigger from 'react-popper-tooltip';

import { ITooltipProps } from 'components/Tooltip/helpers/types';

import { tooltipStyle, triggerStyle } from './styled';

// FIXME: может стоит переименовать, так как будет еще другой тултип с подсказкой
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
