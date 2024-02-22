import cn from 'classnames';
import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { Droplist } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../../helpers';
import { getSelectProductListProps } from '../../../../hooks/useSelectProductList';
import { useLinks, useSearch } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import styles from './styles.modules.scss';

export function DrawerMenuDesktop({
  open,
  onClose,
  links,
  footerLinks,
  pinnedCards,
  allProducts,
  selectedProduct,
  onProductChange,
}: DrawerMenuProps) {
  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visiblePinnedCards = useMemo(() => pinnedCards?.filter(filterHidden), [pinnedCards]);
  const visibleLinks = useMemo(() => filterHiddenLinks(links), [links]);

  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links: visibleLinks });

  const {
    cardsRef,
    scrollRef,
    searchPanelRef,
    addScrollHandler,
    removeScrollHandler,
    isLinkSelected,
    handleLinkClick,
  } = useLinks({
    links: visibleLinks,
    searchValue,
    setSearchValue,
    drawerOpen: open,
  });

  const showRightSection = visibleLinks?.length || visiblePinnedCards;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrappedClick = useCallback(
    ({ disabled, onClick }: { disabled?: boolean; onClick?(e?: MouseEvent<HTMLElement>): void }) =>
      (e?: MouseEvent<HTMLElement>) => {
        e?.preventDefault();

        if (disabled) {
          return;
        }

        onClose();

        onClick?.(e);
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
      data-test-id='header__drawer-menu'
    >
      <div className={styles.drawerBody}>
        <div className={styles.menu}>
          <div className={styles.leftWrapper}>
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.selectProduct}>
                  <Droplist
                    size='m'
                    {...getSelectProductListProps({ allProducts, onProductChange, selectedProduct })}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <div
                      className={styles.select}
                      tabIndex={0}
                      role={'menu'}
                      data-open={isOpen || undefined}
                      // onKeyDown={handleSelectKeyDown}
                      // ref={navigateOutsideRef}
                      data-test-id='header__drawer-menu-select'
                    >
                      <div className={styles.logo}>
                        {selectedProduct.logo ?? (
                          <Avatar size='xs' name={selectedProduct.name} showTwoSymbols shape='square' />
                        )}
                      </div>

                      <div className={styles.selectedSection}>
                        <div
                          className={styles.selectedHeading}
                          data-test-id='header__drawer-menu-select-product-category'
                        >
                          {selectedProduct.category}
                        </div>

                        <div className={styles.selectedOption} data-test-id='header__drawer-menu-select-product-name'>
                          <TruncateString text={selectedProduct.name} hideTooltip />
                        </div>
                      </div>

                      <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>
                    </div>
                  </Droplist>
                </div>

                <Scroll>
                  {visibleLinks && visibleLinks.length && (
                    <div className={styles.links}>
                      {visibleLinks.map(link => (
                        <Link
                          key={link.id}
                          text={link.label}
                          href={'#' + link.id}
                          target={'_self'}
                          onClick={handleLinkClick(link)}
                          size='m'
                          textMode={isLinkSelected(link) ? 'accent' : 'default'}
                          appearance={isLinkSelected(link) ? 'primary' : 'neutral'}
                          data-test-id={`header__drawer-menu-link-${link.id}`}
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
                    <ButtonFunction
                      {...link}
                      onClick={wrappedClick(link)}
                      key={link.label}
                      iconPosition='before'
                      size='m'
                    />
                  ))}
                </div>
              )}
            </div>

            {showRightSection && <Divider orientation='vertical' />}
          </div>

          {showRightSection && (
            <div className={styles.right} onMouseEnter={addScrollHandler} onMouseLeave={removeScrollHandler}>
              <Scroll ref={scrollRef}>
                <div className={styles.rightContent}>
                  {visiblePinnedCards && (
                    <div className={cn(styles.pinnedCards, styles.rightContentItem)}>
                      {visiblePinnedCards.map(item => (
                        <Card
                          className={styles.pinnedCard}
                          key={item.title}
                          onClick={wrappedClick(item)}
                          disabled={item.disabled}
                          href={item.href}
                          header={<Card.Header title={item.title ?? ''} />}
                        >
                          {item.description}
                        </Card>
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
                        data-test-id='header__drawer-menu-search'
                      />
                    </div>
                  )}

                  {filteredLinks &&
                    filteredLinks.map((group, index) => (
                      <div className={styles.rightContentItem} key={group.id}>
                        <GroupCard id={group.id} title={group.label} ref={el => (cardsRef.current[index] = el)}>
                          {group.items.map(item => (
                            <Card
                              outline
                              key={item.label}
                              onClick={wrappedClick(item)}
                              disabled={item.disabled}
                              href={item.href}
                              header={
                                <Card.Header
                                  title={item.label ?? ''}
                                  emblem={{ icon: item.icon, decor: false }}
                                  size='s'
                                />
                              }
                              size='s'
                            />
                          ))}
                        </GroupCard>
                      </div>
                    ))}

                  {filteredLinks?.length === 0 && (
                    <div className={styles.rightContentItem}>
                      <div className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</div>
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
