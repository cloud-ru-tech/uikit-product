import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { SearchSVG, VerticalMenuRightCloseSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ButtonElevated, ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';
import { Typography } from '@snack-uikit/typography';

import { getSelectProductListProps } from '../../../../helpers';
import { Organization, ProductOption } from '../../../../types';
import { extractAppNameFromId } from '../../../../utils';
import { MarketplaceBannerCard } from '../../../MarketplaceBannerCard';
import { ReferralBannerCard } from '../../../ReferralBannerCard';
import { SelectMenu, SelectProps } from '../../../SelectMenu';
import { useLinks } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { useLinksScrollToSelected, useSearchAnimation } from './hooks';
import styles from './styles.module.scss';

type DrawerMenuMobileProps = DrawerMenuProps & {
  isProjectMenuOpen: boolean;
  handleProjectMenuOpen(open: boolean): void;
  select?: Pick<SelectProps, 'projects' | 'onProjectChange' | 'selectedProject' | 'closeDropdown' | 'onOpenChange'>;
  organizations?: Organization[];
};

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
  onReferralBannerClick,
  onSearchChange,
  hideProductSelect = false,
  handleProjectMenuOpen,
  isProjectMenuOpen,
  select,
  organizations,
  ...rest
}: DrawerMenuMobileProps) {
  const { t } = useLocale('Header');
  const visibleFooterLinks = useMemo(() => footerLinks?.filter(filterHidden), [footerLinks]);
  const visibleProducts = useMemo(() => filterHiddenLinks(allProducts) ?? [], [allProducts]);
  const { searchValue, setSearchValue, rightSectionLinks, leftSectionLinks } = useLinks({ links, favorites });

  const { cardsRef } = useLinksScrollToSelected({
    links: leftSectionLinks,
    searchValue,
    setSearchValue,
  });

  const { searchRef, animationState, toggleSearchActive, isSearchActive, searchInputTabIndex } = useSearchAnimation();

  const hasChoice = useMemo(
    () => visibleProducts.reduce((acc, group) => acc + group.items.length, 0) > 1,
    [visibleProducts],
  );

  const [platformSelectOpen, setPlatformSelectOpen] = useState(false);

  const togglePlatformSelect = () =>
    setPlatformSelectOpen(prev => {
      if (!prev && !hasChoice) {
        return false;
      }
      return !prev;
    });

  const toggleProjectSelect = () => handleProjectMenuOpen(!isProjectMenuOpen);

  const searchChangeHandler = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearchChange?.(value);
    },
    [onSearchChange, setSearchValue],
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

  const onProductChange = useCallback(
    (product: ProductOption) => {
      setPlatformSelectOpen(false);
      onProductChangeProp(product);
    },
    [onProductChangeProp],
  );

  const onSelectOpenChange = (open: boolean) => {
    if (!open) {
      toggleProjectSelect();
    }
  };

  return (
    <>
      <DrawerCustom
        open={open}
        onClose={onClose}
        className={styles.drawer}
        position='left'
        size='s'
        push={{ distance: 8 }}
      >
        <DrawerCustom.Header title={t('navigation')} className={styles.nestedHeader} />

        <Scroll>
          <div className={styles.content}>
            {!hideProductSelect && (
              <ProductSelectTrigger
                selectedProduct={rest.selectedProduct}
                className={styles.trigger}
                onClick={togglePlatformSelect}
                hasChoice={hasChoice}
              />
            )}

            {select && (
              <ProductSelectTrigger
                selectedProduct={{
                  id: select.selectedProject?.id ?? '',
                  name: select.selectedProject?.name ?? '',
                  category: t('project'),
                }}
                className={styles.trigger}
                onClick={toggleProjectSelect}
                hasChoice
              />
            )}

            {leftSectionLinks && (
              <div className={styles.searchWrap}>
                <Typography.SansTitleM>{t('services')}</Typography.SansTitleM>

                <div
                  className={styles.search}
                  data-transition-status={animationState.status}
                  data-is-mounted={animationState.isMounted || undefined}
                >
                  <Search
                    size='m'
                    placeholder={t('searchByServices')}
                    value={searchValue}
                    onChange={searchChangeHandler}
                    data-test-id='header__drawer-menu__search'
                    ref={searchRef}
                    tabIndex={searchInputTabIndex}
                  />
                </div>

                <ButtonElevated
                  size='m'
                  className={styles.searchButton}
                  icon={isSearchActive ? <VerticalMenuRightCloseSVG /> : <SearchSVG />}
                  onClick={toggleSearchActive}
                  data-test-id='header__drawer-menu__close-search-icon'
                />
              </div>
            )}

            {!searchValue && (
              <>
                {onMarketplaceBannerClick && (
                  <MarketplaceBannerCard
                    title={t('mkpBannerTitle')}
                    onClick={wrappedClick({ onClick: onMarketplaceBannerClick })}
                    isMobile
                  />
                )}

                {onReferralBannerClick && (
                  <ReferralBannerCard
                    title={t('referralBannerTitle')}
                    promoBadge={t('referralBannerTag')}
                    onClick={wrappedClick({ onClick: onReferralBannerClick })}
                    isMobile
                  />
                )}
              </>
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
                {t('noData')}
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

      <MobileModalCustom open={platformSelectOpen} onClose={togglePlatformSelect} closeButtonEnabled>
        <MobileModalCustom.Header title={t('platforms')} />

        <List
          {...getSelectProductListProps({
            ...rest,
            allProducts: visibleProducts,
            onProductChange,
          })}
          // className={styles.nestedList}
          size='l'
        />
      </MobileModalCustom>

      <MobileModalCustom open={isProjectMenuOpen} onClose={toggleProjectSelect}>
        <SelectMenu mobile organizations={organizations} {...select} onOpenChange={onSelectOpenChange} />
      </MobileModalCustom>
    </>
  );
}
