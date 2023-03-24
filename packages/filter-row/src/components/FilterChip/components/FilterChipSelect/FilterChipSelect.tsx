import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { Checkbox } from '@sbercloud/uikit-product-checkbox';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { prepareValueToFilter, textProvider, Texts } from '../../../../helpers';
import { SelectChipProps } from '../../types';
import { Divider } from '../Divider';
import { MenuItem } from '../MenuItem';
import { NoData } from '../NoData';
import { SearchItem } from '../SearchItem';
import { Trigger } from '../Trigger';
import { CLEAR_STATE, getDefaultState, reducer, SET_ALL_CHECKED, SET_CHECKED } from './reducer';
import * as S from './styled';

export const FilterChipSelect = forwardRef(
  ({ withSelectAll, withSearch, icon, label, items, onChange, withSingleFilterClearButton }: SelectChipProps, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const refs = useRef(null);

    const [state, dispatch] = useReducer(reducer, getDefaultState(items));
    const [search, setSearch] = useState('');
    const [innerLabel, setInnerLabel] = useState<ReactNode>(textProvider(languageCode, Texts.All));

    const selectAllItem = useMemo(() => {
      const handleSelectAll = () => {
        dispatch({ type: SET_ALL_CHECKED });
      };

      return (
        <S.SelectItemContainer key='all'>
          <MenuItem>
            <Checkbox
              checked={state.allChecked.value}
              partChecked={state.allChecked.partially}
              label={textProvider(languageCode, Texts.SelectAll)}
              handleChange={handleSelectAll}
              className={S.checkboxClassname}
            />
          </MenuItem>
          <Divider />
        </S.SelectItemContainer>
      );
    }, [languageCode, state.allChecked.partially, state.allChecked.value]);

    const searchItem = useMemo(() => <SearchItem key='search' value={search} onChange={setSearch} />, [search]);

    const actions = useMemo(() => {
      const actions = items
        .filter(({ value, valueToFilter }) => {
          const toSearch = search.trim().toLowerCase();

          return prepareValueToFilter(value).includes(toSearch) || prepareValueToFilter(valueToFilter).includes(search);
        })
        .map(({ value, label, header }) => {
          const handleCheck = (checked: boolean) => {
            dispatch({ type: SET_CHECKED, payload: { id: value, label, checked } });
          };

          return (
            <S.ActionItemContainer key={value}>
              {header && (
                <>
                  <S.SelectItemHeader key={header}>{header}</S.SelectItemHeader>
                  <Divider />
                </>
              )}

              <MenuItem>
                <Checkbox
                  className={S.checkboxClassname}
                  checked={state.values[value]?.checked}
                  label={label}
                  handleChange={handleCheck}
                />
              </MenuItem>
            </S.ActionItemContainer>
          );
        });

      if (withSelectAll && !search) {
        actions.unshift(selectAllItem);
      }

      if (!actions.length) {
        actions.push(<NoData />);
      }

      if (withSearch) {
        actions.unshift(searchItem);
      }

      return actions;
    }, [items, search, searchItem, selectAllItem, state.values, withSearch, withSelectAll]);

    const setVisibleLabel = useCallback(() => {
      const checkedItems = Object.values(state.values).filter(item => item.checked);

      if (checkedItems.length === 0) {
        setInnerLabel(textProvider(languageCode, Texts.All));
        return;
      }

      if (checkedItems.length === 1) {
        setInnerLabel(checkedItems[0].label);
      } else {
        setInnerLabel(checkedItems.length);
      }
    }, [languageCode, state.values]);

    useEffect(() => {
      const newValues = Object.entries(state.values)
        .filter(([, value]) => value.checked)
        .map(([id]) => id);

      onChange(newValues);

      setVisibleLabel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, setVisibleLabel]);

    const handleClearFilter = () => {
      dispatch({ type: CLEAR_STATE, payload: items });
    };

    useImperativeHandle(ref, () => ({ handleClearFilter }));

    const hasValue = state.allChecked.value || state.allChecked.partially;

    return (
      <DropdownMenu placement={DropdownMenu.placements.BottomStart} closeOnMenuClick={false} actions={<>{actions}</>}>
        <Trigger
          ref={refs}
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
