import mergeRefs from 'merge-refs';
import { KeyboardEvent, MouseEventHandler, RefObject, useRef } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { PlaceholderSVG, PlusSVG, SearchSVG } from '@snack-uikit/icons';
import { Scroll } from '@snack-uikit/scroll';
import { SearchPrivate } from '@snack-uikit/search-private';

import { textProvider, Texts } from '../../../../helpers';
import { SelectGroupItem } from './components';
import { useSearch } from './hooks';
import styles from './styles.modules.scss';
import { Item, ItemsGroup } from './types';

export type SelectGroupSectionProps = {
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
};

export function SelectGroupSection({
  title,
  last = false,
  searchable = false,
  groups,
  selectedItem,
  onItemChange,
  addItem,
  navigateInsideRef,
  navigateOutsideRef,
}: SelectGroupSectionProps) {
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

  const handleItemMouseDown: MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    event.stopPropagation();
  };

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
    <>
      <div className={styles.section}>
        {title && (
          <div className={styles.title}>
            {title}

            {searchable && (
              <ButtonFunction
                size='xs'
                icon={<SearchSVG />}
                onClick={handleActivateSearch}
                tabIndex={searchIconTabIndex}
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
          />
        )}

        <Scroll size='s'>
          <div className={styles.itemsGroups}>
            {filteredGroups.map((group, groupIndex) => (
              <div className={styles.itemsGroup} key={group.id}>
                <div className={styles.itemsGroupSubheading}>{group.heading}</div>

                {group.items.map((item, itemIndex) => {
                  const refFunc = (el: HTMLDivElement) => (itemRefs.current[getItemIndex(groupIndex, itemIndex)] = el);
                  const ref = groupIndex === 0 && itemIndex === 0 ? mergeRefs(refFunc, navigateInsideRef) : refFunc;

                  return (
                    <SelectGroupItem
                      ref={ref}
                      key={item.id}
                      name={item.name}
                      selected={item.id === selectedItem.id}
                      logo={item.logo}
                      actions={
                        item.onEdit
                          ? [
                              {
                                option: textProvider(languageCode, Texts.Edit),
                                icon: <PlaceholderSVG />,
                                onClick: item.onEdit,
                              },
                            ]
                          : undefined
                      }
                      onMouseDown={handleItemMouseDown}
                      onKeyDown={navigateOutside}
                      onClick={handleItemClick({ item, groupIndex, itemIndex })}
                    />
                  );
                })}
              </div>
            ))}

            {filteredGroups.length === 0 && (
              <div className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</div>
            )}
          </div>
        </Scroll>

        {addItem && addItem.handler && (
          <ButtonFunction
            className={styles.addButton}
            onClick={addItem.handler}
            icon={<PlusSVG />}
            iconPosition='before'
            label={addItem.label}
          />
        )}
      </div>

      {!last && <Divider orientation='vertical' className={styles.divider} />}
    </>
  );
}
