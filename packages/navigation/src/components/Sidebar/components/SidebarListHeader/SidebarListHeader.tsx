import { useEffect, useMemo, useRef } from 'react';

import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { CloseInterfaceSVG, MenuCloseFullInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Search } from '@sbercloud/uikit-product-search';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { useSidebarContext } from '../../context';
import { findSelected } from '../../helpers';
import { SidebarLevel } from '../../types';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

type SidebarListHeaderProps = {
  level: SidebarLevel;
  levelIndex: number;
};

export function SidebarListHeader({ level, levelIndex }: SidebarListHeaderProps) {
  const { languageCode } = useLanguage();
  const { handleBackClick, selected, currentLevel, search, setSearch, openSearch, closeSearch, isSearchShown } =
    useSidebarContext();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = searchWrapRef.current;
    const search = searchRef.current;
    if (!search || !wrapper) return;

    const handler = () => isSearchShown && search.focus();
    const transitionEndEvent = 'transitionend';
    wrapper.addEventListener(transitionEndEvent, handler);
    return () => wrapper.removeEventListener(transitionEndEvent, handler);
  }, [isSearchShown]);

  const onCurrentLevel = levelIndex === currentLevel;

  const isNestedSelected = useMemo(() => {
    if (onCurrentLevel && level.title) {
      const found = findSelected(level.title, selected, 1);

      return Boolean(found);
    }

    return false;
  }, [onCurrentLevel, level.title, selected]);

  const backButtonText = levelIndex > 1 ? Texts.SidebarBackButton : Texts.SidebarBackToPlatforms;

  return (
    <div>
      {isSearchShown ? (
        <S.BackButton
          variant={ButtonGhost.variants.Tertiary}
          iconPosition={ButtonGhost.iconPosition.Before}
          text={textProvider(languageCode, Texts.SidebarCloseSearch)}
          icon={<CloseInterfaceSVG />}
          onClick={closeSearch}
        />
      ) : (
        <S.BackButton
          variant={ButtonGhost.variants.Tertiary}
          iconPosition={ButtonGhost.iconPosition.Before}
          text={textProvider(languageCode, backButtonText)}
          icon={<MenuCloseFullInterfaceSVG />}
          onClick={handleBackClick}
        />
      )}

      <S.Title>
        <S.TitleWrap data-hide={isSearchShown || undefined}>
          {level.title && (
            <SidebarItem
              selected={onCurrentLevel && !isNestedSelected}
              id={level.title.id}
              text={level.title.text}
              icon={level.title.icon}
            />
          )}

          <ButtonIcon icon={<SearchInterfaceSVG />} onClick={openSearch} />
        </S.TitleWrap>

        <S.SearchWrap ref={searchWrapRef} data-show={isSearchShown || undefined}>
          <Search ref={searchRef} size={Search.sizes.Small} value={search} onChange={setSearch} />
        </S.SearchWrap>
      </S.Title>

      <S.DividerWrap data-hide={isSearchShown || undefined}>
        <Divider />
      </S.DividerWrap>
    </div>
  );
}
