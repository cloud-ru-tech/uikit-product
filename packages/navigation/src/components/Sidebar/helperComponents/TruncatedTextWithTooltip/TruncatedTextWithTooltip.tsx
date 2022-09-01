import { cx } from '@linaria/core';
import { ReactText, useState } from 'react';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import * as S from './styled';

export type TruncatedTextWithTooltipProps = {
  children: ReactText;
  className?: string;
};

const isEllipsisActive = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.offsetWidth < element.scrollWidth;
};

export function TruncatedTextWithTooltip({ children, className, ...rest }: TruncatedTextWithTooltipProps) {
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
        placement={Tooltip.placements.Right}
        type={Tooltip.types.Truncated}
        classNameTrigger={cx(S.truncatedClassName, className)}
      >
        {spanElement}
      </Tooltip>
    );
  }

  return spanElement;
}
