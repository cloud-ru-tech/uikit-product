import enGB from 'date-fns/locale/en-GB';
import ru from 'date-fns/locale/ru';
import { useCallback, useMemo, useState } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';

import { CustomContainer } from '../../helperComponents/CustomContainer';
import { CustomDateInput } from '../../helperComponents/CustomDateInput';
import { CustomHeader } from '../../helperComponents/CustomHeader';
import { Languages } from '../../helpers/texts-provider';
import { SettingType } from '../../helpers/types';
import * as S from './styled';

registerLocale(Languages.Ru, ru);
registerLocale(Languages.En, enGB);

export interface DatePickerProps {
  pickTime: SettingType;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  minDate?: Date;
  language?: Languages;
}

export const DatePicker = ({ value, pickTime, onChange, minDate, language = Languages.Ru }: DatePickerProps) => {
  const [isDatePickerOpen, setOpen] = useState(false);
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
      language,
    }),
    [date, setDate, pickSettings, minDate, language],
  );

  const memoizedCustomHeader = useCallback(
    CustomHeader.bind(null, {
      language,
    }),
    [language],
  );

  return (
    <S.Container>
      <RDatePicker
        minDate={minDate}
        selected={date}
        openToDate={date || undefined}
        onChange={handleChange}
        startDate={date}
        selectsRange={false}
        shouldCloseOnSelect
        showPopperArrow={false}
        locale={language}
        customInput={
          <CustomDateInput
            date={date}
            pickSettings={pickSettings}
            setDate={setDate}
            minDate={minDate}
            language={language}
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
