import React, { ReactElement } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { Link } from '@snack-uikit/link';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';

import { textProvider, Texts } from '../../../../helpers';
import { GroupCard, SelectProduct, SelectProductsProps } from './components';
import { useLinks, useSearch } from './hooks';
import styles from './styles.modules.scss';
import { LinksGroup } from './types';

type PinnedCard = {
  title: string;
  description: string;
  onClick(): void;
};

type FooterLink = {
  icon: ReactElement;
  label: string;
  onClick(): void;
};

export type DrawerMenuProps = {
  open: boolean;
  onClose(): void;
  links?: LinksGroup[];
  pinnedCards?: PinnedCard[];
  footerLinks?: FooterLink[];
  allProducts: SelectProductsProps['options'];
  selectedProduct: SelectProductsProps['selectedItem'];
  onProductChange: SelectProductsProps['onChange'];
};

export function DrawerMenu({
  open,
  onClose,
  links,
  footerLinks,
  pinnedCards,
  allProducts,
  selectedProduct,
  onProductChange,
}: DrawerMenuProps) {
  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links });
  const { cardsRef, scrollRef, addScrollHandler, removeScrollHandler, isLinkSelected, handleLinkClick } = useLinks({
    links,
    searchValue,
    setSearchValue,
  });
  const showRightSection = links || pinnedCards;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
                  <SelectProduct selectedItem={selectedProduct} onChange={onProductChange} options={allProducts} />
                </div>

                <Scroll>
                  {links && (
                    <div className={styles.links}>
                      {links.map(link => (
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

              {footerLinks && (
                <div className={styles.footerLinks}>
                  <div className={styles.footerLinksDivider}>
                    <Divider />
                  </div>

                  {footerLinks.map(link => (
                    <ButtonFunction
                      key={link.label}
                      icon={link.icon}
                      iconPosition='before'
                      label={link.label}
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
                  {pinnedCards && (
                    <div className={styles.pinnedCards}>
                      {pinnedCards.map(item => (
                        <Card
                          className={styles.pinnedCard}
                          key={item.title}
                          onClick={item.onClick}
                          header={<Card.Header title={item.title ?? ''} />}
                        >
                          {item.description}
                        </Card>
                      ))}
                    </div>
                  )}

                  {links && (
                    <Search
                      size='m'
                      placeholder={textProvider(languageCode, Texts.SearchByServices)}
                      value={searchValue}
                      onChange={setSearchValue}
                      data-test-id='header__drawer-menu-search'
                    />
                  )}

                  {filteredLinks &&
                    filteredLinks.map((group, index) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        title={group.label}
                        ref={el => (cardsRef.current[index] = el)}
                      >
                        {group.items.map(item => (
                          <Card
                            outline
                            key={item.label}
                            onClick={item.onClick}
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
                    ))}

                  {filteredLinks?.length === 0 && (
                    <div className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</div>
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
