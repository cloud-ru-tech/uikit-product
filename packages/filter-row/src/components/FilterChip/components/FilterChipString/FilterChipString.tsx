import debounce from 'lodash.debounce';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';
import { PopoverPrivate as Popover } from '@snack-ui/popover-private';

import { textProvider, Texts } from '../../../../helpers';
import { FilterString } from '../../../FilterString';
import { DEFAULT_FILTER_VALUE } from '../../../FilterString/helpers/constants';
import { getFilterLabel } from '../../../FilterString/helpers/getFilterLabel';
import { FilterStringValue } from '../../../FilterString/helpers/types';
import { StringChipProps } from '../../types';
import { Trigger } from '../Trigger';
import * as S from './styled';

export const FilterChipString = forwardRef(
  ({ label, icon, onChange, withSingleFilterClearButton }: StringChipProps, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [value, setValue] = useState<FilterStringValue>(DEFAULT_FILTER_VALUE);
    const [innerLabel, setInnerLabel] = useState<string>(textProvider(languageCode, Texts.All));

    const onChangeDebounced = useMemo(() => debounce(onChange, 500), [onChange]);

    const handleChange = useEventHandler((filterState: FilterStringValue) => {
      if (filterState.value) {
        const filterLabel = getFilterLabel({ filterState, languageCode });
        setInnerLabel(filterLabel);
        setValue(filterState);
        onChangeDebounced(filterState);
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

    const hasValue = Boolean(value.value);

    return (
      <Popover
        placement={Popover.placements.BottomStart}
        trigger={Popover.triggers.Click}
        popoverContent={<FilterString onChange={handleChange} filterValue={value} />}
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
