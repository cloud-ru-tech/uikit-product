import { ReactNode, useCallback, useRef, useState } from 'react';

import { MobileDropdown } from '@sbercloud/uikit-product-mobile-dropdown';
import { Calendar } from '@snack-uikit/calendar';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

export type MobileChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
  valueRender?(value?: Date): ReactNode;
};

export function MobileChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  ...rest
}: MobileChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useValueControl<Date>({ value, defaultValue, onChange });

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, []);

  const { t } = useLocale('Chips');

  const valueToRender = valueRender
    ? valueRender(selectedValue)
    : (selectedValue && new Date(selectedValue).toLocaleDateString()) || t('allLabel');

  const clearValue = () => setSelectedValue(undefined);

  return (
    <MobileDropdown
      content={
        <Calendar
          mode='date'
          size='l'
          value={selectedValue}
          onChangeValue={value => {
            setSelectedValue(value);
            closeDroplist();
          }}
          navigationStartRef={element => element?.focus()}
          onFocusLeave={closeDroplist}
        />
      }
      open={open}
      onOpenChange={setOpen}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
    >
      <ChipChoiceBase
        {...rest}
        ref={localRef}
        onClearButtonClick={clearValue}
        value={selectedValue}
        valueToRender={valueToRender}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </MobileDropdown>
  );
}
