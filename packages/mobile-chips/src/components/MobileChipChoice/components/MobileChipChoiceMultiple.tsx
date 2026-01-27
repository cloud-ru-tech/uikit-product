import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ItemId, MobileDroplist, SelectionSingleValueType } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { useAutoApplyFooter, useHandleOnKeyDown, useOptionSearch } from '../hooks';
import { ContentRenderProps, MobileChipChoiceMultipleProps } from '../types';
import { FlattenOption, kindFlattenOptions } from '../utils';
import { transformOptionsToItems } from '../utils/options';
import { ChipChoiceBase } from './ChipChoiceBase';
import styles from './styles.module.scss';

export type ChipChoiceMultipleValueFormatterProps<T extends ContentRenderProps = ContentRenderProps> = {
  value: FlattenOption<T>[];
  total: number;
  allLabel: string;
};

const defaultMultiValueLabelFormatter = ({ value, total, allLabel }: ChipChoiceMultipleValueFormatterProps): ItemId => {
  const len = value.length;

  if ([0, total].includes(len) && total !== len) {
    return allLabel;
  }

  if (len === 1) {
    return value[0].label;
  }

  return `${len.toString()}/${total}`;
};

export function MobileChipChoiceMultiple<T extends ContentRenderProps = ContentRenderProps>({
  value: valueProp,
  defaultValue,
  options,
  onChange: onChangeProp,
  valueRender,
  size = SIZE.S,
  label,
  searchable: searchableProp,
  contentRender,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  virtualized,
  disableFuzzySearch = false,
  autoApply = true,
  onApprove,
  onCancel,
  ...rest
}: MobileChipChoiceMultipleProps<T>) {
  const { t } = useLocale();

  const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [deferredValue, setDeferredValue] = useValueControl<SelectionSingleValueType[]>({
    defaultValue,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const searchable = searchableProp && Object.values(flattenOptions).length > 10;

  const [searchValue = '', setSearchValue] = useState<string>('');

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(() => (autoApply ? value : deferredValue), [autoApply, deferredValue, value]);

  const selectedOptions = useMemo(
    () => (value && value.length ? value.map(id => flattenOptions[id]).filter(Boolean) : ([] as FlattenOption<T>[])),
    [flattenOptions, value],
  );

  const valueToRender = valueRender
    ? valueRender(selectedOptions)
    : defaultMultiValueLabelFormatter({
        value: selectedOptions ?? [],
        total: Object.keys(flattenOptions).length,
        allLabel: t('Chips.allLabel'),
      });

  const optionSearch = useOptionSearch({ options, flatMapOptions, disableFuzzySearch });

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : optionSearch(searchValue)),
    [optionSearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const chipRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType[]) => {
      if (newValue !== undefined) {
        if (autoApply) {
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }

        if (searchValue) {
          listRef.current?.focus();
        }
      }
    },
    [autoApply, searchValue, setValue, setDeferredValue],
  );

  const handleOnCancelClick = () => {
    onCancel?.();

    setDeferredValue(value);
    setOpen(false);
  };

  const handleOnApproveClick = () => {
    onApprove?.();

    setValue(deferredValue);
    setOpen(false);
  };

  const autoApplyFooter = useAutoApplyFooter({
    autoApply,
    onApprove: handleOnApproveClick,
    onCancel: handleOnCancelClick,
  });

  useEffect(() => {
    if (searchValue && !open) {
      setSearchValue('');
    }
  }, [searchable, open, searchValue]);

  useEffect(() => {
    setDeferredValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <MobileDroplist
      items={items}
      selection={{
        value: dropListSelection,
        onChange: handleSelectionChange,
        mode: 'multiple',
      }}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      open={open}
      onOpenChange={open => {
        if (!open) {
          setSearchValue('');
          handleOnCancelClick();
        }
        setOpen(open);
      }}
      label={label}
      search={searchable ? { value: searchValue, onChange: setSearchValue } : undefined}
      virtualized={virtualized}
      footer={
        <div className={styles.footer}>
          <div className={styles.footerTopLine}>
            <span className={styles.counter}>{`${t('MobileChips.selectedN')}${value?.length || 0}`}</span>
            <ButtonFunction
              label={t('MobileChips.resetAll')}
              onClick={() => {
                handleSelectionChange([]);
              }}
              size='m'
            />
          </div>

          {autoApply ? (
            <ButtonFilled
              fullWidth
              label={t('MobileChips.select')}
              onClick={() => {
                setOpen(false);
              }}
              size='l'
            />
          ) : (
            autoApplyFooter
          )}
        </div>
      }
    >
      <ChipChoiceBase
        {...rest}
        ref={chipRef}
        onClearButtonClick={onClearButtonClick}
        value={value}
        valueToRender={valueToRender}
        label={label}
        loading={rest.loading}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </MobileDroplist>
  );
}
