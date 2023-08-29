import debounce from 'lodash.debounce';
import { forwardRef, ReactNode, useImperativeHandle, useMemo, useState } from 'react';

import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';
import { PopoverPrivate as Popover } from '@snack-ui/popover-private';

import { textProvider, Texts } from '../../../../helpers';
import { FilterNumber } from '../../../FilterNumber';
import { DEFAULT_FILTER_VALUE } from '../../../FilterNumber/helpers/constants';
import { FilterNumberValue } from '../../../FilterNumber/helpers/types';
import { NumberChipProps } from '../../types';
import { Trigger } from '../Trigger';
import * as S from './styled';

export const FilterChipNumber = forwardRef(({ label, onChange, withSingleFilterClearButton }: NumberChipProps, ref) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [value, setValue] = useState<FilterNumberValue>(DEFAULT_FILTER_VALUE);
  const [innerLabel, setInnerLabel] = useState<ReactNode>(textProvider(languageCode, Texts.All));

  const onChangeDebounced = useMemo(() => debounce(onChange, 500), [onChange]);

  const handleChange = useEventHandler((filterState: FilterNumberValue) => {
    if (filterState.startValue) {
      const startLabel = filterState.startValue;
      const endLabel = filterState.endValue ? `—${filterState.endValue}` : '';
      setInnerLabel(`${startLabel}${endLabel}`);

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
        icon={null}
        innerLabel={innerLabel}
        showClearButton={withSingleFilterClearButton && hasValue}
        onClear={handleClearFilter}
      />
    </Popover>
  );
});
