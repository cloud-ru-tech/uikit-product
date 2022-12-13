import throttle from 'lodash.throttle';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Scroll } from '@sbercloud/uikit-product-scroll';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { useSidebarContext } from '../../contexts';
import { filterBySearch, isItemAccordion, textProvider, Texts } from '../../helpers';
import { SidebarItem, SidebarLevel } from '../../types';
import { Accordion } from '../Accordion';
import { ListItem } from '../ListItem';
import { ListItemCollapsed } from '../ListItemCollapsed';
import * as S from './styled';

type ListProps = {
  level: SidebarLevel;
  isFooter?: boolean;
};

export function List({ isFooter, level }: ListProps) {
  const { handleItemClick, currentLevel, search, isSearchDirty, isCollapsed } = useSidebarContext();
  const { languageCode } = useLanguage();

  const scrollableRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFading, setShowFading] = useState({
    top: false,
    bottom: false,
  });

  const updateFadingVisibility = useMemo(
    () =>
      throttle(() => {
        if (isFooter) return;

        if (scrollableRef.current) {
          const { scrollHeight, scrollTop, clientHeight } = scrollableRef.current;
          const scroll = scrollHeight - scrollTop - clientHeight;

          setShowFading({
            top: scrollTop > 0,
            bottom: scroll !== 0,
          });
        }
      }, 200),
    [isFooter],
  );

  useEffect(() => {
    if (isFooter) {
      return;
    }

    let observer: ResizeObserver;

    if (contentRef.current) {
      observer = new ResizeObserver(updateFadingVisibility);

      observer.observe(contentRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [isFooter, updateFadingVisibility]);

  const showSearchResults = level === currentLevel && isSearchDirty;
  const searchResults = useMemo(() => {
    if (showSearchResults) {
      return filterBySearch(level.list, search);
    }

    return [];
  }, [showSearchResults, level.list, search]);

  const renderItems = ({ item }: { item: SidebarItem }) => {
    if (isCollapsed) {
      return <ListItemCollapsed key={item.id} item={item} />;
    }

    if (isItemAccordion(item)) {
      return <Accordion key={item.id} item={item} accordionLevel={0} />;
    }

    return <ListItem key={item.id} {...item} onClick={handleItemClick(item)} />;
  };

  const content = (
    <S.Content data-footer={isFooter || undefined} ref={contentRef} data-collapsed={isCollapsed || undefined}>
      {showSearchResults && (
        <>
          <S.ItemsList>{searchResults.map(item => renderItems({ item }))}</S.ItemsList>
          {searchResults.length === 0 && <S.NoDataLabel>{textProvider(languageCode, Texts.NoDataFound)}</S.NoDataLabel>}
        </>
      )}
      {level.list.map((group, groupIndex) => (
        <S.GroupWrapper key={group.heading || group.items[0].id} data-hidden={showSearchResults || undefined}>
          {group.heading && !isCollapsed && (
            <S.Heading data-first-on-inner-level={(level.depth > 0 && groupIndex === 0) || undefined}>
              {group.heading}
            </S.Heading>
          )}

          <S.ItemsList data-footer={isFooter}>{group.items.map(item => renderItems({ item }))}</S.ItemsList>
        </S.GroupWrapper>
      ))}
    </S.Content>
  );

  return (
    <S.ListWrap
      data-show-top-fading={showFading.top || undefined}
      data-show-bottom-fading={showFading.bottom || undefined}
      data-footer={isFooter || undefined}
    >
      {isFooter ? (
        content
      ) : (
        <Scroll size={Scroll.sizes.Small} onScroll={updateFadingVisibility} ref={scrollableRef}>
          {content}
        </Scroll>
      )}
    </S.ListWrap>
  );
}
