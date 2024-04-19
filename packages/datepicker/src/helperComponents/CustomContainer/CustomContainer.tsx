import isEqual from 'date-fns/isEqual';
import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';
import { Switch } from '@snack-uikit/toggles';

import { DatePickerProps, TimePicker } from '../../components';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { PickSettingProps } from '../../helpers/types';
import * as S from './styled';

export type CustomContainerCustomProps = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<null | Date>>;
  pickTime?: DatePickerProps['pickTime'];
  pickSettings: PickSettingProps;
  handleChange?: (date: Date | null) => void;
} & Partial<ReactDatePickerProps>;

export type CustomContainerProps = {
  className?: string;
  children: ReactNode[];
};

export function CustomContainer(customProps: CustomContainerCustomProps, props: CustomContainerProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { children, className } = props;
  const { date, pickSettings, handleChange, minDate, maxDate } = customProps;
  const { pickTimeCheck, setPickTime, isPickTimeOptional, isPickTime } = pickSettings;

  const changeStartTime = useCallback(
    (date: Date | null) => {
      handleChange?.(date);
    },
    [handleChange],
  );

  const timeScope = useMemo(() => {
    const isMinDate =
      date && minDate && isEqual(new Date(date).setHours(0, 0, 0, 0), new Date(minDate).setHours(0, 0, 0, 0));

    const isMaxDate =
      date && maxDate && isEqual(new Date(date).setHours(0, 0, 0, 0), new Date(maxDate).setHours(0, 0, 0, 0));

    if (!isMinDate && !isMaxDate) return {};

    if (isMinDate && isMaxDate) {
      return {
        minTime: minDate,
        maxTime: maxDate,
      };
    }

    if (isMinDate) {
      return {
        minTime: minDate,
        maxTime: new Date(new Date().setHours(23, 59, 59, 999)),
      };
    }

    if (isMaxDate) {
      return {
        minTime: new Date(new Date().setHours(0, 0, 0, 0)),
        maxTime: maxDate,
      };
    }

    return {
      minTime: new Date(new Date().setHours(0, 0, 0, 0)),
      maxTime: new Date(new Date().setHours(23, 59, 59, 999)),
    };
  }, [date, maxDate, minDate]);

  const handleLabelClick = useCallback(() => setPickTime?.(!pickTimeCheck), [pickTimeCheck, setPickTime]);
  const handleSwitchChange = useCallback((checked: boolean) => setPickTime?.(checked), [setPickTime]);

  const disabled = useMemo(
    () => (minDate && date && minDate > date && maxDate && date > maxDate) || false,
    [minDate, date, maxDate],
  );

  return (
    <div className={className}>
      {isPickTime && (
        <>
          <S.Control>
            <TimePicker disabled={disabled} date={date} onChange={changeStartTime} {...timeScope} />
          </S.Control>
          <Divider />
        </>
      )}
      {children}
      {isPickTimeOptional && (
        <>
          <Divider />
          <S.Additional onClick={handleLabelClick}>
            {textProvider<string>(languageCode, Texts.SpecifyTime)}
            <Switch checked={Boolean(pickTimeCheck)} onChange={handleSwitchChange} />
          </S.Additional>
        </>
      )}
    </div>
  );
}
