import { forwardRef, ReactNode, useImperativeHandle, useMemo, useState } from 'react';

import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';

import { prepareValueToFilter, textProvider, Texts } from '../../../../helpers';
import { RadioChipProps } from '../../types';
import { MenuItem } from '../MenuItem';
import { NoData } from '../NoData';
import { SearchItem } from '../SearchItem';
import { Trigger } from '../Trigger';

export const FilterChipRadio = forwardRef(
  ({ withSearch, icon, label, items, onChange, withSingleFilterClearButton }: RadioChipProps, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<string | boolean | null>(null);
    const [innerLabel, setInnerLabel] = useState<ReactNode>(textProvider(languageCode, Texts.All));

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

    const handleClearFilter = () => {
      setInnerLabel(textProvider(languageCode, Texts.All));
      handleChange(null);
      setValue(null);
    };

    useImperativeHandle(ref, () => ({ handleClearFilter }));

    const hasValue = Boolean(typeof value === 'boolean' || value);

    return (
      <DropdownMenu placement={DropdownMenu.placements.BottomStart} actions={<>{actions}</>}>
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
