import { FC } from 'react';
import { cx } from '@linaria/core';
import TooltipTrigger, { TooltipTriggerProps } from 'react-popper-tooltip';

import {
  containerStyle,
  containerWithIconStyle,
  TooltipWrapper,
  IconWrapper,
  triggerStyle,
} from './styled';

export interface IBasicTooltipProps
  extends Partial<Omit<TooltipTriggerProps, 'tooltip' | 'children'>> {
  tooltip?: TooltipTriggerProps['tooltip'] | React.ReactNode | JSX.Element;
  children: TooltipTriggerProps['children'] | React.ReactNode | JSX.Element;
  icon?: React.ReactNode | JSX.Element;
  iconAction?: () => void;
  hideArrow?: boolean;
  className?: string;
  classNameTrigger?: string;
  classNameArrow?: string;
}

const DEFAULT_MODIFIERS = [
  {
    name: 'offset',
    enabled: true,
    options: {
      offset: [0, 8],
    },
  },
];

export const BasicTooltip: FC<IBasicTooltipProps> = ({
  children,
  tooltip,
  hideArrow = true,
  className,
  classNameTrigger,
  classNameArrow,
  modifiers = DEFAULT_MODIFIERS,
  delayShow = 300,
  delayHide = 300,
  placement = 'top-start',
  trigger = 'hover',
  icon,
  iconAction,
  ...props
}) =>
  tooltip ? (
    <TooltipTrigger
      trigger={trigger}
      placement={placement}
      modifiers={modifiers}
      delayShow={delayShow}
      delayHide={delayHide}
      {...props}
      tooltip={({
        arrowRef,
        tooltipRef,
        getArrowProps,
        getTooltipProps,
        placement,
      }): JSX.Element => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            className: cx(
              containerStyle,
              Boolean(icon) && containerWithIconStyle,
              className,
            ),
          })}
        >
          {!hideArrow && (
            <div
              {...getArrowProps({
                ref: arrowRef,
                className: [classNameArrow],
                'data-placement': placement,
              })}
            />
          )}
          <TooltipWrapper>{tooltip}</TooltipWrapper>
          {icon && (
            <IconWrapper onClick={iconAction} data-action={Boolean(iconAction)}>
              {icon}
            </IconWrapper>
          )}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }): JSX.Element => (
        <>
          <span
            {...getTriggerProps({
              ref: triggerRef,
              className: cx(triggerStyle, classNameTrigger),
            })}
          >
            {children}
          </span>
        </>
      )}
    </TooltipTrigger>
  ) : (
    <>{children}</>
  );
