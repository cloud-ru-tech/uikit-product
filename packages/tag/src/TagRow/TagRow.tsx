import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TooltipPrivate } from '@sbercloud/uikit-react-tooltip-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Tag } from '../Tag';
import * as S from './styled';

export type TagRowProps = {
  tags: string[];
  className?: string;
};

export function TagRow({ tags, className, ...rest }: WithSupportProps<TagRowProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [L, setL] = useState(0);
  const [R, setR] = useState(tags.length);
  const [tagsFitAmount, setTagsFitAmount] = useState(tags.length);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;
    if (containerRef.current?.offsetWidth > wrapperRef.current.offsetWidth - 48) {
      setR(tagsFitAmount);
    } else {
      setL(tagsFitAmount);
    }
  }, [tagsFitAmount]);

  useEffect(() => {
    if (L + 1 === R) return;
    const sum = L + R;
    const mid = (sum - (sum % 2)) / 2;
    setTagsFitAmount(mid);
  });

  useEffect(() => {
    if (L + 1 === R) setTagsFitAmount(L);
  });

  useEffect(() => {
    const resize = debounce(() => {
      setL(0);
      setR(tags.length);
      setTagsFitAmount(tags.length);
    }, 300);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [tags.length]);

  const dataHidden = useMemo(() => !(L + 1 === R && tagsFitAmount === L), [L, R, tagsFitAmount]);

  return (
    <S.Tags className={className} data-hidden={dataHidden} {...extractSupportProps(rest)} ref={wrapperRef}>
      <S.TagsWrap ref={containerRef}>
        {tags.slice(0, tagsFitAmount).map(tag => (
          <Tag key={tag} value={tag} className={S.tagClassName} type={Tag.types.Card} />
        ))}
      </S.TagsWrap>
      {tagsFitAmount !== tags.length && (
        <TooltipPrivate
          delayHide={200}
          hideArrow
          placement={TooltipPrivate.placements.Auto}
          classNameContainer={S.tooltipContainerClassName}
          classNameTrigger={S.tooltipTriggerClassName}
          tooltip={
            <S.TooltipContent>
              {tags.slice(tagsFitAmount).map(tag => (
                <Tag key={tag} value={tag} className={S.tagClassName} type={Tag.types.Card} />
              ))}
            </S.TooltipContent>
          }
        >
          <Tag value={`+${tags.length - tagsFitAmount}`} className={S.triggerTagClassName} type={Tag.types.Card} />
        </TooltipPrivate>
      )}
    </S.Tags>
  );
}
