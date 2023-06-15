import { cx } from '@linaria/core';
import { ReactElement, ReactNode } from 'react';

import { Link, LinkProps } from '@sbercloud/uikit-product-link';
import {
  Placements,
  TooltipPrivate,
  TooltipPrivateProps,
  TriggerTypes,
} from '@sbercloud/uikit-product-tooltip-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DELAY, OFFSET } from '../../constants';
import { TooltipType } from '../../helpers/types';
import {
  classNameArrow,
  containerClassName,
  containerWithIconClassName,
  IconWrapper,
  Text,
  Title,
  TooltipWrapper,
} from './styled';

export type TooltipProps = {
  children: TooltipPrivateProps['children'];
  type: TooltipType;
  title?: string;
  content?: ReactNode;
  icon?: ReactElement;
  iconAction?(): void;
  className?: string;
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  link?: LinkProps;
  trigger?: TooltipPrivateProps['trigger'];
};

export function Tooltip({
  title,
  content,
  link,
  children,
  classNameTrigger,
  className,
  placement = Placements.Top,
  icon,
  iconAction,
  type,
  trigger = TriggerTypes.Hover,
  ...rest
}: WithSupportProps<TooltipProps>) {
  return (
    <TooltipPrivate
      {...extractSupportProps(rest)}
      trigger={trigger}
      placement={placement}
      offset={OFFSET}
      delayShow={DELAY[type]}
      delayHide={100}
      classNameContainer={cx(className, containerClassName, Boolean(icon) && containerWithIconClassName)}
      classNameArrow={classNameArrow}
      classNameTrigger={classNameTrigger}
      tooltip={
        <>
          <TooltipWrapper>
            {title && <Title>{title}</Title>}
            {content && <Text>{content}</Text>}
            {link?.text && <Link showSuffixIcon variant={Link.variants.OnDark} {...link} />}
          </TooltipWrapper>
          {icon && (
            <IconWrapper
              onClick={iconAction}
              data-action={Boolean(iconAction)}
              data-test-action-id='tooltip__action_element'
            >
              {icon}
            </IconWrapper>
          )}
        </>
      }
    >
      {children}
    </TooltipPrivate>
  );
}

Tooltip.types = TooltipType;
Tooltip.triggers = TriggerTypes;
Tooltip.placements = Placements;
