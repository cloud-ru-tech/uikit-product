import { CalendarInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import RDatePicker from 'react-datepicker';

import { HiddenInput } from '../../helperComponents/HiddenInput';
import { getSplitDate } from '../../helpers/getSplitDate';
import { isAfterMinDate } from '../../helpers/isAfterMinDate';
import { PickSettingProps, TSplitDateType, TimeInputProps } from '../../helpers/types';
import * as S from './styled';

export interface ICustomDateInputProps {
  setDate: (date: null | Date) => void;
  date: Date | null;
  minDate?: Date | null;
  onClick: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  calendarRef: React.RefObject<RDatePicker>;
  pickSettings: PickSettingProps;
}

export const CustomDateInput = forwardRef<HTMLSpanElement, Partial<ICustomDateInputProps>>((props, ref) => {
  const { date, setDate, onClick, pickSettings, minDate } = props;
  const [isError, setError] = useState(false);
  const [splitDate, setSplitDate] = useState<TSplitDateType>(getSplitDate(date, pickSettings?.isPickTime));

  useEffect(() => {
    const splitDate = getSplitDate(date, pickSettings?.isPickTime);
    setSplitDate(splitDate);
  }, [date]);

  const handleChangeDate = (splitDate: TSplitDateType): void => {
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
  };

  useEffect(() => {
    if (isError) setError(false);
  }, [date]);

  const handleContainerClick = useCallback(
    e => {
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <>
      <S.InputContainer
        ref={ref}
        onClick={handleContainerClick}
        data-open={pickSettings?.isDatePickerOpen || undefined}
        data-error={isError || undefined}
      >
        <>
          <HiddenInput valueProp={TimeInputProps.day} date={splitDate} onChange={handleChangeDate} minWidth={17} />
          <S.Dot>.</S.Dot>
          <HiddenInput valueProp={TimeInputProps.month} date={splitDate} onChange={handleChangeDate} minWidth={17} />
          <S.Dot>.</S.Dot>
          <HiddenInput valueProp={TimeInputProps.year} date={splitDate} onChange={handleChangeDate} minWidth={34} />
          {pickSettings?.isPickTime && <div>, {splitDate.time}</div>}
        </>
        <CalendarInterfaceSVG className={S.calendarIconClassName} />
      </S.InputContainer>
      {isError && !pickSettings?.isDatePickerOpen && <S.Error>Введена некорректная дата</S.Error>}
    </>
  );
});
