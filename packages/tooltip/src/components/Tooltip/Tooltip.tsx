import { cx } from '@linaria/core';
import { Placements, TooltipPrivate, TooltipPrivateProps } from '@sbercloud/uikit-react-tooltip-private';

import {
  IconWrapper,
  TooltipWrapper,
  containerClassName,
  containerWithIconClassName,
  triggerClassName,
} from './styled';

const DEFAULT_MODIFIERS = [
  {
    name: 'offset',
    enabled: true,
    options: {
      offset: [0, 8],
    },
  },
];

export interface TooltipProps {
  tooltip?: TooltipPrivateProps['tooltip'];
  children: TooltipPrivateProps['children'];
  icon?: React.ReactNode | JSX.Element;
  iconAction?: () => void;
  hideArrow?: boolean;
  className?: string;
  classNameTrigger?: string;
  classNameArrow?: string;
  classNameWrapper?: string;
  modifiers?: TooltipPrivateProps['modifiers'];
  delayShow?: TooltipPrivateProps['delayShow'];
  delayHide?: TooltipPrivateProps['delayHide'];
  placement?: TooltipPrivateProps['placement'];
  trigger?: TooltipPrivateProps['trigger'];
  tooltipShown?: TooltipPrivateProps['tooltipShown'];
  getTooltipRef?: TooltipPrivateProps['getTooltipRef'];
}

export const Tooltip = ({
  children,
  tooltip,
  hideArrow = true,
  className,
  classNameTrigger,
  classNameArrow,
  classNameWrapper,
  modifiers = DEFAULT_MODIFIERS,
  delayShow = 300,
  delayHide = 300,
  placement = Placements.TopStart,
  trigger = 'hover',
  icon,
  iconAction,
}: TooltipProps) => (
  <TooltipPrivate
    trigger={trigger}
    placement={placement}
    modifiers={modifiers}
    delayShow={delayShow}
    delayHide={delayHide}
    hideArrow={hideArrow}
    classNameContainer={cx(containerClassName, Boolean(icon) && containerWithIconClassName, className)}
    classNameArrow={classNameArrow}
    classNameTrigger={cx(triggerClassName, classNameTrigger)}
    tooltip={
      <>
        <TooltipWrapper className={classNameWrapper}>{tooltip}</TooltipWrapper>
        {icon && (
          <IconWrapper onClick={iconAction} data-action={Boolean(iconAction)}>
            {icon}
          </IconWrapper>
        )}
      </>
    }
  >
    {children}
  </TooltipPrivate>
);

Tooltip.placements = Placements;
