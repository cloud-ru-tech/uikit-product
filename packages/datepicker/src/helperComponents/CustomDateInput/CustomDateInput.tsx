import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import RDatePicker from 'react-datepicker';

import { CalendarInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { getSplitDate } from '../../helpers/getSplitDate';
import { isAfterMinDate } from '../../helpers/isAfterMinDate';
import { DateFormat, Texts, textProvider } from '../../helpers/texts-provider';
import { PickSettingProps, TSplitDateType, TimeInputProps } from '../../helpers/types';
import { HiddenInput } from '../HiddenInput';
import * as S from './styled';

export interface ICustomDateInputProps {
  setDate: (date: null | Date) => void;
  date: Date | null;
  minDate?: Date | null;
  onClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  calendarRef?: React.RefObject<RDatePicker>;
  pickSettings: PickSettingProps;
  size: number;
}

export const CustomDateInput = forwardRef<HTMLSpanElement, ICustomDateInputProps>((props, ref) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { date, setDate, onClick, pickSettings, minDate, size } = props;
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
      day: <HiddenInput valueProp={TimeInputProps.day} date={splitDate} onChange={handleChangeDate} minWidth={17} />,
      month: (
        <HiddenInput valueProp={TimeInputProps.month} date={splitDate} onChange={handleChangeDate} minWidth={17} />
      ),
      year: <HiddenInput valueProp={TimeInputProps.year} date={splitDate} onChange={handleChangeDate} minWidth={34} />,
      time: pickSettings?.isPickTime ? splitDate.time : undefined,
    }),
    [splitDate, handleChangeDate, pickSettings],
  );

  const dateStr = useMemo(() => DateFormat[languageCode](dateForFormatter), [languageCode, dateForFormatter]);

  return (
    <>
      <S.InputContainer
        ref={ref}
        onClick={handleContainerClick}
        data-open={pickSettings?.isDatePickerOpen || undefined}
        data-error={isError || undefined}
        size={size}
      >
        {dateStr}
        <CalendarInterfaceSVG className={S.calendarIconClassName} />
      </S.InputContainer>
      {isError && !pickSettings?.isDatePickerOpen && (
        <S.Error>{textProvider(languageCode, Texts.incorrectDateEntered)}</S.Error>
      )}
    </>
  );
});
