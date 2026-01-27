import { ReactNode, useCallback, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileDropdown } from '@cloud-ru/uikit-product-mobile-dropdown';
import { Calendar } from '@snack-uikit/calendar';

import { CHIP_CHOICE_TEST_IDS, DEFAULT_EMPTY_VALUE, SIZE } from '../../../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';
import styles from './styles.module.scss';

type Range = [Date, Date];

export type MobileChipChoiceDateRangeProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Range;
  /** Значение компонента по умолчанию */
  defaultValue?: Range;
  /** Колбек смены значения */
  onChange?(value: Range): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает массив выбранных значений */
  valueRender?(value?: Range): ReactNode;
};

type DefaultRangeFormatterProps = {
  value?: Range;
  allLabel?: string;
};

function defaultRangeFormatter({ value, allLabel }: DefaultRangeFormatterProps) {
  if (!value || !value.length) return allLabel;

  const [from, to] = value;

  return `${from.toLocaleDateString()} ${DEFAULT_EMPTY_VALUE} ${to.toLocaleDateString()}`;
}

export function MobileChipChoiceDateRange({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  ...rest
}: MobileChipChoiceDateRangeProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Range>(value, defaultValue, onChange);

  const { t } = useLocale('Chips');

  const valueToRender = valueRender
    ? valueRender(selectedValue)
    : defaultRangeFormatter({ value: selectedValue, allLabel: t('allLabel') });

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, [setOpen]);

  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  return (
    <MobileDropdown
      content={
        <div className={styles.dateWrapper}>
          <Calendar
            mode='range'
            size='l'
            value={selectedValue}
            onChangeValue={value => {
              setSelectedValue(value);
              closeDroplist();
            }}
            onFocusLeave={closeDroplist}
          />
        </div>
      }
      open={open}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      onOpenChange={setOpen}
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
