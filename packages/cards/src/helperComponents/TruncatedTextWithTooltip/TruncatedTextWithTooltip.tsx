import { cx } from '@linaria/core';
import { ReactText, useState } from 'react';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { error } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum Tag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P = 'p',
  Span = 'span',
}

export type TruncatedTextWithTooltipProps = {
  tag?: Tag;
  children?: ReactText;
  className?: string;
  maxLines?: number;
  text?: string;
  containerClassName?: string;
  containerTag?: Tag;
};

const isEllipsisActive = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.offsetHeight < element.scrollHeight;
};

export function TruncatedTextWithTooltip({ children, tag, className, ...rest }: TruncatedTextWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  function setText(textElement: HTMLElement | null) {
    setShowTooltip(isEllipsisActive(textElement));
  }

  const Element: keyof JSX.IntrinsicElements = tag || Tag.H3;

  const textElement = (
    <Element ref={setText} className={cx(S.elementClassName, className)} {...rest}>
      {children}
    </Element>
  );

  if (showTooltip) {
    error(showTooltip, 'Card Text is too long');

    return (
      <Tooltip content={children} placement={Tooltip.placements.Top} type={Tooltip.types.Truncated}>
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}

TruncatedTextWithTooltip.containerTags = Tag;
