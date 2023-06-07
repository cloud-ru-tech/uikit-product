import { addMonths, format, getYear, setMonth, setYear, subMonths } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import {
  ChevronLeftInterfaceSVG,
  ChevronRightInterfaceSVG,
  DropdownDownInterfaceSVG,
} from '@sbercloud/uikit-product-icons';

import { MenuItem } from '../../../FilterChip/components/MenuItem';
import { DEFAULT_DATE_FORMAT } from '../../helpers/constants';
import { parseDateString } from '../../helpers/parseDateString';
import { CURRENT_MONTH, getMonthOption, MONTHS, YEARS } from './helpers';
import * as S from './styled';

type MonthYearSelectionProps = {
  openToDate: string;
  handleChangeDate: (date: Date) => void;
};

export function MonthYearSelection({ openToDate, handleChangeDate }: MonthYearSelectionProps) {
  const dateToOpen = parseDateString(format(new Date(openToDate), DEFAULT_DATE_FORMAT)) || new Date();
  const ref = useRef(null);

  const openedMonth = dateToOpen ? getMonthOption(dateToOpen) : CURRENT_MONTH;
  const openedYear = getYear(dateToOpen);

  const [currentMonth, setCurrentMonth] = useState(openedMonth);
  const [currentYear, setCurrentYear] = useState(openedYear);

  const monthsOptions = MONTHS.map(month => {
    const handleClick = () => {
      setCurrentMonth(month);
      handleChangeDate(setMonth(dateToOpen, month.value));
    };

    return (
      <MenuItem className={S.menuItemMonthClassName} onClick={handleClick} key={month.value}>
        {month.title}
      </MenuItem>
    );
  });

  const yearsOptions = YEARS.map(year => {
    const handleClick = () => {
      setCurrentYear(year);
      handleChangeDate(setYear(dateToOpen, year));
    };

    return (
      <MenuItem className={S.menuItemYearClassName} onClick={handleClick} key={year}>
        {year}
      </MenuItem>
    );
  });

  const setDate = useCallback((newDateToOpen: Date) => {
    setCurrentMonth(getMonthOption(newDateToOpen));
    setCurrentYear(getYear(newDateToOpen));

    handleChangeDate(newDateToOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrementMonth = () => {
    setDate(addMonths(dateToOpen, 1));
  };

  const handleDecrementMonth = () => {
    setDate(subMonths(dateToOpen, 1));
  };

  useEffect(() => {
    setDate(new Date(openToDate));
  }, [openToDate, setDate]);

  return (
    <S.SelectionWrapper ref={ref}>
      <DropdownMenu placement={DropdownMenu.placements.BottomStart} actions={<>{monthsOptions}</>}>
        <ButtonGhost text={currentMonth.title} icon={<DropdownDownInterfaceSVG className={S.arrowlassName} />} />
      </DropdownMenu>

      <DropdownMenu placement={DropdownMenu.placements.BottomStart} actions={<>{yearsOptions}</>}>
        <ButtonGhost text={currentYear} icon={<DropdownDownInterfaceSVG className={S.arrowlassName} />} />
      </DropdownMenu>

      <S.Arrows>
        <ButtonIcon
          className={S.monthYearSelectionClassName}
          icon={<ChevronLeftInterfaceSVG onClick={handleDecrementMonth} />}
        />
        <ButtonIcon
          className={S.monthYearSelectionClassName}
          icon={<ChevronRightInterfaceSVG onClick={handleIncrementMonth} />}
        />
      </S.Arrows>
    </S.SelectionWrapper>
  );
}
