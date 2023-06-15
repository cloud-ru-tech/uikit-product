import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import { isEllipsisActive, truncateStringMiddle } from '../../helpers';
import * as S from './styled';

export type TruncateStringMiddleProps = WithSupportProps<{
  className?: string;
  hideTooltip?: boolean;
  placement?: TooltipProps['placement'];
  tag: Tag;
  text: string;
  textClassName: string;
}>;

export function TruncateStringMiddle({
  text,
  className,
  hideTooltip,
  tag,
  textClassName,
  placement = Tooltip.placements.Auto,
  ...rest
}: TruncateStringMiddleProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [truncatedString, setTruncatedString] = useState(text);
  const textElementRef = useRef<HTMLElement>(null);
  const truncatedTextElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const setTruncate = debounce(() => {
      setTruncatedString(
        truncateStringMiddle({
          element: textElementRef.current,
          truncatedElement: truncatedTextElementRef.current,
          text,
        }),
      );
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
    <>
      <S.FullText as={tag} ref={textElementRef} className={textClassName}>
        {text}
      </S.FullText>
      <S.TruncatedText as={tag} ref={truncatedTextElementRef} className={textClassName}>
        {truncatedString}
      </S.TruncatedText>
    </>
  );

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      {showTooltip && !hideTooltip ? (
        <Tooltip content={text} placement={placement} type={Tooltip.types.Truncated}>
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </S.Wrapper>
  );
}
