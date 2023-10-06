import debounce from 'lodash.debounce';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';
import { PopoverPrivate as Popover } from '@snack-ui/popover-private';

import { textProvider, Texts } from '../../../../helpers';
import { FilterNumber } from '../../../FilterNumber';
import { DEFAULT_FILTER_VALUE } from '../../../FilterNumber/helpers/constants';
import { getFilterLabel } from '../../../FilterNumber/helpers/getFilterLabel';
import { FilterNumberValue } from '../../../FilterNumber/helpers/types';
import { NumberChipProps } from '../../types';
import { Trigger } from '../Trigger';
import * as S from './styled';

export const FilterChipNumber = forwardRef(
  ({ label, icon, onChange, withSingleFilterClearButton }: NumberChipProps, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [value, setValue] = useState<FilterNumberValue>(DEFAULT_FILTER_VALUE);
    const [innerLabel, setInnerLabel] = useState<string>(textProvider(languageCode, Texts.All));

    const onChangeDebounced = useMemo(() => debounce(onChange, 500), [onChange]);

    const handleChange = useEventHandler((filterState: FilterNumberValue) => {
      if (filterState.startValue) {
        const newFilterState = { ...filterState };

        if (newFilterState.endValue) {
          const isRevercedRange = Number(newFilterState.startValue) > Number(newFilterState.endValue);

          if (isRevercedRange) {
            [newFilterState.startValue, newFilterState.endValue] = [newFilterState.endValue, newFilterState.startValue];
          }
        }

        const filterLabel = getFilterLabel({ filterState: newFilterState, languageCode });
        setInnerLabel(filterLabel);

        setValue(newFilterState);
        onChangeDebounced(newFilterState);
      } else {
        setInnerLabel(textProvider(languageCode, Texts.All));
        setValue(DEFAULT_FILTER_VALUE);
        onChange(DEFAULT_FILTER_VALUE);
        onChangeDebounced.cancel();
      }
    });

    const handleClearFilter = () => {
      handleChange(DEFAULT_FILTER_VALUE);
    };

    useImperativeHandle(ref, () => ({ handleClearFilter }));

    const hasValue = Boolean(value.startValue);

    return (
      <Popover
        placement={Popover.placements.BottomStart}
        trigger={Popover.triggers.Click}
        popoverContent={<FilterNumber onChange={handleChange} filterValue={value} />}
        offset={12}
        className={S.popoverClassName}
      >
        <Trigger
          label={label}
          icon={icon}
          innerLabel={<S.FilterLabel maxLines={1} text={innerLabel} />}
          showClearButton={withSingleFilterClearButton && hasValue}
          onClear={handleClearFilter}
        />
      </Popover>
    );
  },
);
