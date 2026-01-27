import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';

import { InnerLink, LinksGroup } from '../types';
import { SearchFunction, SearchProps } from './types';

export enum SearchGroupsAccessor {
  GroupLabelText = 'label.text',
  ItemLabelText = 'items.label',
  ItemAliases = 'items.aliases',
}

function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

const prepareItemAccessorKey = (groupId: string, alias: string): string => `${groupId}-${alias}`;

type ItemsMap = Record<string, InnerLink>;

function createItemsMap(links: LinksGroup[]): ItemsMap {
  const itemsMap: ItemsMap = {};

  links.forEach(group => {
    group.items.forEach(item => {
      item.aliases.forEach(alias => {
        const key = prepareItemAccessorKey(group.id, alias);
        itemsMap[key] = item;
      });
    });
  });

  return itemsMap;
}

const enCharacters = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
const ruCharacters = 'йцукенгшщзхъфывапролджэячсмитьбю.ё';

const enToRuMap: Record<string, string> = {};
const ruToEnMap: Record<string, string> = {};

for (let i = 0; i < enCharacters.length; i++) {
  enToRuMap[enCharacters[i]] = ruCharacters[i];
  ruToEnMap[ruCharacters[i]] = enCharacters[i];
}

function convertLayout(text: string, direction: 'en-ru' | 'ru-en' = 'en-ru') {
  const map = direction === 'en-ru' ? enToRuMap : ruToEnMap;
  return text
    .split('')
    .map(ch => map[ch] ?? ch)
    .join('');
}

function isCyrillic(text: string): boolean {
  return /[а-яё]/i.test(text);
}

function isLatin(text: string): boolean {
  return /[a-z]/i.test(text);
}

export function toggleLayout(text: string): string {
  const lowercaseValue = text.toLowerCase();

  if (isCyrillic(lowercaseValue)) {
    return convertLayout(lowercaseValue, 'ru-en');
  }

  if (isLatin(lowercaseValue)) {
    return convertLayout(lowercaseValue, 'en-ru');
  }

  return text;
}

export function useSearch(): SearchProps {
  const [searchValue, onSearchValueChange] = useState<string>('');

  const { t } = useLocale('Header');

  const [searchFn, onChangeSearchFn] = useState<string>('fuzzy');

  const searchFunctions: SearchFunction[] = useMemo(
    () => [
      {
        id: 'fuzzy',
        label: t('searchSettingsFuzzyChipLabel'),
        handler: (searchValue, links) => {
          if (!searchValue) {
            return links;
          }

          const itemsMap = createItemsMap(links);
          const linksFuse = new Fuse(links, {
            keys: Object.values(SearchGroupsAccessor),
            includeMatches: true,
            threshold: 0.3,
          });

          let fuseSearchResults = linksFuse.search(searchValue);

          if (fuseSearchResults.length < 1) {
            const fixedLayoutValue = toggleLayout(searchValue);
            fuseSearchResults = linksFuse.search(fixedLayoutValue);
          }

          return fuseSearchResults.reduce((accResult, fuseResult) => {
            if (!fuseResult.matches) {
              return accResult;
            }

            const isMatchByGroup = fuseResult.matches.find(match => match.key === SearchGroupsAccessor.GroupLabelText);
            if (isMatchByGroup) {
              accResult.push(fuseResult.item);
              return accResult;
            }

            const group = fuseResult.item;

            const originalGroupIndex = fuseResult.refIndex;
            const itemsInnerMap: Record<string, InnerLink> = {};
            const items: InnerLink[] = [];

            fuseResult.matches.forEach(match => {
              if (match.refIndex === undefined) {
                return;
              }

              switch (match.key) {
                case SearchGroupsAccessor.ItemLabelText: {
                  const item = links[originalGroupIndex].items[match.refIndex];
                  if (item && !itemsInnerMap[item.id]) {
                    itemsInnerMap[item.id] = item;
                    items.push(item);
                  }
                  break;
                }

                case SearchGroupsAccessor.ItemAliases: {
                  if (!match.value) {
                    break;
                  }

                  const groupId = fuseResult.item.id;
                  const alias = match.value;
                  const key = prepareItemAccessorKey(groupId, alias);

                  const item = itemsMap[key];
                  if (item && !itemsInnerMap[item.id]) {
                    itemsInnerMap[item.id] = item;
                    items.push(item);
                  }
                  break;
                }

                case SearchGroupsAccessor.GroupLabelText:
                default:
                  return;
              }
            });

            if (items.length > 0) {
              accResult.push({
                ...group,
                items,
              });
            }

            return accResult;
          }, [] as LinksGroup[]);
        },
      },
      {
        id: 'precise',
        label: t('searchSettingsPreciseChipLabel'),
        handler: (searchValue, links) => {
          if (!searchValue || links.length < 1) {
            return links;
          }

          return links.reduce((result, group) => {
            if (group.label && matchSearchString(group.label.text, searchValue)) {
              result.push(group);
              return result;
            }

            const items = group.items.filter(item => matchSearchString(item.label, searchValue));

            if (items.length > 0) {
              result.push({ ...group, items });
              return result;
            }

            return result;
          }, [] as LinksGroup[]);
        },
      },
    ],
    [t],
  );

  return {
    searchValue,
    onSearchValueChange,
    searchFunctions,
    onChangeSearchFn,
    searchFn,
  };
}
