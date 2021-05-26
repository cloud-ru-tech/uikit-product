import debounce from 'lodash.debounce';
import { FC, useEffect, useRef, useState } from 'react';

import { truncateString } from '../helpers/truncateString';
import { Display, FullText, Wrapper } from './styled';

export interface ITruncateStringProps {
  ellipsisString?: string;
  truncateAt?: number;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TruncateString: FC<ITruncateStringProps> = ({
  ellipsisString = '...',
  truncateAt = 50,
  text = '',
  style,
  className,
}) => {
  const componentEl = useRef<HTMLDivElement>(null);
  const textEl = useRef<HTMLSpanElement>(null);
  const ellipsisEl = useRef<HTMLSpanElement>(null);
  const [truncatedString, setTruncatingString] = useState('');

  const getTruncateString = (text: string): string => {
    const measurements = {
      component: componentEl?.current?.offsetWidth || 0,
      ellipsis: ellipsisEl?.current?.offsetWidth || 0,
      text: textEl?.current?.offsetWidth || 0,
    };

    return truncateString({
      measurements,
      text,
      ellipsisString,
      leftPercentage: truncateAt,
    });
  };

  const setTruncate = (): void => {
    const str = getTruncateString(text);
    setTruncatingString(str);
  };

  const resetTruncate = debounce(setTruncate, 50);
  useEffect(setTruncate, [componentEl?.current?.offsetWidth]);

  useEffect(() => {
    window.addEventListener('resize', resetTruncate);

    return () => {
      window.removeEventListener('resize', resetTruncate);
    };
  }, []);

  return (
    <Wrapper ref={componentEl} style={style} className={className}>
      <Display>{truncatedString}</Display>
      <FullText>
        <span ref={textEl}>{text}</span>
        <span ref={ellipsisEl}>{ellipsisString}</span>
      </FullText>
    </Wrapper>
  );
};
