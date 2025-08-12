import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { Calendar, CalendarProps } from '@snack-uikit/calendar';
import { Scroll } from '@snack-uikit/scroll';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';
import styles from './styles.module.scss';

type ChipChoiceDateWithSeconds = {
  mode?: 'date-time';
  showSeconds?: boolean;
};

export type MobileChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
  valueRender?(value?: Date): ReactNode;
  mode?: Exclude<CalendarProps['mode'], 'range'>;
} & (
    | ChipChoiceDateWithSeconds
    | {
        mode?: 'date' | 'month' | 'year';
      }
  );

export function MobileChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  mode = 'date',
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  ...rest
}: MobileChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useValueControl<Date>({ value, defaultValue, onChange });

  const showSeconds = mode === 'date-time' ? ((rest as ChipChoiceDateWithSeconds).showSeconds ?? true) : undefined;

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

    const date = new Date(selectedValue);

    if (mode === 'date-time') {
      return date.toLocaleString(DEFAULT_LOCALE, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
      });
    }

    return date.toLocaleDateString(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: mode === 'date' ? 'numeric' : undefined,
    });
  }, [mode, selectedValue, showSeconds, t, valueRender]);

  const handleChangeValue = useCallback(
    (value: Date) => {
      setSelectedValue(value);
      closeDroplist();
    },
    [closeDroplist, setSelectedValue],
  );

  const navigationStartRef = useRef<HTMLButtonElement>(null);

  return (
    <MobileDropdown
      content={
        <Scroll className={mode === 'date-time' ? styles.dateTimeWrapper : styles.dateWrapper} barHideStrategy='never'>
          <Calendar
            mode={mode}
            size='l'
            value={selectedValue}
            onChangeValue={handleChangeValue}
            navigationStartRef={navigationStartRef}
            onFocusLeave={closeDroplist}
            showSeconds={showSeconds}
            locale={DEFAULT_LOCALE}
          />
        </Scroll>
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
        onKeyDown={handleOnKeyDown()}
      />
    </MobileDropdown>
  );
}
