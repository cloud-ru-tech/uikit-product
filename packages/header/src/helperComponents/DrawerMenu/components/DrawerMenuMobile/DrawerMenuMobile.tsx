import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';

import { textProvider, Texts } from '../../../../helpers';
import { getSelectProductListProps } from '../../../../hooks/useSelectProductList';
import { ProductOption } from '../../../../types';
import { extractAppNameFromId } from '../../../../utils';
import { PinnedCard } from '../../../PinnedCard';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { useLinks, useSearch } from './hooks';
import styles from './styles.modules.scss';

export function DrawerMenuMobile({
  open,
  onClose,
  links,
  footerLinks,
  onProductChange: onProductChangeProp,
  allProducts,
  selectedLink,
  onLinkChange,
  pinnedCards,
  ...rest
}: DrawerMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visibleLinks = useMemo(() => filterHiddenLinks(links), [links]);
  const visibleProducts = useMemo(() => filterHiddenLinks(allProducts) ?? [], [allProducts]);
  const visiblePinnedCards = useMemo(() => pinnedCards?.filter(filterHidden), [pinnedCards]);

  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links: visibleLinks });
  const { cardsRef } = useLinks({
    links: visibleLinks,
    searchValue,
    setSearchValue,
  });

  const hasChoice = useMemo(
    () => visibleProducts.reduce((acc, group) => acc + group.items.length, 0) > 1,
    [visibleProducts],
  );

  const [innerOpen, setInnerOpen] = useState(false);

  const toggleInnerDrawer = () =>
    setInnerOpen(prev => {
      if (!prev && !hasChoice) {
        return false;
      }
      return !prev;
    });

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

  const onProductChange = useCallback(
    (product: ProductOption) => {
      setInnerOpen(false);
      onProductChangeProp(product);
    },
    [onProductChangeProp],
  );

  return (
    <>
      <DrawerCustom
        open={open}
        onClose={onClose}
        className={styles.drawer}
        position='left'
        size='s'
        push={{ distance: 8 }}
        nestedDrawer={
          <DrawerCustom open={innerOpen} onClose={toggleInnerDrawer} position='left'>
            <DrawerCustom.Header title={textProvider(languageCode, Texts.Platforms)} className={styles.nestedHeader} />

            <List
              {...getSelectProductListProps({
                ...rest,
                allProducts: visibleProducts,
                onProductChange,
              })}
              className={styles.nestedList}
              size='m'
            />
          </DrawerCustom>
        }
      >
        <DrawerCustom.Header title={textProvider(languageCode, Texts.Navigation)} className={styles.nestedHeader} />

        <Scroll>
          <div className={styles.content}>
            {visiblePinnedCards?.map(item => (
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
                size='s'
                data-test-id={`header__drawer-menu__pinned-card-${extractAppNameFromId(item.id)}`}
              />
            ))}

            <ProductSelectTrigger
              selectedProduct={rest.selectedProduct}
              className={styles.trigger}
              onClick={toggleInnerDrawer}
              hasChoice={hasChoice}
            />

            {visibleLinks && (
              <Search
                size='m'
                placeholder={textProvider(languageCode, Texts.SearchByServices)}
                value={searchValue}
                onChange={setSearchValue}
                data-test-id='header__drawer-menu__search'
              />
            )}

            {filteredLinks &&
              filteredLinks.map((group, index) => (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  title={group.label}
                  ref={el => (cardsRef.current[index] = el)}
                  mobile
                >
                  {group.items.map(item => (
                    <CardServiceSmall
                      checked={item.id === selectedLink}
                      outline
                      key={item.label}
                      promoBadge={item.badge}
                      onClick={wrappedClick(item, () => onLinkChange?.(item.id))}
                      title={item.label}
                      emblem={{ icon: item.icon, decor: true }}
                      data-test-id={`header__drawer-menu__link-${extractAppNameFromId(item.id)}`}
                    />
                  ))}
                </GroupCard>
              ))}

            {filteredLinks?.length === 0 && (
              <div className={styles.noData} data-test-id='header__drawer-menu__no-data'>
                {textProvider(languageCode, Texts.NoData)}
              </div>
            )}

            {visibleFooterLinks && (
              <div className={styles.footerLinks}>
                <div className={styles.footerLinksDivider}>
                  <Divider />
                </div>

                {visibleFooterLinks.map(link => (
                  <ButtonFunction
                    {...link}
                    key={link.label}
                    iconPosition='before'
                    size='m'
                    onClick={wrappedClick(link)}
                    data-test-id={`header__drawer-menu__footer-link-${extractAppNameFromId(link.id)}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Scroll>
      </DrawerCustom>
    </>
  );
}
