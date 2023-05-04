import { forwardRef, MouseEventHandler, RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import RDatePicker from 'react-datepicker';

import { CalendarInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { getSplitDate } from '../../helpers/getSplitDate';
import { isAfterMinDate } from '../../helpers/isAfterMinDate';
import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers/texts-provider';
import { PickSettingProps, TimeInputProps, TSplitDateType } from '../../helpers/types';
import { commonInputClassName } from '../../styled';
import { HiddenInput } from '../HiddenInput';
import * as S from './styled';

type ClickHandler = MouseEventHandler<HTMLElement>;

export type CustomDateInputProps = {
  setDate: (date: null | Date) => void;
  date: Date | null;
  minDate?: Date | null;
  onClick?: ClickHandler;
  handleChange: (date: Date | null) => void;
  handleCalendarClose: () => void;
  calendarRef?: RefObject<RDatePicker>;
  pickSettings: PickSettingProps;
  size: number;
};

export const CustomDateInput = forwardRef<HTMLSpanElement, CustomDateInputProps>((props, ref) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { date, setDate, onClick, pickSettings, minDate, size, handleCalendarClose, handleChange } = props;
  const [isError, setError] = useState(false);
  const [splitDate, setSplitDate] = useState<TSplitDateType>(getSplitDate(languageCode, date));

  useEffect(() => {
    const splitDate = getSplitDate(languageCode, date);
    setSplitDate(splitDate);
  }, [date, languageCode]);

  const handleChangeDate = useCallback(
    (splitDate: TSplitDateType) => {
      const yearInt = parseInt(splitDate.year, 10);
      const monthInt = parseInt(splitDate.month, 10);
      const dayInt = parseInt(splitDate.day, 10);
      const nextDate = new Date(yearInt, monthInt - 1, dayInt);

      const isDate = !isNaN(nextDate.getTime());
      const isDayValid = dayInt && dayInt <= 31;
      const isMonthValid = monthInt && monthInt <= 12;
      const isYearValid = yearInt >= 1900;
      const isValid = isDate && isDayValid && isMonthValid && isYearValid && isAfterMinDate(minDate as Date, nextDate);

      if (!isValid) {
        setError(true);
        setSplitDate(splitDate);
        return;
      }

      if (isError) setError(false);
      setDate?.(nextDate);
      handleChange(nextDate);
    },
    [isError, minDate, setDate, handleChange],
  );

  useEffect(() => {
    if (isError) setError(false);
  }, [date]);

  const dateForFormatter = useMemo(
    () => ({
      day: (
        <HiddenInput
          handleCalendarClose={handleCalendarClose}
          valueProp={TimeInputProps.day}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={17}
        />
      ),
      month: (
        <HiddenInput
          handleCalendarClose={handleCalendarClose}
          valueProp={TimeInputProps.month}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={17}
        />
      ),
      year: (
        <HiddenInput
          handleCalendarClose={handleCalendarClose}
          valueProp={TimeInputProps.year}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={34}
        />
      ),
      time: pickSettings?.isPickTime ? splitDate.time : undefined,
    }),
    [splitDate, handleChangeDate, pickSettings, handleCalendarClose],
  );

  const dateStr = useMemo(
    () => textProvider<DictionaryPropertyAsFn>(languageCode, Texts.DateFormat)(dateForFormatter),
    [languageCode, dateForFormatter],
  );

  return (
    <>
      <S.InputContainer
        ref={ref}
        onClick={onClick}
        data-open={pickSettings?.isDatePickerOpen || undefined}
        data-error={isError || undefined}
        size={size}
        className={commonInputClassName}
      >
        {dateStr}
        <CalendarInterfaceSVG className={S.calendarIconClassName} />
      </S.InputContainer>
      {isError && !pickSettings?.isDatePickerOpen && (
        <S.Error>{textProvider<string>(languageCode, Texts.IncorrectDateEntered)}</S.Error>
      )}
    </>
  );
});
