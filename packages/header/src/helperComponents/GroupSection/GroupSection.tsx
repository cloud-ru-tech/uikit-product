import cn from 'classnames';
import { KeyboardEvent, RefObject, useRef } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { PlusSVG, SearchSVG } from '@snack-uikit/icons';
import { List } from '@snack-uikit/list';
import { SearchPrivate } from '@snack-uikit/search-private';

import { textProvider, Texts } from '../../helpers';
import { GroupSectionItemDroplist } from './GroupSectionItemDroplist';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { Item, ItemsGroup } from './types';

export type GroupSectionProps = WithSupportProps<{
  className?: string;
  title?: string;
  last?: boolean;
  searchable?: boolean;

  groups: ItemsGroup<Item>[];
  selectedItem: Item;
  onItemChange?(item: Item): void;

  addItem?: {
    label: string;
    handler?(): void;
  };

  closeDropdown?(): void;

  navigateOutsideRef?: RefObject<HTMLDivElement>;
  navigateInsideRef?: RefObject<HTMLDivElement>;
}>;

const getItemIndex = (groupId: string, itemId: string) => `${groupId}_${itemId}`;

export function GroupSection({
  title,
  // last = false,
  searchable = false,
  className,
  groups,
  selectedItem,
  onItemChange,
  addItem,
  navigateOutsideRef,
  closeDropdown,
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

      <List
        scroll
        marker
        size='m'
        className={styles.list}
        selection={{ mode: 'single', value: selectedItem.id }}
        items={filteredGroups.map(group => ({
          label: group.heading,
          mode: 'secondary',
          items: group.items.map(item => {
            const dataTestId = `header__select-group-item-${item.id}`;

            return {
              content: {
                option: item.name,
              },
              beforeContent: item.logo ?? <Avatar size='xs' name={item.name} showTwoSymbols shape='square' />,
              afterContent:
                item.actions && item.actions.length > 0 ? (
                  <GroupSectionItemDroplist
                    actions={item.actions}
                    dataTestId={dataTestId}
                    onItemClick={closeDropdown}
                  />
                ) : undefined,
              id: item.id,
              onKeyDown: navigateOutside,
              className: styles.list,
              onMouseDown: handleItemMouseDown({ item, groupId: group.id }),
              'data-test-id': dataTestId,
              itemRef: ((ref: HTMLElement) => {
                itemRefs.current[getItemIndex(group.id, item.id)] = ref;
              }) as unknown as RefObject<HTMLElement>,
            };
          }),
        }))}
        footer={
          addItem && addItem.handler ? (
            <ButtonFunction
              size='m'
              onClick={addItem.handler}
              icon={<PlusSVG />}
              iconPosition='before'
              label={addItem.label}
              data-test-id='header__select-group-section-add-button'
            />
          ) : undefined
        }
      />

      {/* {!last && <Divider orientation='vertical' className={styles.divider} />} */}
    </div>
  );
}
