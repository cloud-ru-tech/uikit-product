import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { error, extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import { isEllipsisActive } from '../../helpers';
import * as S from './styled';

export type TruncateStringEndProps = WithSupportProps<{
  className?: string;
  hideTooltip?: boolean;
  maxLines?: number;
  placement?: TooltipProps['placement'];
  tag: Tag;
  text: string;
  textClassName: string;
}>;

export function TruncateStringEnd({
  text,
  className,
  hideTooltip,
  textClassName,
  tag,
  maxLines = 1,
  placement = Tooltip.placements.Auto,
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

  const textElement = (
    <S.Text as={tag} ref={textElementRef} maxLines={maxLines} className={textClassName} {...extractSupportProps(rest)}>
      {text}
    </S.Text>
  );

  if (showTooltip && !hideTooltip) {
    error(showTooltip, 'Text is too long');

    return (
      <Tooltip content={text} placement={placement} type={Tooltip.types.Truncated} classNameTrigger={className}>
        {textElement}
      </Tooltip>
    );
  }

  return <S.Wrapper className={className}>{textElement}</S.Wrapper>;
}
