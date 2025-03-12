import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { TimePicker, TimePickerProps } from '@snack-uikit/calendar';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';
import styles from './styles.module.scss';

const getStringTimeValue = (
  time: TimePickerProps['value'],
  { showSeconds, locale }: Pick<TimePickerProps, 'showSeconds'> & { locale: Intl.Locale },
) => {
  if (!time) {
    return '';
  }

  const date = new Date();
  date.setHours(time.hours ?? 0);
  date.setMinutes(time.minutes ?? 0);
  date.setSeconds(time.seconds ?? 0);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: showSeconds ? 'numeric' : undefined,
  });
};

type TimeValue = TimePickerProps['value'];

export type MobileChipChoiceTimeProps = Omit<ChipChoiceCommonProps, 'widthStrategy'> &
  Pick<TimePickerProps, 'value' | 'defaultValue' | 'showSeconds'> & {
    /** Колбек смены значения */
    onChange?(value: TimeValue): void;
    /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
    valueRender?(value?: TimeValue): ReactNode;
  };

export function MobileChipChoiceTime({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  showSeconds = true,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  ...rest
}: MobileChipChoiceTimeProps) {
  const [selectedValue, setSelectedValue] = useValueControl<TimeValue>({ value, defaultValue, onChange });

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, [setOpen]);

  const { t } = useLocale('Chips');

  const valueToRender = useMemo(() => {
    if (valueRender) {
      return valueRender(selectedValue);
    }

    if (!selectedValue) return t('allLabel');

    return getStringTimeValue(selectedValue, { showSeconds, locale: DEFAULT_LOCALE });
  }, [selectedValue, showSeconds, t, valueRender]);

  const handleChangeValue = useCallback(
    (value: TimeValue) => {
      setSelectedValue(value);
      closeDroplist();
    },
    [closeDroplist, setSelectedValue],
  );

  const navigationStartRef = useRef<HTMLButtonElement>(null);
  const focusNavigationStartItem = () => setTimeout(() => navigationStartRef.current?.focus(), 0);

  return (
    <MobileDropdown
      content={
        <TimePicker
          className={styles.timeWrapper}
          value={selectedValue}
          size='l'
          fitToContainer={false}
          onChangeValue={handleChangeValue}
          navigationStartRef={navigationStartRef}
          onFocusLeave={closeDroplist}
          showSeconds={showSeconds}
        />
      }
      open={open}
      onOpenChange={setOpen}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
    >
      <ChipChoiceBase
        {...rest}
        ref={localRef}
        onClearButtonClick={onClearButtonClick}
        value={selectedValue}
        valueToRender={valueToRender}
        size={size}
        onKeyDown={handleOnKeyDown(focusNavigationStartItem)}
      />
    </MobileDropdown>
  );
}
