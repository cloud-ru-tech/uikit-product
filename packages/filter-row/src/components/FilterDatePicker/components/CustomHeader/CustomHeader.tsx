import { cx } from '@linaria/core';
import { format, isValid } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

import { ArrowBoldRightInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputMask } from '@sbercloud/uikit-product-input';

import { DEFAULT_DATE_FORMAT } from '../../helpers/constants';
import { isValidDateString } from '../../helpers/isValidDateString';
import { parseDateString } from '../../helpers/parseDateString';
import { InnerDate } from '../../helpers/types';
import { MonthYearSelection } from './MonthYearSelection';
import * as S from './styled';

type HeaderProps = {
  startDate: string | undefined;
  endDate?: string | undefined;
  isPeriod?: boolean;
  openToDate: string;
  onChangeOpenToDate: (date: Date) => void;
  onChange: (dates: [InnerDate, InnerDate]) => void;
};

export function CustomHeader({ isPeriod, startDate, endDate, openToDate, onChangeOpenToDate, onChange }: HeaderProps) {
  const [innerDate, setInnerDate] = useState<[string | undefined, string | undefined]>([
    startDate ? format(new Date(startDate), DEFAULT_DATE_FORMAT) : undefined,
    endDate ? format(new Date(endDate), DEFAULT_DATE_FORMAT) : undefined,
  ]);

  const [innerStartDate, innerEndDate] = innerDate;

  const handleChangeStartDate = useCallback(
    (newStartDate: string) => {
      setInnerDate(([_, end]) => [newStartDate, end]);
      const date = parseDateString(newStartDate);

      if (newStartDate !== innerStartDate && isValidDateString(newStartDate)) {
        onChange([date, endDate ? new Date(endDate) : undefined]);

        if (date) {
          onChangeOpenToDate(date);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDate],
  );

  const handleChangeEndDate = useCallback(
    (newEndDate: string) => {
      setInnerDate(([start]) => [start, newEndDate]);
      const date = parseDateString(newEndDate);

      if (newEndDate !== innerEndDate && isValidDateString(newEndDate)) {
        onChange([startDate ? new Date(startDate) : undefined, date]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate],
  );

  useEffect(() => {
    const date = startDate ? new Date(startDate) : undefined;

    if (date && isValid(date)) {
      setInnerDate(([_, end]) => [format(date, DEFAULT_DATE_FORMAT), end]);
    } else if (!date) {
      setInnerDate(([_, end]) => [date, end]);
    }
  }, [startDate]);

  useEffect(() => {
    const date = endDate ? new Date(endDate) : undefined;

    if (date && isValid(date)) {
      setInnerDate(([start]) => [start, format(date, DEFAULT_DATE_FORMAT)]);
    } else if (!date) {
      setInnerDate(([start]) => [start, date]);
    }
  }, [endDate]);

  return (
    <S.Container>
      <S.Inputs>
        <InputMask
          value={innerStartDate}
          className={cx(S.inputClassName, isPeriod ? S.inputClassNamePeriod : S.inputClassNameBase)}
          onChange={handleChangeStartDate}
          mask={InputMask.masks.Date}
          hideClearButton
        />
        {isPeriod && (
          <>
            <ArrowBoldRightInterfaceSVG width={24} height={24} className={S.inputsDividerClassName} />
            <InputMask
              value={innerEndDate}
              className={cx(S.inputClassName, isPeriod ? S.inputClassNamePeriod : S.inputClassNameBase)}
              onChange={handleChangeEndDate}
              mask={InputMask.masks.Date}
              hideClearButton
            />
          </>
        )}
      </S.Inputs>

      <MonthYearSelection openToDate={openToDate} handleChangeDate={onChangeOpenToDate} />
    </S.Container>
  );
}
