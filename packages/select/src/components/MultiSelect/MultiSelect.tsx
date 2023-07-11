import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import RCSelect, { ActionMeta, createFilter, NamedProps as RCSelectNamedProps, ValueType } from 'react-select';
import type { RequireExactlyOne } from 'type-fest';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-product-input-decorator-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { SelectActionTypes } from '../../constants';
import {
  LoadingMessage,
  Menu,
  MenuList,
  MultiValue,
  NoOptionsMessage,
  Option,
  SingleValue,
} from '../../helperComponents/MultiSelect';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { MultiselectOptionType, SelectSizes } from '../../helpers/types';
import { styles } from '../../styles/multiSelect';

export type MultiSelectSearch = {
  defaultSearch: {
    onSelectOption(option?: MultiselectOptionType): void;
    onRemoveOption(option?: MultiselectOptionType): void;
  };
  inMenuSearch: {
    onSelectOption(option?: MultiselectOptionType): void;
    onRemoveOption(option?: MultiselectOptionType): void;
    onSelectOptions(options?: MultiselectOptionType[]): void;
    onRemoveOptions(): void;
    renderOption?(props: MultiselectOptionType): ReactNode;
    collapseOnReaching?: number;
  };
};

export type MultiSelectProps = {
  options: MultiselectOptionType[];
  value: MultiselectOptionType[];
  search: RequireExactlyOne<MultiSelectSearch, 'defaultSearch' | 'inMenuSearch'>;
  onInputChange?(value: string): void;
  error?: string;
  size?: SelectSizes;
} & Partial<
  Pick<
    RCSelectNamedProps,
    | 'className'
    | 'closeMenuOnScroll'
    | 'closeMenuOnSelect'
    | 'id'
    | 'inputValue'
    | 'isLoading'
    | 'maxMenuHeight'
    | 'placeholder'
    | 'onBlur'
    | 'onKeyDown'
  >
> &
  Pick<InputDecoratorPrivateProps, 'label' | 'labelTooltip' | 'optional' | 'hint'>;

export function MultiSelect(props: MultiSelectProps) {
  const {
    className,
    error,
    hint,
    id,
    inputValue,
    isLoading,
    label,
    labelTooltip,
    optional,
    options,
    placeholder,
    value,
    search: { defaultSearch, inMenuSearch },
    closeMenuOnScroll = false,
    closeMenuOnSelect = true,
    maxMenuHeight = 300,
    size = SelectSizes.Large,
    onBlur,
    onInputChange,
    onKeyDown,
  } = props;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);

  const isCollapsedValue = inMenuSearch && value?.length >= (inMenuSearch.collapseOnReaching ?? Infinity);
  const isMultiValue = !isCollapsedValue || undefined;

  const components = useMemo(
    () => ({
      IndicatorsContainer: () => <></>,
      LoadingMessage,
      Menu,
      MenuList,
      NoOptionsMessage,
      Option,
      ...(isCollapsedValue ? { SingleValue } : { MultiValue }),
    }),
    [isCollapsedValue],
  );

  const appliedStyles = useMemo(() => styles(size, error), [size, error]);

  const handleChange = (value: ValueType<MultiselectOptionType, true>, meta: ActionMeta<MultiselectOptionType>) => {
    if (defaultSearch) {
      switch (meta.action) {
        case SelectActionTypes.SelectOption:
          return defaultSearch.onSelectOption(meta.option);
        case SelectActionTypes.RemoveValue:
        case SelectActionTypes.PopValue:
          return defaultSearch.onRemoveOption(meta.removedValue);
        default:
          return;
      }
    }

    if (inMenuSearch) {
      switch (meta.action) {
        case SelectActionTypes.SelectOption:
          return Array.isArray(value) ? inMenuSearch.onSelectOptions(value) : inMenuSearch.onSelectOption(meta.option);
        case SelectActionTypes.RemoveValue:
        case SelectActionTypes.PopValue:
          return inMenuSearch.onRemoveOption(meta.removedValue);
        case SelectActionTypes.Reset:
          return inMenuSearch.onRemoveOptions();
        default:
          return;
      }
    }
  };

  useEffect(() => {
    const onClickOutside = ({ target }: MouseEvent) => {
      const element = containerRef.current;
      if (isOpened && (!element || !element.contains(target as Node))) {
        setIsOpened(false);
      }
    };

    document.body.addEventListener('click', onClickOutside);
    return () => document.body.removeEventListener('click', onClickOutside);
  }, [isOpened]);

  return (
    <InputDecoratorPrivate
      className={className}
      hint={hint}
      label={label}
      labelTooltip={labelTooltip}
      labelFor={id}
      optional={optional}
      error={error}
    >
      <div ref={containerRef}>
        <RCSelect
          backspaceRemovesValue
          closeMenuOnScroll={closeMenuOnScroll}
          closeMenuOnSelect={closeMenuOnSelect}
          components={components}
          filterOption={createFilter({
            ignoreCase: true,
            ignoreAccents: false,
            trim: true,
            matchFrom: 'start' as const,
          })}
          hideSelectedOptions={!inMenuSearch}
          inputValue={inputValue}
          menuIsOpen={isOpened || undefined}
          isFocused={isOpened || undefined}
          isLoading={isLoading}
          isMulti={isMultiValue}
          isMenuSearch={Boolean(inMenuSearch)}
          isSearchable={Boolean(defaultSearch)}
          maxMenuHeight={maxMenuHeight}
          openMenuOnFocus
          options={isLoading ? undefined : options}
          placeholder={placeholder || textProvider<string>(languageCode, Texts.SelectPlaceholder)}
          styles={appliedStyles}
          tabSelectsValue={false}
          value={value}
          renderOption={inMenuSearch ? inMenuSearch.renderOption : undefined}
          onChange={handleChange}
          onMenuInputFocus={() => setIsOpened(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onInputChange={onInputChange}
        />
      </div>
    </InputDecoratorPrivate>
  );
}
