import isToday from 'date-fns/isToday';
import { useCallback, useMemo } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

import { Divider } from '@sbercloud/uikit-product-divider';
import { Switch } from '@sbercloud/uikit-product-switch';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DatePickerProps, TimePicker } from '../../components';
import { isAfterMinDate } from '../../helpers/isAfterMinDate';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { PickSettingProps } from '../../helpers/types';
import * as S from './styled';

export interface ICustomContainerProps extends Partial<ReactDatePickerProps> {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<null | Date>>;
  pickTime?: DatePickerProps['pickTime'];
  pickSettings: PickSettingProps;
  handleChange?: (date: Date | null) => void;
}

export interface ICustomContainer {
  className?: string;
  children: React.ReactNode[];
}

export const CustomContainer = (customProps: ICustomContainerProps, props: ICustomContainer): React.ReactNode => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { children, className } = props;
  const { date, pickSettings, handleChange, minDate } = customProps;
  const { pickTimeCheck, setPickTime, isPickTimeOptional, isPickTime } = pickSettings;

  const changeStartTime = useCallback((date: Date | null) => {
    handleChange?.(date);
  }, []);

  const timeScope = useMemo(() => {
    const isStartToday = date && isToday(date);
    if (!isStartToday) return {};
    return {
      minTime: new Date(),
      maxTime: new Date(new Date().setHours(23, 59, 59, 999)),
    };
  }, [date]);
  const handleLabelClick = useCallback(() => setPickTime?.(!pickTimeCheck), [pickTimeCheck, setPickTime]);
  const handleSwitchChange = useCallback(checked => setPickTime?.(checked), [setPickTime]);

  const disabled = useMemo(() => (minDate && date && !isAfterMinDate(minDate, date)) || false, [minDate, date]);

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
            {textProvider(languageCode, Texts.SpecifyTime)}
            <Switch checked={Boolean(pickTimeCheck)} onChange={handleSwitchChange} />
          </S.Additional>
        </>
      )}
    </div>
  );
};
