import { isAfter, isBefore } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import ru from 'date-fns/locale/ru';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';

import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { CustomContainer } from '../../helperComponents/CustomContainer';
import { CustomDateInput } from '../../helperComponents/CustomDateInput';
import { CustomHeader } from '../../helperComponents/CustomHeader';
import { SettingType } from '../../helpers/types';
import * as S from './styled';

registerLocale(LanguageCodeType.ruRU, ru);
registerLocale(LanguageCodeType.enGB, enGB);

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export enum SizeInPx {
  Small = 28,
  Medium = 36,
  Large = 44,
}

export { SettingType };

export type DatePickerProps = {
  pickTime?: SettingType;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  size?: Size;
};

export function DatePicker({
  value,
  pickTime = SettingType.None,
  onChange,
  minDate,
  maxDate,
  size = Size.Large,
}: DatePickerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isDatePickerOpen, setOpen] = useState(false);
  const ref = useRef<RDatePicker>(null);

  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  const [date, setDate] = useState<null | Date>(value || new Date());
  const [pickTimeCheck, setPickTime] = useState(false);

  const dateRange =
    minDate && maxDate && minDate > maxDate ? { max: minDate, min: maxDate } : { max: maxDate, min: minDate };

  const pickSettings = useMemo(() => {
    const isPickTimeRequire = pickTime === SettingType.Requier;
    const isPickTimeOptional = pickTime === SettingType.Optional;

    const isPickTime = isPickTimeRequire || pickTimeCheck;

    return {
      setPickTime,
      isDatePickerOpen,
      isPickTimeRequire,
      isPickTimeOptional,
      isPickTime,
      pickTimeCheck,
    };
  }, [pickTime, isDatePickerOpen, pickTimeCheck]);

  const handleChange = useCallback(
    (date: Date | null): void => {
      setDate(date);
      onChange?.(date);
    },
    [onChange],
  );

  useEffect(() => {
    if (date && dateRange.min && isBefore(date, dateRange.min)) {
      handleChange(dateRange.min);
    } else {
      if (date && dateRange.max && isAfter(date, dateRange.max)) {
        handleChange(dateRange.max);
      }
    }
  }, [minDate, maxDate, date, handleChange, dateRange.min, dateRange.max]);

  const memoizedCustomContainer = useMemo(
    () =>
      CustomContainer.bind(null, {
        date,
        setDate,
        pickSettings,
        handleChange,
        minDate: dateRange.min,
        maxDate: dateRange.max,
      }),
    [date, pickSettings, handleChange, dateRange.min, dateRange.max],
  );

  const handleCalendarClose = useCallback(() => {
    ref?.current?.setOpen(false);
  }, [ref]);

  const memoizedCustomHeader = useMemo(() => CustomHeader.bind(null, { languageCode }), [languageCode]);

  return (
    <S.Container>
      <RDatePicker
        ref={ref}
        minDate={dateRange.min}
        maxDate={dateRange.max}
        selected={date}
        openToDate={date || undefined}
        onChange={handleChange}
        startDate={date}
        selectsRange={false}
        shouldCloseOnSelect
        showPopperArrow={false}
        locale={languageCode}
        customInput={
          <CustomDateInput
            handleCalendarClose={handleCalendarClose}
            size={SizeInPx[size]}
            date={date}
            pickSettings={pickSettings}
            setDate={setDate}
            minDate={dateRange.min}
            handleChange={handleChange}
          />
        }
        renderCustomHeader={memoizedCustomHeader}
        calendarContainer={memoizedCustomContainer}
        onCalendarClose={close}
        onCalendarOpen={open}
      />
    </S.Container>
  );
}

DatePicker.timePicker = SettingType;
DatePicker.sizes = Size;
