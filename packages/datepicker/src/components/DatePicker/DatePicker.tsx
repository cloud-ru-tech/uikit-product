import enGB from 'date-fns/locale/en-GB';
import ru from 'date-fns/locale/ru';
import { useCallback, useMemo, useRef, useState } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';

import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { CustomContainer } from '../../helperComponents/CustomContainer';
import { CustomDateInput } from '../../helperComponents/CustomDateInput';
import { CustomHeader } from '../../helperComponents/CustomHeader';
import { SettingType } from '../../helpers/types';
import * as S from './styled';

registerLocale(LanguageCodeType.ruRU, ru);
registerLocale(LanguageCodeType.enGB, enGB);

export enum DatePickerSize {
  s = 28,
  m = 36,
  l = 44,
}

export { SettingType };

export interface DatePickerProps {
  pickTime: SettingType;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  minDate?: Date;
  size?: DatePickerSize;
}

export const DatePicker = ({ value, pickTime, onChange, minDate, size = DatePickerSize.l }: DatePickerProps) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isDatePickerOpen, setOpen] = useState(false);
  const ref = useRef<RDatePicker>(null);

  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  const [date, setDate] = useState<null | Date>(value || new Date());
  const [pickTimeCheck, setPickTime] = useState(false);

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

  const handleChange = (date: Date | null): void => {
    setDate(date);
    onChange?.(date);
  };

  const memoizedCustomContainer = useCallback(
    CustomContainer.bind(null, {
      date,
      setDate,
      pickSettings,
      handleChange,
      minDate,
    }),
    [date, setDate, pickSettings, minDate],
  );

  const handleCalendarClose = useCallback(() => {
    ref.current?.setOpen(false);
  }, [ref]);

  const memoizedCustomHeader = useCallback(CustomHeader.bind(null, { languageCode }), [languageCode]);

  return (
    <S.Container>
      <RDatePicker
        ref={ref}
        minDate={minDate}
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
            size={size}
            date={date}
            pickSettings={pickSettings}
            setDate={setDate}
            minDate={minDate}
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
};

DatePicker.time = SettingType;
DatePicker.size = DatePickerSize;
