import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import { isEllipsisActive, truncateStringMiddle } from '../../helpers';
import * as S from './styled';

export type TruncateStringMiddleProps = WithSupportProps<{
  text: string;
  className?: string;
  hideTooltip?: boolean;
  tag?: Tag;
  placement?: TooltipProps['placement'];
}>;

export function TruncateStringMiddle({
  text,
  className,
  hideTooltip,
  tag = Tag.Span,
  placement = Tooltip.placements.Auto,
  ...rest
}: TruncateStringMiddleProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [truncatedString, setTruncatedString] = useState(text);
  const textElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const setTruncate = debounce(() => {
      setTruncatedString(truncateStringMiddle(textElementRef.current, text));
      setShowTooltip(isEllipsisActive(textElementRef.current));
    }, 50);

    const observer = new ResizeObserver(setTruncate);

    if (textElementRef.current) {
      observer.observe(textElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [showTooltip, tag, text, hideTooltip]);

  const textElement = (
    <S.Container {...extractSupportProps(rest)}>
      <S.Display as={tag}>{truncatedString}</S.Display>
      <S.FullText as={tag} ref={textElementRef}>
        {text}
      </S.FullText>
    </S.Container>
  );

  if (showTooltip && !hideTooltip) {
    return (
      <Tooltip content={text} placement={placement} type={Tooltip.types.Truncated} classNameTrigger={className}>
        {textElement}
      </Tooltip>
    );
  }

  if (hideTooltip) {
    return <S.Wrapper className={className}>{textElement}</S.Wrapper>;
  }

  return (
    <S.Container {...extractSupportProps(rest)}>
      <S.Display as={tag} className={className}>
        {truncatedString}
      </S.Display>
      <S.FullText as={tag} ref={textElementRef} className={className}>
        {text}
      </S.FullText>
    </S.Container>
  );
}
