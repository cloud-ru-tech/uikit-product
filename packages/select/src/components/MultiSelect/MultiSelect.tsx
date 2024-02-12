import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import RCSelect, { ActionMeta, createFilter, NamedProps as RCSelectNamedProps, ValueType } from 'react-select';

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
} from '../../helperComponents/MultiSelect';
import { sortOptionsByFixedFirst } from '../../helpers/sortOptionsByFixedFirst';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { MultiSelectModeType, MultiSelectOptionType, SelectSizes } from '../../helpers/types';
import { styles } from '../../styles/multiSelect';

type MultiSelectSearch =
  | {
      type: MultiSelectModeType.InInputSearch;
      props: {
        onSelectOption(option?: MultiSelectOptionType): void;
        onRemoveOption(option?: MultiSelectOptionType): void;
      };
    }
  | {
      type: MultiSelectModeType.InMenuSearch;
      props: {
        onSelectOption(option?: MultiSelectOptionType): void;
        onRemoveOption(option?: MultiSelectOptionType): void;
        onSelectOptions(options?: MultiSelectOptionType[]): void;
        onRemoveOptions(): void;
        renderOption?(props: MultiSelectOptionType): ReactNode;
        collapseOnReaching?: number;
      };
    }
  | {
      type: MultiSelectModeType.NoneSearch;
      props: {
        onSelectOption(option?: MultiSelectOptionType): void;
        onRemoveOption(option?: MultiSelectOptionType): void;
        renderOption?(props: MultiSelectOptionType): ReactNode;
        collapseOnReaching?: number;
        tagValuesDropdownClassName?: string;
        tagValueClassName?: string;
      };
    };

export type MultiSelectProps = {
  options: MultiSelectOptionType[];
  value: MultiSelectOptionType[];
  mode: MultiSelectSearch;
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
    | 'isDisabled'
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
    mode,
    isDisabled,
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

  const isNoneSearch = mode.type === MultiSelectModeType.NoneSearch;
  const isInMenuSearch = mode.type === MultiSelectModeType.InMenuSearch;

  const components = useMemo(
    () => ({
      IndicatorsContainer: () => <></>,
      LoadingMessage,
      Menu: isNoneSearch ? () => <></> : Menu,
      MenuList,
      NoOptionsMessage,
      Option,
      MultiValue,
    }),
    [isNoneSearch],
  );

  const appliedStyles = useMemo(() => styles(size, error), [size, error]);

  const handleChange = (newValue: ValueType<MultiSelectOptionType, true>, meta: ActionMeta<MultiSelectOptionType>) => {
    switch (meta.action) {
      case SelectActionTypes.SelectOption:
        return isInMenuSearch && Array.isArray(newValue)
          ? mode.props.onSelectOptions(newValue)
          : mode.props.onSelectOption(meta.option);
      case SelectActionTypes.RemoveValue:
      case SelectActionTypes.PopValue:
        if (meta?.removedValue?.isFixed) {
          return;
        }
        mode.props.onRemoveOption(meta.removedValue);
        return;
      case SelectActionTypes.Reset:
        if (isInMenuSearch) {
          return mode.props.onSelectOptions(newValue?.filter(v => v.isFixed));
        }
      default:
        return;
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

  const sortedValue = useMemo(() => sortOptionsByFixedFirst(value), [value]);

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
            matchFrom: 'any' as const,
          })}
          inputValue={inputValue}
          menuIsOpen={isOpened || undefined}
          mode={mode}
          isFocused={isOpened || undefined}
          isLoading={isLoading}
          isMulti
          hideSelectedOptions={!isInMenuSearch}
          isSearchable={!isInMenuSearch}
          maxMenuHeight={maxMenuHeight}
          openMenuOnFocus
          options={isLoading ? undefined : options}
          placeholder={placeholder || textProvider<string>(languageCode, Texts.SelectPlaceholder)}
          styles={appliedStyles}
          tabSelectsValue={false}
          value={sortedValue}
          onChange={handleChange}
          onMenuInputFocus={() => setIsOpened(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onInputChange={onInputChange}
          isDisabled={isDisabled}
        />
      </div>
    </InputDecoratorPrivate>
  );
}

MultiSelect.sizes = SelectSizes;
MultiSelect.types = MultiSelectModeType;
