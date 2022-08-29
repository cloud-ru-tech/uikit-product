import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TRANSITION_TIMING } from '../../constants';
import { useSidebarContext } from '../../context';
import { Mode, SidebarItemProps, SidebarItemsGroup } from '../../types';
import { SidebarAccordion } from '../SidebarAccordion';
import { SidebarCollapsedItem } from '../SidebarCollapsedItem';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

type SidebarListProps = {
  list: SidebarItemsGroup[];
  levelIndex: number;
  isFooter?: boolean;
};

export function SidebarList({ list, isFooter, levelIndex }: SidebarListProps) {
  const { handleItemClick, currentLevel, search, isCollapsed } = useSidebarContext();

  const scrollableRef = useRef<HTMLDivElement>(null);
  const [showFading, setShowFading] = useState({
    top: false,
    bottom: false,
  });

  const updateFadingVisibility = useCallback(() => {
    if (isFooter) return;

    if (scrollableRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = scrollableRef.current;
      const scroll = scrollHeight - scrollTop - clientHeight;

      setShowFading({
        top: scrollTop > 0,
        bottom: scroll !== 0,
      });
    }
  }, [isFooter]);

  useEffect(() => {
    if (isFooter) {
      return;
    }

    const timeout = setTimeout(updateFadingVisibility, TRANSITION_TIMING.common); // delay for possible css-transitions

    return () => {
      clearTimeout(timeout);
    };
  }, [isFooter, updateFadingVisibility]);

  const showSearchResults = currentLevel === levelIndex && Boolean(search.length);
  const searchResults = useMemo(() => {
    if (showSearchResults) {
      const flatList = list.flatMap(list => list.items);

      return flatList.filter(it => it.text.includes(search));
    }

    return [];
  }, [showSearchResults, list, search]);

  const renderItems = (item: SidebarItemProps) => {
    if (isCollapsed) {
      return <SidebarCollapsedItem key={item.id} item={item} onClick={handleItemClick(item)} />;
    }

    if (item.mode === Mode.Accordion && item.nestedList?.length) {
      return <SidebarAccordion key={item.id} item={item} accordionLevel={0} />;
    }

    return (
      <SidebarItem
        key={item.id}
        id={item.id}
        icon={item.icon}
        text={item.text}
        href={item.href}
        disabled={item.disabled}
        isNew={item.isNew}
        isLocked={item.isLocked}
        mode={item.mode}
        count={item.count}
        onClick={handleItemClick(item)}
      />
    );
  };

  return (
    <S.ListWrap
      data-show-top-fading={showFading.top || undefined}
      data-show-bottom-fading={showFading.bottom || undefined}
    >
      <S.Scrollable
        data-collapsed={isCollapsed || undefined}
        data-footer={isFooter || undefined}
        onScroll={!isFooter ? updateFadingVisibility : undefined}
        ref={scrollableRef}
      >
        {showSearchResults ? (
          <S.ItemsList>{searchResults.map(renderItems)}</S.ItemsList>
        ) : (
          list.map((group, groupIndex) => (
            <div key={group.heading || group.items[0].id}>
              {group.heading && !isCollapsed && (
                <S.Heading data-first-on-inner-level={(levelIndex > 0 && groupIndex === 0) || undefined}>
                  {group.heading}
                </S.Heading>
              )}

              <S.ItemsList data-footer={isFooter}>{group.items.map(renderItems)}</S.ItemsList>
            </div>
          ))
        )}
      </S.Scrollable>
    </S.ListWrap>
  );
}
