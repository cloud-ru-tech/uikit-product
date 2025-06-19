import { MouseEvent, useCallback, useMemo, useRef, useState } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { HotSpot } from '@snack-uikit/hot-spot';
import { Link } from '@snack-uikit/link';
import { Droplist } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';

import { getSelectProductListProps } from '../../../../helpers';
import { extractAppNameFromId } from '../../../../utils';
import { MarketplaceBannerCard } from '../../../MarketplaceBannerCard';
import { ReferralBannerCard } from '../../../ReferralBannerCard';
import { useLinks, useLinksScrollToSelected } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { SearchSettingsButton } from '../SearchSettingsButton';
import { SearchSettingsChips } from '../SearchSettingsChips';
import styles from './styles.module.scss';

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
  allProducts,
  selectedProduct,
  onProductChange,
  selectedLink,
  onLinkChange,
  favorites,
  marketplaceBanner,
  referralBanner,
  onSearchChange,
  hideProductSelect = false,
}: DrawerMenuProps) {
  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visibleProducts = useMemo(() => filterHiddenLinks(allProducts) ?? [], [allProducts]);
  const {
    searchValue,
    setSearchValue,
    rightSectionLinks,
    leftSectionLinks,
    searchSettings,
    setSearchSettings,
    areSearchSettingsVisible,
    setAreSearchSettingsVisible,
  } = useLinks({ links, favorites });

  const { cardsRef, scrollRef, searchPanelRef, handleLinkClick } = useLinksScrollToSelected({
    links: leftSectionLinks,
    searchValue,
    setSearchValue,
    drawerOpen: open,
    highlightClassName: styles.highlight,
  });

  const showRightSection = leftSectionLinks?.length || marketplaceBanner || referralBanner;

  const rightContainerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const hasChoice = useMemo(
    () => visibleProducts.reduce((acc, group) => acc + group.items.length, 0) > 1,
    [visibleProducts],
  );

  const searchChangeHandler = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearchChange?.(value);
    },
    [onSearchChange, setSearchValue],
  );

  const { t } = useLocale('Header');

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
        if (disabled) {
          e?.preventDefault();
          return;
        }

        if (!e?.metaKey) {
          e?.preventDefault();
          onClose();
        }

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
                {!hideProductSelect && (
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
                    widthStrategy='gte'
                    triggerElemRef={triggerRef}
                  >
                    <ProductSelectTrigger
                      ref={triggerRef}
                      isOpen={isOpen}
                      selectedProduct={selectedProduct}
                      hasChoice={hasChoice}
                      dataTestIdPostfix='platform'
                    />
                  </Droplist>
                )}

                <Scroll>
                  {leftSectionLinks && leftSectionLinks.length && (
                    <div className={styles.links}>
                      {leftSectionLinks.map(link => (
                        <Link
                          key={link.id}
                          text={link.label.text}
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
                <div
                  className={styles.rightContent}
                  data-padding-top={!leftSectionLinks || undefined}
                  ref={rightContentRef}
                >
                  {leftSectionLinks && (
                    <div className={styles.searchItem} ref={searchPanelRef}>
                      <Search
                        size='m'
                        placeholder={t('searchByServices')}
                        value={searchValue}
                        onChange={searchChangeHandler}
                        data-test-id='header__drawer-menu__search'
                        className={styles.search}
                        postfix={
                          <SearchSettingsButton
                            onClick={() => setAreSearchSettingsVisible(prevOpen => !prevOpen)}
                            showHotSpot
                          />
                        }
                      />
                      {areSearchSettingsVisible && (
                        <SearchSettingsChips settings={searchSettings} onSettingsChange={setSearchSettings} />
                      )}
                    </div>
                  )}

                  {!searchValue && (
                    <div className={styles.bannersWrapper}>
                      {referralBanner && (
                        <ReferralBannerCard
                          title={t('referralBannerTitle')}
                          text={t('referralBannerText')}
                          promoBadge={t('referralBannerTag')}
                          href={referralBanner.href}
                          onClick={wrappedClick({ onClick: referralBanner.onClick })}
                        />
                      )}

                      {marketplaceBanner && (
                        <MarketplaceBannerCard
                          title={t('mkpBannerTitle')}
                          text={t('mkpBannerText')}
                          href={marketplaceBanner.href}
                          onClick={wrappedClick({ onClick: marketplaceBanner.onClick })}
                        />
                      )}
                    </div>
                  )}

                  {rightSectionLinks &&
                    rightSectionLinks.map((group, index) => (
                      <div className={styles.rightContentItem} key={group.id}>
                        <GroupCard
                          title={group.label}
                          id={group.id}
                          ref={el => (cardsRef.current[index] = el)}
                          onClose={onClose}
                        >
                          {group.items.map(item => {
                            const checked = favorites?.value.includes(item.id);
                            const onChange = favorites?.onChange(item.id);

                            return (
                              <CardServiceSmall
                                checked={item.id === selectedLink}
                                outline
                                promoBadge={item.badge}
                                favorite={{
                                  enabled: Boolean(favorites),
                                  visibilityStrategy: 'hover',
                                  checked,
                                  onChange,
                                }}
                                key={item.label}
                                onClick={wrappedClick(item, () => onLinkChange?.(item.id))}
                                disabled={item.disabled}
                                href={item.href}
                                emblem={{ icon: item.icon, decor: true }}
                                title={item.label}
                                data-test-id={`header__drawer-menu__link-${extractAppNameFromId(item.id)}`}
                              />
                            );
                          })}
                        </GroupCard>
                      </div>
                    ))}

                  {rightSectionLinks?.length === 0 && (
                    <div className={styles.rightContentItem}>
                      <div className={styles.noData} data-test-id='header__drawer-menu__no-data'>
                        {t('noData')}
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
