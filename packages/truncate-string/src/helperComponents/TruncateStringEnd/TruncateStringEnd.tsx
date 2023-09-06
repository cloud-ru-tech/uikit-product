import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { error, extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import { isEllipsisActive } from '../../helpers';
import * as S from './styled';

export type TruncateStringEndProps = WithSupportProps<{
  className?: string;
  typographyClassName: string;
  hideTooltip?: boolean;
  maxLines?: number;
  placement?: TooltipProps['placement'];
  tag: Tag;
  text: string;
  disableTooltipMaxWidth?: boolean;
}>;

export function TruncateStringEnd({
  text,
  className,
  typographyClassName,
  hideTooltip,
  tag,
  maxLines = 1,
  placement = Tooltip.placements.Auto,
  disableTooltipMaxWidth = false,
  ...rest
}: TruncateStringEndProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const textElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const setText = debounce(() => setShowTooltip(isEllipsisActive(textElementRef.current)), 50);

    const observer = new ResizeObserver(setText);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, hideTooltip, tag]);

  const tooltipVisible = showTooltip && !hideTooltip;
  const TextElement = maxLines > 1 ? S.TextMultiLine : S.TextOneLine;

  const textElement = (
    <TextElement
      as={tag}
      ref={textElementRef}
      maxLines={maxLines}
      className={tooltipVisible ? typographyClassName : cx(className, typographyClassName)}
      {...extractSupportProps(rest)}
    >
      {text}
    </TextElement>
  );

  if (tooltipVisible) {
    error(showTooltip, 'Text is too long');

    return (
      <Tooltip
        content={text}
        placement={placement}
        type={Tooltip.types.Truncated}
        classNameTrigger={cx(className, S.tooltipTriggerClassName)}
        disableMaxWidth={disableTooltipMaxWidth}
      >
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}
