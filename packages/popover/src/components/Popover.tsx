import { ReactNode } from 'react';

import {
  Placements,
  TooltipPrivate,
  TooltipPrivateProps,
  TriggerTypes,
} from '@sbercloud/uikit-product-tooltip-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DELAY_HIDE, DELAY_SHOW, OFFSET } from './constants';
import { classNameArrow, containerClassName, PopoverWrapper } from './styled';

export type PopoverProps = {
  children: TooltipPrivateProps['children'];
  content: ReactNode;
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  visible?: boolean;
};

export function Popover({
  content,
  children,
  classNameTrigger,
  placement = Placements.Top,
  visible,
  ...rest
}: WithSupportProps<PopoverProps>) {
  const isUncontrolled = visible === undefined;

  return (
    <TooltipPrivate
      {...extractSupportProps(rest)}
      trigger={null}
      visible={visible}
      {...(isUncontrolled && { trigger: TriggerTypes.Click, closeOnOutsideClick: true, closeOnTriggerHidden: true })}
      placement={placement}
      offset={OFFSET}
      delayShow={DELAY_SHOW}
      delayHide={DELAY_HIDE}
      classNameContainer={containerClassName}
      classNameArrow={classNameArrow}
      classNameTrigger={classNameTrigger}
      tooltip={<PopoverWrapper>{content}</PopoverWrapper>}
    >
      {children}
    </TooltipPrivate>
  );
}

Popover.placements = Placements;
