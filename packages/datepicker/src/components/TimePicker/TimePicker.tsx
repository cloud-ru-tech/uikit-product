import { ModifierArguments, Obj } from '@popperjs/core';
import { useCallback, useMemo, useState } from 'react';
import RDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { CustomTimeInput } from '../../helperComponents/CustomTimeInput';
import * as S from './styled';

export interface TimePickerProps extends ReactDatePickerProps {
  date?: Date | null;
}

export const TimePicker: React.FC<TimePickerProps> = ({ date, onChange, minTime, maxTime, disabled }) => {
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
        timeFormat='HH:mm'
        customInput={<CustomTimeInput date={date} open={isOpen} />}
        onCalendarClose={close}
        onCalendarOpen={open}
        minTime={minTime}
        maxTime={maxTime}
        popperProps={popperProps}
      />
    </S.Container>
  );
};
