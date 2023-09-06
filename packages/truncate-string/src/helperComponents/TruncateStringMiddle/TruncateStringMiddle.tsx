import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import { isEllipsisActive, truncateStringMiddle } from '../../helpers';
import * as S from './styled';

export type TruncateStringMiddleProps = WithSupportProps<{
  className?: string;
  typographyClassName: string;
  hideTooltip?: boolean;
  placement?: TooltipProps['placement'];
  tag: Tag;
  text: string;
  disableTooltipMaxWidth?: boolean;
}>;

export function TruncateStringMiddle({
  text,
  className,
  typographyClassName,
  hideTooltip,
  tag,
  placement = Tooltip.placements.Auto,
  disableTooltipMaxWidth = false,
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
      <S.FullText as={tag} ref={textElementRef} className={typographyClassName}>
        {text}
      </S.FullText>
      <S.TruncatedText as={tag} ref={truncatedTextElementRef} className={typographyClassName}>
        {truncatedString}
      </S.TruncatedText>
    </>
  );

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      {showTooltip && !hideTooltip ? (
        <Tooltip
          content={text}
          placement={placement}
          type={Tooltip.types.Truncated}
          disableMaxWidth={disableTooltipMaxWidth}
        >
          {textElement}
        </Tooltip>
      ) : (
        textElement
      )}
    </S.Wrapper>
  );
}
