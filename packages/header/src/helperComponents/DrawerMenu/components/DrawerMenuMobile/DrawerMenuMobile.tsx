import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { SearchSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ButtonElevated, ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Search } from '@snack-uikit/search';
import { Typography } from '@snack-uikit/typography';

import { getSelectProductListProps } from '../../../../helpers';
import { Organization } from '../../../../types';
import { extractAppNameFromId } from '../../../../utils';
import { MarketplaceBannerCard } from '../../../MarketplaceBannerCard';
import { ReferralBannerCard } from '../../../ReferralBannerCard';
import { SelectMenu, SelectProps } from '../../../SelectMenu';
import { useLinks } from '../../hooks';
import { DrawerMenuProps } from '../../types';
import { filterHidden, filterHiddenLinks } from '../../utils';
import { GroupCard } from '../GroupCard';
import { ProductSelectTrigger } from '../ProductSelectTrigger';
import { SearchSettingsButton } from '../SearchSettingsButton';
import { SearchSettings } from '../SearchSettingsChips';
import { SEARCH_PRECISION } from '../SearchSettingsChips/constants';
import { SEARCH_TRANSITION_TIMEOUT } from './constants';
import { useLinksScrollToSelected, useSearchAnimation } from './hooks';
import styles from './styles.module.scss';

type DrawerMenuMobileProps = DrawerMenuProps & {
  isProjectMenuOpen: boolean;
  handleProjectMenuOpen(open: boolean): void;
  select?: Pick<
    SelectProps,
    'projects' | 'onProjectChange' | 'selectedProject' | 'closeDropdown' | 'onOpenChange' | 'onPlatformChange'
  >;
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
  marketplaceBanner,
  referralBanner,
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

  useEffect(() => {
    if (open) {
      return;
    }

    return () => {
      setSearchValue('');
      setAreSearchSettingsVisible(false);
      if (isSearchActive) {
        toggleSearchActive();
      }
    };
  }, [isSearchActive, open, setSearchValue, toggleSearchActive, setAreSearchSettingsVisible]);

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

  const onProductChange: NonNullable<DrawerMenuProps['onProductChange']> = useCallback(
    (product, e) => {
      setPlatformSelectOpen(false);
      onProductChangeProp(product, e);
    },
    [onProductChangeProp],
  );

  const onSelectOpenChange = (open: boolean) => {
    if (!open) {
      toggleProjectSelect();
    }
  };

  const searchSettingsOptions: ItemProps[] = useMemo(() => {
    const handlePrecisionChange = (precision: SearchSettings['precision']) => () => {
      setSearchSettings(prevSettings => ({
        ...prevSettings,
        precision,
      }));
      setAreSearchSettingsVisible(false);
    };

    return [
      {
        content: {
          option: t('searchSettingsFuzzyChipLabel'),
        },
        checked: searchSettings.precision === SEARCH_PRECISION.Fuzzy,
        onClick: handlePrecisionChange(SEARCH_PRECISION.Fuzzy),
        'data-test-id': 'header__drawer-menu__search-option-fuzzy',
      },
      {
        content: {
          option: t('searchSettingsPreciseChipLabel'),
        },
        checked: searchSettings.precision === SEARCH_PRECISION.Precise,
        onClick: handlePrecisionChange(SEARCH_PRECISION.Precise),
        'data-test-id': 'header__drawer-menu__search-option-precise',
      },
    ];
  }, [searchSettings.precision, setAreSearchSettingsVisible, setSearchSettings, t]);

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
                dataTestIdPostfix={'platform'}
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
                appearance='neutral'
                dataTestIdPostfix={'project'}
              />
            )}

            {leftSectionLinks && (
              <div
                className={styles.searchWrap}
                style={{
                  '--sc-header-animation-enter': SEARCH_TRANSITION_TIMEOUT.enter,
                  '--sc-header-animation-exit': SEARCH_TRANSITION_TIMEOUT.exit,
                }}
              >
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
                    postfix={<SearchSettingsButton onClick={() => setAreSearchSettingsVisible(true)} />}
                  />
                </div>

                <ButtonElevated
                  size='m'
                  className={styles.searchButton}
                  icon={<SearchSVG />}
                  onClick={toggleSearchActive}
                  data-test-id='header__drawer-menu__close-search-icon'
                  data-search-active={isSearchActive || undefined}
                />
              </div>
            )}

            {!searchValue && (
              <>
                {marketplaceBanner && (
                  <MarketplaceBannerCard
                    title={t('mkpBannerTitle')}
                    href={marketplaceBanner.href}
                    onClick={wrappedClick({ onClick: marketplaceBanner.onClick })}
                    isMobile
                  />
                )}

                {referralBanner && (
                  <ReferralBannerCard
                    title={t('referralBannerTitle')}
                    promoBadge={t('referralBannerTag')}
                    href={referralBanner.href}
                    onClick={wrappedClick({ onClick: referralBanner.onClick })}
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
          size='l'
        />
      </MobileModalCustom>

      <MobileModalCustom open={areSearchSettingsVisible} onClose={() => setAreSearchSettingsVisible(false)}>
        <MobileModalCustom.Header title={t('searchSettingsMobileModalHeader')} />
        <List
          className={styles.searchSettingsMobileOptions}
          items={searchSettingsOptions}
          size='l'
          selection={{ mode: 'single' }}
        />
      </MobileModalCustom>

      {select && (
        <MobileModalCustom open={isProjectMenuOpen} onClose={toggleProjectSelect}>
          <SelectMenu mobile organizations={organizations} {...select} onOpenChange={onSelectOpenChange} />
        </MobileModalCustom>
      )}
    </>
  );
}
