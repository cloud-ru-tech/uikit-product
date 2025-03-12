import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { ItemId, MobileDroplist, SelectionSingleValueType } from '@sbercloud/uikit-product-mobile-dropdown';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { useAutoApplyFooter, useHandleOnKeyDown, useOptionSearch } from '../hooks';
import { ContentRenderProps, MobileChipChoiceSingleProps } from '../types';
import { FlattenOption, kindFlattenOptions } from '../utils';
import { transformOptionsToItems } from '../utils/options';
import { ChipChoiceBase } from './ChipChoiceBase';
import styles from './styles.module.scss';

export type ChipChoiceSingleValueFormatterProps = {
  label?: ItemId;
  allLabel?: string;
};

export function defaultSingleValueFormatter({ label, allLabel }: ChipChoiceSingleValueFormatterProps) {
  return label ?? allLabel;
}

export function MobileChipChoiceSingle<T extends ContentRenderProps = ContentRenderProps>({
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
}: MobileChipChoiceSingleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [deferredValue, setDeferredValue] = useValueControl<SelectionSingleValueType>({
    defaultValue,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const searchable = searchableProp && Object.values(flattenOptions).length > 5;

  const { t } = useLocale('Chips');

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(() => (autoApply ? value : deferredValue), [autoApply, deferredValue, value]);

  const selectedOption = useMemo(
    () => (value ? flattenOptions[value] : ({} as FlattenOption<T>)),
    [flattenOptions, value],
  );

  const [searchValue, setSearchValue] = useState<string>('');

  const valueToRender = valueRender
    ? valueRender(selectedOption)
    : defaultSingleValueFormatter({ label: selectedOption?.label, allLabel: t('allLabel') });

  const optionSearch = useOptionSearch({ options, flatMapOptions, disableFuzzySearch });

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : optionSearch(searchValue)),
    [optionSearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const chipRef = useRef<HTMLDivElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      if (newValue !== undefined) {
        chipRef.current?.focus();

        if (autoApply) {
          setOpen(false);
          setSearchValue('');
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }
      }
    },
    [autoApply, setOpen, setValue, setDeferredValue],
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

  return (
    <MobileDroplist
      items={items}
      selection={{
        value: dropListSelection,
        onChange: handleSelectionChange,
        mode: 'single',
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
      virtualized={virtualized}
      footer={<div className={styles.footer}>{!autoApply && autoApplyFooter}</div>}
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
