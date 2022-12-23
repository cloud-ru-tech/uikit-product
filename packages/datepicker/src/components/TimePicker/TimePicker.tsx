import { ModifierArguments, Obj } from '@popperjs/core';
import { useCallback, useMemo, useState } from 'react';
import RDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { CustomTimeInput } from '../../helperComponents/CustomTimeInput';
import { TimeFormat } from '../../helpers/texts-provider';
import * as S from './styled';

export type TimePickerProps = {
  date?: Date | null;
} & ReactDatePickerProps;

export function TimePicker({ date, onChange, minTime, maxTime, disabled }: TimePickerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isOpen, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  const popperProps = useMemo(
    () => ({
      modifiers: [
        {
          name: 'sameWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }: ModifierArguments<Obj>) => {
            state.styles.popper.minWidth = `${state.rects.reference.width}px`;
          },
        },
      ],
    }),
    [],
  );

  const timeFormat = useMemo(() => TimeFormat[languageCode], [languageCode]);

  return (
    <S.Container>
      <RDatePicker
        disabled={disabled}
        selected={date}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption=''
        timeFormat={timeFormat}
        customInput={<CustomTimeInput date={date} open={isOpen} language={languageCode} />}
        onCalendarClose={close}
        onCalendarOpen={open}
        minTime={minTime}
        maxTime={maxTime}
        popperProps={popperProps}
      />
    </S.Container>
  );
}
