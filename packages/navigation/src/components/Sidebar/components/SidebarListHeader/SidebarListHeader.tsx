import { useEffect, useRef } from 'react';

import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { CloseInterfaceSVG, MenuCloseFullInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Search } from '@sbercloud/uikit-product-search';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { useSidebarContext } from '../../context';
import { SidebarLevel } from '../../types';
import { SidebarCollapsedItem } from '../SidebarCollapsedItem';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

type SidebarListHeaderProps = {
  level: SidebarLevel;
  levelIndex: number;
};

export function SidebarListHeader({ level, levelIndex }: SidebarListHeaderProps) {
  const { languageCode } = useLanguage();
  const { handleBackClick, isSearchShown, search, setSearch, openSearch, closeSearch, isCollapsed } =
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

  const backButtonText = textProvider(
    languageCode,
    levelIndex > 1 ? Texts.SidebarBackButton : Texts.SidebarBackToPlatforms,
  );

  return (
    <div>
      {isCollapsed ? (
        <>
          <Tooltip content={backButtonText} type={Tooltip.types.Tip} placement={Tooltip.placements.Right}>
            <S.BackButtonWrapper>
              <ButtonIcon
                icon={<MenuCloseFullInterfaceSVG />}
                variant={ButtonIcon.variants.Color}
                onClick={handleBackClick}
              />
            </S.BackButtonWrapper>
          </Tooltip>

          {level.title && (
            <Tooltip content={level.title.label} type={Tooltip.types.Tip} placement={Tooltip.placements.Right}>
              <SidebarCollapsedItem item={level.title} />
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <S.BackButtonWrapper>
            {isSearchShown ? (
              <ButtonGhost
                variant={ButtonGhost.variants.Tertiary}
                iconPosition={ButtonGhost.iconPosition.Before}
                text={textProvider(languageCode, Texts.SidebarCloseSearch)}
                icon={<CloseInterfaceSVG />}
                onClick={closeSearch}
              />
            ) : (
              <ButtonGhost
                variant={ButtonGhost.variants.Tertiary}
                iconPosition={ButtonGhost.iconPosition.Before}
                text={backButtonText}
                icon={<MenuCloseFullInterfaceSVG />}
                onClick={handleBackClick}
              />
            )}
          </S.BackButtonWrapper>

          <S.Title>
            <S.TitleWrap data-hide={isSearchShown || undefined}>
              {level.title && (
                <SidebarItem
                  id={level.title.id}
                  label={level.title.label}
                  icon={level.title.icon}
                  href='#'
                  isHeaderItem
                />
              )}

              <ButtonIcon icon={<SearchInterfaceSVG />} onClick={openSearch} />
            </S.TitleWrap>

            <S.SearchWrap ref={searchWrapRef} data-show={isSearchShown || undefined}>
              <Search ref={searchRef} size={Search.sizes.Small} value={search} onChange={setSearch} />
            </S.SearchWrap>
          </S.Title>
        </>
      )}

      <S.DividerWrap data-hide={isSearchShown || undefined}>
        <Divider />
      </S.DividerWrap>
    </div>
  );
}
