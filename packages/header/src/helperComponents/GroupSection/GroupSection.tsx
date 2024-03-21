import cn from 'classnames';
import { KeyboardEvent, RefObject, useRef } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { SearchSVG } from '@snack-uikit/icons';
import { BaseItemProps, List, ListProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';
import { SearchPrivate } from '@snack-uikit/search-private';

import { textProvider, Texts } from '../../helpers';
import { GroupSectionFooterButton, GroupSectionItemDroplist } from './components';
import { GroupSectionSkeletonItem } from './components/GroupSectionSkeletonItem';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { Item, ItemsGroup } from './types';

export type GroupSectionProps = WithSupportProps<{
  className?: string;
  title?: string;
  last?: boolean;
  searchable?: boolean;
  loading?: boolean;

  groups: ItemsGroup<Item>[];
  truncateVariant?: NonNullable<BaseItemProps['content']['truncate']>['variant'];
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
}>;

const getItemIndex = (groupId: string, itemId: string) => `${groupId}_${itemId}`;

export function GroupSection({
  title,
  // last = false,
  loading,
  searchable = false,
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
  ...rest
}: GroupSectionProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const {
    searchRef,
    searchValue,
    setSearchValue,
    setIsSearchActive,
    handleActivateSearch,
    handleSearchBlur,
    filteredGroups,
    animationState,
    searchIconTabIndex,
    searchInputTabIndex,
  } = useSearch({ groups, searchable });

  const navigateOutside = (event: KeyboardEvent) => {
    if (navigateOutsideRef && event.key === 'ArrowUp') {
      navigateOutsideRef.current?.focus();
    }
  };

  const handleItemMouseDown =
    ({ item, groupId }: { item: Item; groupId: string }) =>
    () => {
      onItemChange?.(item);

      if (searchValue.length > 0) {
        setIsSearchActive(false);
        setSearchValue('');

        setTimeout(() => {
          const selectedItem = itemRefs.current[getItemIndex(groupId, item.id)];
          selectedItem?.scrollIntoView({ block: 'end' });
        }, 0);
      }
    };

  return (
    <div className={cn(styles.section, className)} {...extractSupportProps(rest)}>
      {title && (
        <div className={styles.title}>
          {title}

          {searchable && (
            <>
              <ButtonFunction
                size='xs'
                icon={<SearchSVG />}
                onClick={handleActivateSearch}
                tabIndex={searchIconTabIndex}
                data-test-id='header__select-group-section-search-icon'
              />
              <SearchPrivate
                tabIndex={searchInputTabIndex}
                size='m'
                placeholder={textProvider(languageCode, Texts.Search)}
                value={searchValue}
                onChange={setSearchValue}
                ref={searchRef}
                className={styles.search}
                data-transition-status={animationState.status}
                onBlur={handleSearchBlur}
                data-test-id='header__select-group-section-search-input'
              />
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
            items: group.items.map(item => {
              const dataTestId = `header__select-group-item-${item.id}`;

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
                itemRef: ((ref: HTMLElement) => {
                  itemRefs.current[getItemIndex(group.id, item.id)] = ref;
                }) as unknown as RefObject<HTMLElement>,
              };
            }),
          }))}
          footer={addItem?.handler ? <GroupSectionFooterButton {...addItem} /> : undefined}
        />
      )}

      {/* {!last && <Divider orientation='vertical' className={styles.divider} />} */}
    </div>
  );
}
