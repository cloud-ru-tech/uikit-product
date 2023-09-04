import deepEqual from 'deep-equal';
import { forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';

import { prepareValueToFilter, textProvider, Texts } from '../../../../helpers';
import { RadioChipProps } from '../../types';
import { MenuItem } from '../MenuItem';
import { NoData } from '../NoData';
import { SearchItem } from '../SearchItem';
import { Trigger } from '../Trigger';
import * as S from './styled';

export const FilterChipRadio = forwardRef(
  ({ withSearch, icon, label, items, onChange, withSingleFilterClearButton }: RadioChipProps, ref) => {
    const preCheckedItem = useMemo(() => items.find(item => item.checked), [items]);

    const prevItems = useRef(items);

    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<string | boolean | null>(preCheckedItem?.value || null);
    const [innerLabel, setInnerLabel] = useState<ReactNode>(
      preCheckedItem?.label || textProvider(languageCode, Texts.All),
    );

    const searchItem = useMemo(() => <SearchItem value={search} onChange={setSearch} />, [search]);

    const handleChange = useEventHandler(onChange);

    const actions = useMemo(() => {
      const actions = items
        .filter(({ value, valueToFilter }) => {
          const toSearch = search.trim().toLowerCase();

          return prepareValueToFilter(value).includes(toSearch) || prepareValueToFilter(valueToFilter).includes(search);
        })
        .map(({ value, label }) => {
          const handleClick = () => {
            setInnerLabel(label);
            handleChange(value);
            setValue(value);
          };

          return (
            <MenuItem key={String(value)} onClick={handleClick}>
              {label}
            </MenuItem>
          );
        });

      if (withSearch) {
        actions.unshift(searchItem);
      }

      if (!actions.length) {
        actions.unshift(<NoData />);
      }

      return actions;
    }, [items, handleChange, search, searchItem, withSearch]);

    useEffect(() => {
      if (!deepEqual(prevItems.current, items)) {
        const preCheckedItem = items.find(item => item.checked);
        setValue(preCheckedItem?.value || null);
        setInnerLabel(preCheckedItem?.label || textProvider(languageCode, Texts.All));
        handleChange(preCheckedItem?.value || null);
        prevItems.current = items;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const handleClearFilter = () => {
      setInnerLabel(textProvider(languageCode, Texts.All));
      handleChange(null);
      setValue(null);
    };

    useImperativeHandle(ref, () => ({ handleClearFilter }));

    const hasValue = Boolean(typeof value === 'boolean' || value);

    return (
      <DropdownMenu
        dropdownMenuClassName={S.dropdownClassName}
        placement={DropdownMenu.placements.BottomStart}
        actions={<>{actions}</>}
      >
        <Trigger
          label={label}
          icon={icon}
          innerLabel={innerLabel}
          showClearButton={withSingleFilterClearButton && hasValue}
          onClear={handleClearFilter}
        />
      </DropdownMenu>
    );
  },
);
