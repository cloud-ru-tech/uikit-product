import { CalendarInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import RDatePicker from 'react-datepicker';

import { HiddenInput } from '../../helperComponents/HiddenInput';
import { getSplitDate } from '../../helpers/getSplitDate';
import { isAfterMinDate } from '../../helpers/isAfterMinDate';
import { DateFormat, Languages, Texts, textProvider } from '../../helpers/texts-provider';
import { PickSettingProps, TSplitDateType, TimeInputProps } from '../../helpers/types';
import * as S from './styled';

export interface ICustomDateInputProps {
  setDate: (date: null | Date) => void;
  date: Date | null;
  minDate?: Date | null;
  onClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  calendarRef?: React.RefObject<RDatePicker>;
  pickSettings: PickSettingProps;
  language: Languages;
}

export const CustomDateInput = forwardRef<HTMLSpanElement, ICustomDateInputProps>((props, ref) => {
  const { date, setDate, onClick, pickSettings, minDate, language } = props;
  const [isError, setError] = useState(false);
  const [splitDate, setSplitDate] = useState<TSplitDateType>(getSplitDate(language, date));

  useEffect(() => {
    const splitDate = getSplitDate(language, date);
    setSplitDate(splitDate);
  }, [date, language]);

  const handleChangeDate = useCallback(
    (splitDate: TSplitDateType) => {
      const yearInt = parseInt(splitDate.year, 10);
      const monthInt = parseInt(splitDate.month, 10);
      const dayInt = parseInt(splitDate.day, 10);
      const nextDate = new Date(yearInt, monthInt - 1, dayInt);

      const isDate = !isNaN(nextDate.getTime());
      const notValid =
        !isDate || dayInt > 31 || monthInt > 12 || yearInt < 1900 || !isAfterMinDate(minDate as Date, nextDate);

      if (notValid) {
        setError(true);
        setSplitDate(splitDate);
        return;
      }

      if (isError) setError(false);
      setDate?.(nextDate);
    },
    [isError, minDate, setDate],
  );

  useEffect(() => {
    if (isError) setError(false);
  }, [date]);

  const handleContainerClick = useCallback(
    e => {
      onClick?.(e);
    },
    [onClick],
  );

  const dateForFormatter = useMemo(
    () => ({
      day: (
        <HiddenInput
          language={language}
          valueProp={TimeInputProps.day}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={17}
        />
      ),
      month: (
        <HiddenInput
          language={language}
          valueProp={TimeInputProps.month}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={17}
        />
      ),
      year: (
        <HiddenInput
          language={language}
          valueProp={TimeInputProps.year}
          date={splitDate}
          onChange={handleChangeDate}
          minWidth={34}
        />
      ),
      time: pickSettings?.isPickTime ? splitDate.time : undefined,
    }),
    [splitDate, handleChangeDate, pickSettings, language],
  );

  const dateStr = useMemo(() => DateFormat[language](dateForFormatter), [language, dateForFormatter]);

  return (
    <>
      <S.InputContainer
        ref={ref}
        onClick={handleContainerClick}
        data-open={pickSettings?.isDatePickerOpen || undefined}
        data-error={isError || undefined}
      >
        {dateStr}
        <CalendarInterfaceSVG className={S.calendarIconClassName} />
      </S.InputContainer>
      {isError && !pickSettings?.isDatePickerOpen && (
        <S.Error>{textProvider(language, Texts.incorrectDateEntered)}</S.Error>
      )}
    </>
  );
});
