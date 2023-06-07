import { isAfter } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import ru from 'date-fns/locale/ru';
import { useState } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { Switch } from '@sbercloud/uikit-product-switch';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { CustomHeader } from './components/CustomHeader';
import { EmptyCalendarContainer, EmptyCalendarHeader } from './helpers/placeholderComponents';
import { textProvider, Texts } from './helpers/texts-provider';
import { InnerDate } from './helpers/types';
import * as S from './styled';
import * as StyledDatePicker from './styled.date-picker';

registerLocale(LanguageCodeType.ruRU, ru);
registerLocale(LanguageCodeType.enGB, enGB);

export type DatePickerProps = {
  onClear?: () => void;
  onChange?: (dates: [InnerDate, InnerDate?]) => void;
  value: [InnerDate, InnerDate?];
  minDate?: Date;
  maxDate?: Date;
};

export function FilterDatePicker({ value, minDate, maxDate, onClear, onChange }: DatePickerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [defaultStart = new Date(), defaultEnd] = value;
  const [isPeriod, setIsPeriod] = useState(Boolean(defaultStart) && Boolean(defaultEnd));

  const [startDate, setStartDate] = useState<InnerDate>(defaultStart);

  const [openToDate, setOpenToDate] = useState<Date>(startDate || defaultStart);
  const [endDate, setEndDate] = useState<InnerDate>(defaultEnd);

  const handleTogglePeriod = (isPeriod: boolean) => {
    setIsPeriod(isPeriod);

    if (!isPeriod) {
      setEndDate(undefined);
      onChange?.([startDate]);
    }
  };

  const handleChange = (dates: InnerDate | [InnerDate, InnerDate?] | null) => {
    if (!dates) {
      return;
    }

    let [start, end] = Array.isArray(dates) ? dates : [dates];

    const shouldTrigger = !isPeriod || (isPeriod && start && end);

    if (start && end && isAfter(start, end)) {
      [end, start] = [start, end];
    }

    setStartDate(start);
    setEndDate(end);

    if (shouldTrigger) {
      onChange?.([start, end]);
    }
  };

  const handleClear = () => {
    handleChange([undefined, undefined]);

    onClear?.();
  };

  const dateRange =
    minDate && maxDate && minDate > maxDate ? { max: minDate, min: maxDate } : { max: maxDate, min: minDate };

  return (
    <S.Container>
      <CustomHeader
        openToDate={openToDate?.toDateString()}
        onChangeOpenToDate={setOpenToDate}
        startDate={startDate?.toDateString()}
        endDate={endDate?.toDateString()}
        isPeriod={isPeriod}
        onChange={handleChange}
      />

      <StyledDatePicker.Container>
        <RDatePicker
          minDate={dateRange.min}
          maxDate={dateRange.max}
          selected={startDate}
          openToDate={openToDate}
          onChange={handleChange}
          startDate={startDate}
          shouldCloseOnSelect
          showPopperArrow={false}
          locale={languageCode}
          endDate={endDate}
          selectsRange={isPeriod}
          inline
          popperPlacement='top-end'
          renderCustomHeader={EmptyCalendarHeader}
          calendarContainer={EmptyCalendarContainer}
        />
      </StyledDatePicker.Container>

      <S.Footer>
        <S.Switch>
          <S.Label>{textProvider<string>(languageCode, Texts.SetPeriod)}</S.Label>

          <Switch checked={isPeriod} onChange={handleTogglePeriod} />
        </S.Switch>
        <Divider />
        <ButtonGhost
          onClick={handleClear}
          variant={ButtonGhost.variants.Secondary}
          text={textProvider<string>(languageCode, Texts.ClearData)}
        />
      </S.Footer>
    </S.Container>
  );
}
