import { KeyboardEvent, RefObject, useRef } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { PlusSVG, SearchSVG } from '@snack-uikit/icons';
import { List } from '@snack-uikit/list';
import { SearchPrivate } from '@snack-uikit/search-private';

import { textProvider, Texts } from '../../helpers';
import { useSearch } from './hooks';
import styles from './styles.module.scss';
import { Item, ItemsGroup } from './types';

export type GroupSectionProps = WithSupportProps<{
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

  navigateOutsideRef?: RefObject<HTMLDivElement>;
  navigateInsideRef?: RefObject<HTMLDivElement>;
}>;

export function GroupSection({
  title,
  // last = false,
  searchable = false,
  groups,
  selectedItem,
  onItemChange,
  addItem,
  navigateOutsideRef,
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

  const getItemIndex = (groupIndex: number, itemIndex: number) => `${groupIndex}_${itemIndex}`;

  const handleItemClick =
    ({ item, groupIndex, itemIndex }: { item: Item; groupIndex: number; itemIndex: number }) =>
    () => {
      onItemChange?.(item);

      if (searchValue.length > 0) {
        setIsSearchActive(false);
        setSearchValue('');
        const selectedItem = itemRefs.current[getItemIndex(groupIndex, itemIndex)];

        setTimeout(() => {
          selectedItem?.scrollIntoView({ block: 'end' });
        }, 0);
      }
    };

  return (
    <div className={styles.section} {...extractSupportProps(rest)}>
      {title && (
        <div className={styles.title}>
          {title}

          {searchable && (
            <ButtonFunction
              size='xs'
              icon={<SearchSVG />}
              onClick={handleActivateSearch}
              tabIndex={searchIconTabIndex}
              data-test-id='header__select-group-section-search-icon'
            />
          )}
        </div>
      )}

      {searchable && (
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
      )}

      <List
        scroll
        marker
        size='m'
        className={styles.list}
        selection={{ mode: 'single', value: selectedItem.id }}
        items={filteredGroups.map((group, groupIndex) => ({
          label: group.heading,
          mode: 'secondary',
          items: group.items.map((item, itemIndex) => ({
            content: {
              option: item.name,
            },
            beforeContent: item.logo ?? <Avatar size='xs' name={item.name} showTwoSymbols shape='square' />,
            id: item.id,
            onKeyDown: navigateOutside,
            className: styles.list,
            onClick: handleItemClick({ item, groupIndex, itemIndex }),
            'data-test-id': `header__select-group-item-${item.id}`,
          })),
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
