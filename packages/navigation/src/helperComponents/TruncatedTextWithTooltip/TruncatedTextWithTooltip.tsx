import { cx } from '@linaria/core';
import { ReactText, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';

import * as S from './styled';

export type TruncatedTextWithTooltipProps = {
  placement?: TooltipProps['placement'];
  children: ReactText;
  className?: string;
};

const isEllipsisActive = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.offsetWidth < element.scrollWidth;
};

export function TruncatedTextWithTooltip({
  placement = Tooltip.placements.Right,
  children,
  className,
  ...rest
}: TruncatedTextWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  function setText(textElement: HTMLElement | null) {
    setShowTooltip(isEllipsisActive(textElement));
  }

  const spanElement = (
    <span ref={setText} className={cx(S.truncatedClassName, className)} {...rest}>
      {children}
    </span>
  );

  if (showTooltip) {
    return (
      <Tooltip
        content={children}
        placement={placement}
        type={Tooltip.types.Truncated}
        classNameTrigger={cx(S.truncatedClassName, className)}
      >
        {spanElement}
      </Tooltip>
    );
  }

  return spanElement;
}

TruncatedTextWithTooltip.placements = Tooltip.placements;
