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
  disableContainerMaxWidthClassName,
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
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  link?: LinkProps;
  trigger?: TooltipPrivateProps['trigger'];
  disableMaxWidth?: boolean;
  visible?: boolean;
};

export function Tooltip({
  title,
  content,
  link,
  children,
  classNameTrigger,
  placement = Placements.Top,
  icon,
  iconAction,
  type,
  trigger = TriggerTypes.Hover,
  disableMaxWidth = false,
  visible,
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
      classNameContainer={cx(
        containerClassName,
        Boolean(icon) && containerWithIconClassName,
        Boolean(disableMaxWidth) && disableContainerMaxWidthClassName,
      )}
      classNameArrow={classNameArrow}
      classNameTrigger={classNameTrigger}
      visible={visible}
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
