import cn from 'classnames';
import { KeyboardEvent, RefObject, useEffect, useRef } from 'react';

import { SearchSVG, VerticalMenuRightCloseSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { List, ListProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';
import { SearchPrivate } from '@snack-uikit/search-private';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateStringProps } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../helpers';
import { GroupSectionFooterButton, GroupSectionItemDroplist } from './components';
import { GroupSectionSkeletonItem } from './components/GroupSectionSkeletonItem';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { Item, ItemsGroup } from './types';

export type GroupSectionProps = WithSupportProps<{
  className?: string;
  title?: string;
  searchable?: boolean;
  searchActive?: boolean;
  onSearchActiveChange?(value: boolean): void;
  searchDefaultFocused?: boolean;
  searchPlaceholder?: string;
  onSearchOpenChange?(open: boolean): void;
  loading?: boolean;

  groups: ItemsGroup<Item>[];
  truncateVariant?: TruncateStringProps['variant'];
  noDataState?: ListProps['noDataState'];
  selectedItem?: Item;
  onItemChange?(item: Item): void;

  addItem?: {
    label: string;
    handler?(): void;
    tooltip?: string;
    disabled?: boolean;
  };

  closeDropdown?(): void;

  navigateOutsideRef?: RefObject<HTMLDivElement>;
  navigateInsideRef?: RefObject<HTMLDivElement>;
  avatarAppearance?: AvatarProps['appearance'];

  mobile: boolean;
}>;

export function GroupSection({
  title,
  loading,
  searchable = false,
  searchActive,
  onSearchActiveChange,
  className,
  groups,
  selectedItem,
  onItemChange,
  addItem,
  navigateOutsideRef,
  closeDropdown,
  avatarAppearance,
  noDataState,
  truncateVariant,
  searchPlaceholder,
  mobile,
  ...rest
}: GroupSectionProps) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shouldScrollToSelectedItem = useRef(true);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const itemTestIdPrefix = rest['data-test-id'] || 'header__select-group';

  const {
    searchRef,
    searchValue,
    setSearchValue,
    handleActivateSearch,
    handleDeactivateSearch,
    filteredGroups,
    animationState,
    searchIconTabIndex,
    closeSearchIconTabIndex,
    searchInputTabIndex,
  } = useSearch({
    groups,
    searchable,
    active: searchActive,
    onActiveChange: onSearchActiveChange,
  });

  const navigateOutside = (event: KeyboardEvent) => {
    if (navigateOutsideRef && event.key === 'ArrowUp') {
      navigateOutsideRef.current?.focus();
    }
  };

  const handleItemMouseDown =
    ({ item }: { item: Item; groupId: string }) =>
    () => {
      onItemChange?.(item);

      if (searchValue.length > 0) {
        setSearchValue('');

        setTimeout(() => {
          const selectedItem = itemRefs.current[item.id];
          selectedItem?.scrollIntoView({ block: 'center' });
        }, 0);
      }
    };

  useEffect(() => {
    shouldScrollToSelectedItem.current = true;
  }, [groups]);

  useEffect(() => {
    if (selectedItem?.id && shouldScrollToSelectedItem.current) {
      itemRefs.current[selectedItem.id]?.scrollIntoView({ block: 'center' });
      shouldScrollToSelectedItem.current = false;
    }
  }, [selectedItem]);

  return (
    <div className={cn(styles.section, className)} {...extractSupportProps(rest)}>
      {title && (
        <div className={styles.title}>
          <span className={styles.titleText}>{title}</span>

          {searchable && (
            <>
              {!animationState.isMounted && (
                <Tooltip tip={textProvider(languageCode, Texts.SearchOpenButton)} open={mobile ? false : undefined}>
                  <ButtonFunction
                    size='xs'
                    icon={<SearchSVG />}
                    className={styles.searchButton}
                    onClick={handleActivateSearch}
                    tabIndex={searchIconTabIndex}
                    data-test-id='header__select-group-section-search-icon'
                  />
                </Tooltip>
              )}

              <div
                className={styles.search}
                data-transition-status={animationState.status}
                data-is-mounted={animationState.isMounted || undefined}
              >
                <SearchPrivate
                  tabIndex={searchInputTabIndex}
                  size='m'
                  placeholder={searchPlaceholder ?? textProvider(languageCode, Texts.Search)}
                  value={searchValue}
                  onChange={setSearchValue}
                  ref={searchRef}
                  data-test-id='header__select-group-section-search-input'
                />

                <Tooltip tip={textProvider(languageCode, Texts.SearchCloseButton)} open={mobile ? false : undefined}>
                  <ButtonFunction
                    size='xs'
                    className={styles.searchButton}
                    icon={<VerticalMenuRightCloseSVG />}
                    onClick={handleDeactivateSearch}
                    tabIndex={closeSearchIconTabIndex}
                    data-test-id='header__select-group-section-close-search-icon'
                  />
                </Tooltip>
              </div>
            </>
          )}
        </div>
      )}

      {loading ? (
        <GroupSectionSkeletonItem />
      ) : (
        <List
          scroll
          marker
          size='m'
          selection={selectedItem?.id ? { mode: 'single', value: selectedItem.id } : undefined}
          dataFiltered={searchValue.length > 0}
          noDataState={{
            description: textProvider(languageCode, Texts.NoData),
            ...noDataState,
          }}
          noResultsState={{
            description: textProvider(languageCode, Texts.NoDataFound),
          }}
          items={filteredGroups.map(group => ({
            label: filteredGroups.length > 1 ? group.heading : undefined,
            truncate: { variant: truncateVariant },
            mode: 'secondary',
            type: 'group',
            items: group.items.map(item => {
              const dataTestId = `${itemTestIdPrefix}__item-${item.id}`;

              return {
                content: {
                  option: item.name,
                  truncate: { variant: truncateVariant },
                },
                beforeContent: item.logo ?? (
                  <Avatar appearance={avatarAppearance} size='xs' name={item.name} showTwoSymbols shape='square' />
                ),
                afterContent: (
                  <>
                    {item.actions && item.actions.length > 0 ? (
                      <GroupSectionItemDroplist
                        actions={item.actions}
                        dataTestId={dataTestId}
                        onItemClick={closeDropdown}
                      />
                    ) : undefined}

                    {item.new && (
                      <PromoTag text={textProvider(languageCode, Texts.OrganizationNewBadge)} appearance='green' />
                    )}
                  </>
                ),
                id: item.id,
                onKeyDown: navigateOutside,
                onMouseDown: handleItemMouseDown({ item, groupId: group.id }),
                'data-test-id': dataTestId,
                itemRef: ((ref: HTMLDivElement) => {
                  itemRefs.current[item.id] = ref;
                }) as unknown as RefObject<HTMLElement>,
              };
            }),
          }))}
          footer={addItem?.handler ? <GroupSectionFooterButton {...addItem} /> : undefined}
        />
      )}
    </div>
  );
}
