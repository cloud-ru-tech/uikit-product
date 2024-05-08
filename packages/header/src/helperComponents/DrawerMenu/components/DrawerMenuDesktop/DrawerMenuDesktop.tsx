import cn from 'classnames';
import { MouseEvent, useCallback, useMemo, useRef, useState } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { HotSpot } from '@snack-uikit/hot-spot';
import { Link } from '@snack-uikit/link';
import { Droplist } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../../helpers';
import { getSelectProductListProps } from '../../../../hooks/useSelectProductList';
import { extractAppNameFromId } from '../../../../utils';
import { PinnedCard } from '../../../PinnedCard';
import { useLinks, useSearch } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import styles from './styles.modules.scss';

/**
 * Если в правой части контент превышает высоту окна на эту долю,
 * будут отображаться скролящие ссылки слева.
 */
// const CONTENT_OVERFLOW_SCROLLING_LINKS_LIMIT = 0.33;

export function DrawerMenuDesktop({
  open,
  onClose,
  links,
  footerLinks,
  pinnedCards,
  allProducts,
  selectedProduct,
  onProductChange,
  selectedLink,
  onLinkChange,
}: DrawerMenuProps) {
  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visiblePinnedCards = useMemo(() => pinnedCards?.filter(filterHidden), [pinnedCards]);
  const visibleProducts = useMemo(() => filterHiddenLinks(allProducts) ?? [], [allProducts]);
  const visibleLinks = useMemo(() => filterHiddenLinks(links), [links]);
  const [
    showScrollLinks,
    // setShowScrollLinks
  ] = useState(true);

  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links: visibleLinks });

  const { cardsRef, scrollRef, searchPanelRef, handleLinkClick } = useLinks({
    links: visibleLinks,
    searchValue,
    setSearchValue,
    drawerOpen: open,
    highlightClassName: styles.highlight,
  });

  const showRightSection = visibleLinks?.length || visiblePinnedCards;

  const rightContainerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!open || !showRightSection || !rightContainerRef.current || !rightContentRef.current) {
  //     return;
  //   }

  //   const containerHeight = rightContainerRef.current.offsetHeight;
  //   const contentHeight = rightContentRef.current.offsetHeight;

  //   if (contentHeight - containerHeight > contentHeight * CONTENT_OVERFLOW_SCROLLING_LINKS_LIMIT) {
  //     setShowScrollLinks(true);
  //   }
  // }, [showRightSection, open]);

  const hasChoice = useMemo(
    () => visibleProducts.reduce((acc, group) => acc + group.items.length, 0) > 1,
    [visibleProducts],
  );

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [isOpen, setIsOpenValue] = useState<boolean>(false);

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (value && !hasChoice) {
        return;
      }

      setIsOpenValue(value);
    },
    [hasChoice],
  );

  const wrappedClick = useCallback(
    ({ disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void }, cb?: () => void) =>
      (e?: MouseEvent<HTMLElement>) => {
        e?.preventDefault();

        if (disabled) {
          return;
        }

        onClose();

        onClick?.(e);

        cb?.();
      },
    [onClose],
  );

  return (
    <DrawerCustom
      position='left'
      size={showRightSection ? 'm' : 's'}
      open={open}
      onClose={onClose}
      className={styles.drawer}
      rootClassName={styles.drawerRoot}
      data-small={!showRightSection || undefined}
      data-test-id='header__drawer-menu'
    >
      <div className={styles.drawerBody}>
        <div className={styles.menu}>
          <div className={styles.leftWrapper} data-test-id='header__drawer-menu__left'>
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.selectProduct}>
                  <Droplist
                    size='m'
                    {...getSelectProductListProps({
                      allProducts: visibleProducts,
                      onProductChange,
                      selectedProduct,
                      closeDropList: () => setIsOpen(false),
                    })}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    widthStrategy='eq'
                  >
                    <div
                      className={styles.select}
                      tabIndex={hasChoice ? 0 : -1}
                      role={'menu'}
                      data-open={isOpen || undefined}
                      data-active={hasChoice || undefined}
                      data-test-id='header__drawer-menu__select'
                    >
                      <div className={styles.logo}>
                        {selectedProduct.logo ?? (
                          <Avatar size='xs' name={selectedProduct.name} showTwoSymbols shape='square' />
                        )}
                      </div>

                      <div className={styles.selectedSection}>
                        <div
                          className={styles.selectedHeading}
                          data-test-id='header__drawer-menu__select__product-category'
                        >
                          {selectedProduct.category}
                        </div>

                        <div className={styles.selectedOption} data-test-id='header__drawer-menu__select__product-name'>
                          <TruncateString text={selectedProduct.name} hideTooltip />
                        </div>
                      </div>

                      {hasChoice && (
                        <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>
                      )}
                    </div>
                  </Droplist>
                </div>

                <Scroll>
                  {showScrollLinks && visibleLinks && visibleLinks.length && (
                    <div className={styles.links}>
                      {visibleLinks.map(link => (
                        <Link
                          key={link.id}
                          text={link.label}
                          href={'#' + link.id}
                          target={'_self'}
                          onClick={handleLinkClick(link)}
                          size='m'
                          textMode='default'
                          appearance='neutral'
                          data-test-id={`header__drawer-menu__link-anchor-${extractAppNameFromId(link.id)}`}
                        />
                      ))}
                    </div>
                  )}
                </Scroll>
              </div>

              {visibleFooterLinks && (
                <div className={styles.footerLinks}>
                  <div className={styles.footerLinksDivider}>
                    <Divider />
                  </div>

                  {visibleFooterLinks.map(link => (
                    <HotSpot {...link.hotSpot} key={link.label} enabled={link?.hotSpot?.enabled ?? false}>
                      <ButtonFunction
                        {...link}
                        iconPosition='before'
                        size='m'
                        onClick={wrappedClick(link)}
                        data-test-id={`header__drawer-menu__footer-link-${extractAppNameFromId(link.id)}`}
                      />
                    </HotSpot>
                  ))}
                </div>
              )}
            </div>

            {showRightSection && <Divider orientation='vertical' />}
          </div>

          {showRightSection && (
            <div className={styles.right} ref={rightContainerRef} data-test-id='header__drawer-menu__right'>
              <Scroll ref={scrollRef} barHideStrategy='never'>
                <div className={styles.rightContent} ref={rightContentRef}>
                  {visiblePinnedCards && (
                    <div className={cn(styles.pinnedCards, styles.rightContentItem)}>
                      {visiblePinnedCards.map(item => (
                        <PinnedCard
                          key={item.id}
                          id={item.id}
                          promoBadge={item.badge}
                          className={styles.pinnedCard}
                          onClick={wrappedClick(item)}
                          disabled={item.disabled}
                          href={item.href}
                          title={item.title}
                          description={item.description}
                          data-test-id={`header__drawer-menu__pinned-card-${extractAppNameFromId(item.id)}`}
                        />
                      ))}
                    </div>
                  )}

                  {visibleLinks && (
                    <div className={cn(styles.rightContentItem, styles.searchItem)} ref={searchPanelRef}>
                      <Search
                        size='m'
                        placeholder={textProvider(languageCode, Texts.SearchByServices)}
                        value={searchValue}
                        onChange={setSearchValue}
                        data-test-id='header__drawer-menu__search'
                      />
                    </div>
                  )}

                  {filteredLinks &&
                    filteredLinks.map((group, index) => (
                      <div className={styles.rightContentItem} key={group.id}>
                        <GroupCard title={group.label} id={group.id} ref={el => (cardsRef.current[index] = el)}>
                          {group.items.map(item => (
                            <CardServiceSmall
                              checked={item.id === selectedLink}
                              outline
                              promoBadge={item.badge}
                              key={item.label}
                              onClick={wrappedClick(item, () => onLinkChange?.(item.id))}
                              disabled={item.disabled}
                              href={item.href}
                              emblem={{ icon: item.icon, decor: true }}
                              title={item.label}
                              data-test-id={`header__drawer-menu__link-${extractAppNameFromId(item.id)}`}
                            />
                          ))}
                        </GroupCard>
                      </div>
                    ))}

                  {filteredLinks?.length === 0 && (
                    <div className={styles.rightContentItem}>
                      <div className={styles.noData} data-test-id='header__drawer-menu__no-data'>
                        {textProvider(languageCode, Texts.NoData)}
                      </div>
                    </div>
                  )}
                </div>
              </Scroll>
            </div>
          )}
        </div>
      </div>
    </DrawerCustom>
  );
}
