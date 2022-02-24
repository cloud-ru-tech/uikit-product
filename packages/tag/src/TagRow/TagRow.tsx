import { useEffect, useMemo, useRef, useState } from 'react';

import { TooltipPrivate } from '@sbercloud/uikit-react-tooltip-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Tag } from '../Tag';
import * as S from './styled';

function renderTag(tag: string) {
  return <Tag key={tag} value={tag} className={S.tagClassName} type={Tag.types.Card} />;
}

export type TagRowProps = {
  tags: string[];
  className?: string;
};

export function TagRow({ tags, className, ...rest }: WithSupportProps<TagRowProps>) {
  const [visibilityByTag, setVisibilityByTag] = useState(() => new Map<string, boolean>());
  const hiddenTagsWrapElementRef = useRef<HTMLDivElement>(null);
  const uniqueTags = useMemo(() => [...new Set(tags)], [tags]);
  const visibilityByTagEntries = [...visibilityByTag.entries()];
  const visibleTags = visibilityByTagEntries.filter(([, isVisible]) => isVisible).map(([tag]) => tag);
  const invisibleTags = visibilityByTagEntries.filter(([, isVisible]) => !isVisible).map(([tag]) => tag);

  useEffect(() => {
    setVisibilityByTag(new Map());
  }, [uniqueTags]);

  useEffect(() => {
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      setVisibilityByTag(prevVisibilityByTag => {
        const nextVisibilityByTag = new Map(prevVisibilityByTag.entries());
        const entryByTag = new Map(entries.map(entry => [entry.target.textContent, entry]));

        for (const tag of uniqueTags) {
          if (entryByTag.has(tag)) {
            const entry = entryByTag.get(tag)!;

            nextVisibilityByTag.set(tag, entry.isIntersecting);
          }
        }

        return nextVisibilityByTag;
      });
    }

    const hiddenTagsWrapElement = hiddenTagsWrapElementRef.current!;
    const observer = new IntersectionObserver(handleIntersect, {
      root: hiddenTagsWrapElement,
      rootMargin: '0px -48px 0px 0px',
      threshold: 1,
    });

    for (const hiddenTagElement of hiddenTagsWrapElement.children) {
      observer.observe(hiddenTagElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [uniqueTags]);

  return (
    <S.Tags className={className} {...extractSupportProps(rest)}>
      <S.HiddenTagsWrap ref={hiddenTagsWrapElementRef}>{uniqueTags.map(renderTag)}</S.HiddenTagsWrap>
      <S.TagsWrap>{visibleTags.map(renderTag)}</S.TagsWrap>
      {invisibleTags.length > 0 && (
        <TooltipPrivate
          delayHide={200}
          hideArrow
          placement={TooltipPrivate.placements.Auto}
          classNameContainer={S.tooltipContainerClassName}
          classNameTrigger={S.tooltipTriggerClassName}
          tooltip={<S.TooltipContent>{invisibleTags.map(renderTag)}</S.TooltipContent>}
        >
          <Tag value={`+${invisibleTags.length}`} className={S.triggerTagClassName} type={Tag.types.Card} />
        </TooltipPrivate>
      )}
    </S.Tags>
  );
}
