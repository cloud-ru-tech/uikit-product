import { format } from 'date-fns';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

import { useEventHandler, useLanguage } from '@sbercloud/uikit-product-utils';
import { PopoverPrivate as Popover } from '@snack-ui/popover-private';

import { textProvider, Texts } from '../../../../helpers';
import { FilterDatePicker } from '../../../FilterDatePicker';
import { DEFAULT_DATE_FORMAT } from '../../../FilterDatePicker/helpers/constants';
import { InnerDate } from '../../../FilterDatePicker/helpers/types';
import { DateChipProps } from '../../types';
import { Trigger } from '../Trigger';
import { areDatesHasChanged } from './helpers';
import * as S from './styled';

export const FilterChipDate = forwardRef(
  ({ label, icon, min, max, withSingleFilterClearButton, onChange }: DateChipProps, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
    const [value, setValue] = useState<[InnerDate, InnerDate?]>([undefined, undefined]);
    const [innerLabel, setInnerLabel] = useState<ReactNode>(textProvider(languageCode, Texts.All));

    const handleChange = useEventHandler((dates: [InnerDate, InnerDate?]) => {
      const [start, end] = dates;
      const startLabel = start ? format(start, DEFAULT_DATE_FORMAT) : textProvider(languageCode, Texts.All);
      const endLabel = end ? ` — ${format(end, DEFAULT_DATE_FORMAT)}` : '';
      const label = `${startLabel}${endLabel}`;

      setInnerLabel(label);
      setValue(dates);

      if (areDatesHasChanged(dates, value)) {
        onChange(dates);
      }
    });

    const handleClearFilter = () => {
      setInnerLabel(textProvider(languageCode, Texts.All));
      handleChange([undefined, undefined]);
      setValue([undefined, undefined]);
    };

    useImperativeHandle(ref, () => ({ handleClearFilter }));

    const hasValue = Boolean(value[0]);

    return (
      <Popover
        placement={Popover.placements.BottomStart}
        trigger={Popover.triggers.Click}
        popoverContent={<FilterDatePicker maxDate={max} minDate={min} onChange={handleChange} value={value} />}
        offset={12}
        className={S.popoverClassName}
      >
        <Trigger
          label={label}
          icon={icon}
          innerLabel={innerLabel}
          showClearButton={withSingleFilterClearButton && hasValue}
          onClear={handleClearFilter}
        />
      </Popover>
    );
  },
);
