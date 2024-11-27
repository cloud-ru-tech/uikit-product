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
import { BannerCard } from '../../../BannerCard';
import { useLinks } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { useLinksScrollToSelected } from './hooks';
import styles from './styles.module.scss';

export function DrawerMenuMobile({
  open,
  onClose,
  links,
  footerLinks,
  onProductChange: onProductChangeProp,
  allProducts,
  selectedLink,
  onLinkChange,
  favorites,
  onMarketplaceBannerClick,
  ...rest
}: DrawerMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visibleProducts = useMemo(() => filterHiddenLinks(allProducts) ?? [], [allProducts]);
  const { searchValue, setSearchValue, rightSectionLinks, leftSectionLinks } = useLinks({ links, favorites });

  const { cardsRef } = useLinksScrollToSelected({
    links: leftSectionLinks,
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
            <ProductSelectTrigger
              selectedProduct={rest.selectedProduct}
              className={styles.trigger}
              onClick={toggleInnerDrawer}
              hasChoice={hasChoice}
            />

            {leftSectionLinks && (
              <Search
                size='m'
                placeholder={textProvider(languageCode, Texts.SearchByServices)}
                value={searchValue}
                onChange={setSearchValue}
                data-test-id='header__drawer-menu__search'
              />
            )}

            {!searchValue && onMarketplaceBannerClick && (
              <BannerCard
                title={textProvider(languageCode, Texts.MkpBannerTitle)}
                promoBadge={textProvider(languageCode, Texts.MkpBannerCount)}
                onClick={wrappedClick({ onClick: onMarketplaceBannerClick })}
                isMobile
              />
            )}

            {rightSectionLinks &&
              rightSectionLinks.map((group, index) => (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  title={group.label}
                  ref={el => (cardsRef.current[index] = el)}
                  mobile
                >
                  {group.items.map(item => {
                    const checked = favorites?.value.includes(item.id);
                    const onChange = favorites?.onChange(item.id);

                    return (
                      <CardServiceSmall
                        checked={item.id === selectedLink}
                        outline
                        key={item.label}
                        promoBadge={item.badge}
                        favorite={{ enabled: Boolean(favorites), visibilityStrategy: 'always', checked, onChange }}
                        onClick={wrappedClick(item, () => onLinkChange?.(item.id))}
                        title={item.label}
                        emblem={{ icon: item.icon, decor: true }}
                        data-test-id={`header__drawer-menu__link-${extractAppNameFromId(item.id)}`}
                      />
                    );
                  })}
                </GroupCard>
              ))}

            {rightSectionLinks?.length === 0 && (
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
