import { ReactText, Ref, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Colors, Sizes } from '../../constants';
import { Tag, TagProps } from '../Tag';
import { TagCloud } from '../TagCloud';
import { HiddenRow, TagCloudTrigger, TagWrapper, VisibleRow, Wrapper } from './styled';

function renderTag(
  props: Partial<TagProps>,
  handleRemoveItem?: (item: TagRowItem['value']) => () => void,
  setRef?: (item: TagRowItem) => Ref<HTMLDivElement>,
) {
  return (item: TagRowItem) => (
    <TagWrapper key={item.value} ref={setRef?.(item)}>
      <Tag
        color={item.color}
        size={props.size}
        value={item.value}
        onRemoveClick={handleRemoveItem && handleRemoveItem(item.value)}
      />
    </TagWrapper>
  );
}

export type TagRowItem = {
  value: ReactText;
  color: Colors;
};

export type TagRowProps = WithSupportProps<{
  items: TagRowItem[];
  size?: Sizes;
  className?: string;
  onItemRemove?(item: TagRowItem['value']): void;
}>;

export function TagRow({ items, size, className, onItemRemove, ...rest }: TagRowProps) {
  const [visibilityByItem, setVisibilityByItem] = useState(() => new Map<TagRowItem, boolean>());
  const uniqueItems = useMemo(() => [...new Map(items.map(item => [item.value, item])).values()], [items]);
  const tagElementByItem = useMemo(() => new Map<TagRowItem, HTMLElement>(), []);
  const hiddenRowElementRef = useRef<HTMLDivElement>(null);
  const visibilityByItemEntries = [...visibilityByItem.entries()];
  const visibleItems = visibilityByItemEntries.filter(([, isVisible]) => isVisible).map(([item]) => item);
  const cloudedItems = visibilityByItemEntries.filter(([, isVisible]) => !isVisible).map(([item]) => item);

  function setTagElement(item: TagRowItem) {
    return (tagElement: HTMLElement | null) => {
      if (tagElement === null) {
        tagElementByItem.delete(item);
      } else {
        tagElementByItem.set(item, tagElement);
      }
    };
  }

  const handleRemoveItem = onItemRemove ? (item: TagRowItem['value']) => () => onItemRemove(item) : undefined;

  useLayoutEffect(() => {
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      setVisibilityByItem(prevVisibilityByItem => {
        const nextVisibilityByItem = new Map(prevVisibilityByItem.entries());
        const entryByTagElement = new Map(entries.map(entry => [entry.target as HTMLElement, entry]));

        for (const [item, tagElement] of tagElementByItem.entries()) {
          if (entryByTagElement.has(tagElement)) {
            const entry = entryByTagElement.get(tagElement)!;

            nextVisibilityByItem.set(item, entry.isIntersecting);
          }
        }

        return nextVisibilityByItem;
      });
    }

    const hiddenRowElement = hiddenRowElementRef.current!;
    const observer = new IntersectionObserver(handleIntersect, {
      root: hiddenRowElement,
      rootMargin: '0px -48px 0px 0px',
      threshold: 1,
    });

    for (const hiddenTagElement of hiddenRowElement.children) {
      observer.observe(hiddenTagElement);
    }

    return () => {
      observer.disconnect();
      setVisibilityByItem(new Map());
    };
  }, [uniqueItems, size, tagElementByItem]);

  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      <HiddenRow ref={hiddenRowElementRef}>
        {uniqueItems.map(renderTag({ size }, handleRemoveItem, setTagElement))}
      </HiddenRow>
      <VisibleRow>{visibleItems.map(renderTag({ size }, handleRemoveItem))}</VisibleRow>
      {cloudedItems.length > 0 && (
        <TagCloud content={cloudedItems.map(renderTag({ size }, handleRemoveItem))}>
          <TagCloudTrigger
            color={Tag.colors.Gray}
            size={size}
            value={`+${cloudedItems.length}`}
            data-test-id='tag-cloud-trigger'
          />
        </TagCloud>
      )}
    </Wrapper>
  );
}

TagRow.colors = Colors;
TagRow.sizes = Sizes;
