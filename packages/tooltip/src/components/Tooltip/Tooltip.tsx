import { cx } from '@linaria/core';

import { Link, LinkProps } from '@sbercloud/uikit-react-link';
import { Placements, TooltipPrivate, TooltipPrivateProps, TriggerTypes } from '@sbercloud/uikit-react-tooltip-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { DELAY, OFFSET } from '../../constants';
import { TooltipType } from '../../helpers/types';
import {
  IconWrapper,
  Text,
  Title,
  TooltipWrapper,
  classNameArrow,
  containerClassName,
  containerWithIconClassName,
} from './styled';

export type TooltipProps = {
  children: TooltipPrivateProps['children'];
  title?: string;
  content?: string | React.ReactNode;
  icon?: React.ReactElement;
  iconAction?(): void;
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  type?: TooltipType;
  link?: LinkProps;
  trigger?: TooltipPrivateProps['trigger'];
};

export const Tooltip = ({
  title,
  content,
  link,
  children,
  classNameTrigger,
  placement = Placements.Top,
  icon,
  iconAction,
  type = TooltipType.Main,
  trigger = TriggerTypes.Hover,
  ...rest
}: WithSupportProps<TooltipProps>) => (
  <TooltipPrivate
    {...extractSupportProps(rest)}
    trigger={trigger}
    placement={placement}
    offset={OFFSET}
    delayShow={DELAY[type]}
    delayHide={100}
    classNameContainer={cx(containerClassName, Boolean(icon) && containerWithIconClassName)}
    classNameArrow={classNameArrow}
    classNameTrigger={classNameTrigger}
    tooltip={
      <>
        <TooltipWrapper>
          {title && <Title>{title}</Title>}
          {content && <Text>{content}</Text>}
          {link?.text && <Link showIcon variant={Link.variants.OnDark} {...link} />}
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

Tooltip.types = TooltipType;
Tooltip.triggers = TriggerTypes;
Tooltip.placements = Placements;
