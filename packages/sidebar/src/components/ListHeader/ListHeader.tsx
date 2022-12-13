import { useEffect, useRef } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Search } from '@sbercloud/uikit-product-search';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import { useSidebarContext } from '../../contexts';
import { SidebarLevel } from '../../types';
import { BackButton } from '../BackButton';
import { ListItem } from '../ListItem';
import { ListItemCollapsed } from '../ListItemCollapsed';
import * as S from './styled';

type ListHeaderProps = {
  level: SidebarLevel;
  levelIndex: number;
};

const TRANSITION_END_EVENT = 'transitionend';

export function ListHeader({ level, levelIndex }: ListHeaderProps) {
  const { handleItemClick, isSearchShown, search, setSearch, openSearch, isCollapsed } = useSidebarContext();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = searchWrapRef.current;
    const search = searchRef.current;

    if (!search || !wrapper) {
      return;
    }

    const handler = () => isSearchShown && search.focus();
    wrapper.addEventListener(TRANSITION_END_EVENT, handler);

    return () => wrapper.removeEventListener(TRANSITION_END_EVENT, handler);
  }, [isSearchShown]);

  return (
    <div data-test-id='sidebar__header'>
      <BackButton levelIndex={levelIndex} />

      {isCollapsed ? (
        level.title && (
          <Tooltip content={level.title.label} type={Tooltip.types.Tip} placement={Tooltip.placements.Right}>
            <ListItemCollapsed item={level.title} />
          </Tooltip>
        )
      ) : (
        <S.Title>
          <S.TitleWrap data-hide={isSearchShown || undefined}>
            {level.title && (
              <ListItem
                id={level.title.id}
                label={level.title.label}
                icon={level.title.icon}
                href={level.title.href ?? '#'}
                onClick={handleItemClick(level.title)}
              />
            )}

            <S.SearchButton
              icon={<SearchInterfaceSVG />}
              onClick={openSearch}
              data-test-id='sidebar__header__open-search-button'
            />
          </S.TitleWrap>

          <S.SearchWrap
            ref={searchWrapRef}
            data-show={isSearchShown || undefined}
            data-test-id='sidebar__header__search'
          >
            <Search ref={searchRef} size={Search.sizes.Small} value={search} onChange={setSearch} />
          </S.SearchWrap>
        </S.Title>
      )}

      <S.DividerWrap data-hide={isSearchShown || undefined}>
        <Divider />
      </S.DividerWrap>
    </div>
  );
}
