import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RCSelect, { OptionTypeBase as RCOptionTypeBase, SelectComponentsConfig, components } from 'react-select';

import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { checkMobileDevice } from '../../helpers/checkMobileDevice';
import getSelectorStyles from '../../helpers/getSelectStyles';
import getCustomComponents from '../../helpers/getSharedComponents';
import { Texts, textProvider } from '../../helpers/texts-provider';
import { SelectType } from '../../helpers/types';

export { default as RCSelect } from 'react-select';

export type OptionPrefixProps = React.ComponentProps<typeof components.Option>;
export type ControlPrefixProps = React.ComponentProps<typeof components.Control>;
export type MultiValueContainerPrefixProps = React.ComponentProps<typeof components.MultiValueContainer>;
export type OptionTypeBase = RCOptionTypeBase;

type RCProps = React.ComponentProps<typeof RCSelect>;

const toLow = (str?: string): string => (str ? `${str}`.toLowerCase() : '');

export interface ISelectProps<CustomOptionType> extends Omit<RCProps, 'components'> {
  type?: SelectType;
  prefixControl?: (props: ControlPrefixProps) => JSX.Element;
  postfixControl?: (props: ControlPrefixProps) => JSX.Element;
  prefixMultiValueContainer?: (props: MultiValueContainerPrefixProps) => JSX.Element;
  prefixOption?: (props: OptionPrefixProps) => JSX.Element;
  postfixOption?: (props: OptionPrefixProps) => JSX.Element;
  className?: string;
  error?: boolean;
  components?: SelectComponentsConfig<CustomOptionType, any>;
  optionNoWrap?: boolean;
  menuRelative?: boolean;
  isSearchableCustom?: boolean;
  searchableProps?: string[];
  footer?: React.ReactNode;
  customRef?: (instance: RCSelect<CustomOptionType> | null) => void;
  collapsedGroup?: boolean;
}

function checkMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem));
}

export const Select = <CustomOptionType extends OptionTypeBase>(
  props: WithSupportProps<ISelectProps<CustomOptionType>>,
): JSX.Element => {
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    options,
    type = 'medium',
    closeMenuOnSelect = true,
    isSearchable = false,
    searchableProps = ['value'],
    className,
    customRef,
    onMenuClose,
    components,
    prefixControl,
    postfixControl,
    prefixOption,
    postfixOption,
    prefixMultiValueContainer,
    collapsedGroup,
    placeholder,
    formatOptionLabel,
  } = props;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [stateOptions, setOptions] = useState<CustomOptionType[]>();
  const [inputValue, setInputSearch] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [customStyles, setCustomStyles] = useState(getSelectorStyles(type));
  const closeMenu = useCallback((): void => {
    setIsOpen(false);
    onMenuClose?.();
  }, [onMenuClose]);

  useEffect(() => {
    setCustomStyles(getSelectorStyles(type));
  }, [type]);

  const filterOptions = useCallback(
    (options, inputValue) =>
      options
        .map((option: CustomOptionType) => {
          const childOptions = option.options;
          const isGroup = childOptions && Array.isArray(childOptions);

          if (isGroup) {
            return {
              ...option,
              options: filterOptions(childOptions, inputValue),
            };
          }
          return option;
        })
        .filter((option: CustomOptionType) => {
          const childOptions = option.options;
          const isGroup = childOptions && Array.isArray(childOptions);

          if (isGroup) {
            return childOptions.length;
          }

          return searchableProps.some(prop => toLow(option?.[prop])?.indexOf(toLow(inputValue)) !== -1);
        }),
    [searchableProps],
  );

  useEffect(() => {
    const opts = Array.isArray(options) ? options : [];
    if (!inputValue || !isSearchable) {
      setOptions(opts);
      return;
    }
    const nextOptions = filterOptions(opts, inputValue);
    setOptions(nextOptions);
  }, [options, inputValue, isSearchable, filterOptions]);

  const clickOutside = useCallback(
    event => {
      const isClickInside = selectRef?.current?.contains(event.target);
      if (!isClickInside) {
        closeMenu();
      }
    },
    [selectRef, closeMenu],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', clickOutside);
    } else {
      document.removeEventListener('click', clickOutside);
    }

    return (): void => {
      document.removeEventListener('click', clickOutside);
    };
  }, [clickOutside, isOpen]);

  const memoizeCustomComponents = useMemo(
    () =>
      getCustomComponents<CustomOptionType>(
        {
          prefixControl,
          postfixControl,
          prefixOption,
          postfixOption,
          prefixMultiValueContainer,
          collapsedGroup,
        },
        checkMobileDevice(),
      ),
    [prefixControl, postfixControl, prefixOption, postfixOption, prefixMultiValueContainer, collapsedGroup],
  );

  const componentsState = useMemo(
    () => ({
      ...memoizeCustomComponents,
      ...(components || {}),
    }),
    [memoizeCustomComponents, components],
  );

  const toggleMenu = (isMenuOpen?: boolean): void => {
    if (typeof isMenuOpen === 'boolean') {
      setIsOpen(isMenuOpen);
      return;
    }

    setIsOpen(!isOpen);
  };

  const formatGroupLabel = useCallback(group => <div data-test-group-id={`${group.label}`}>{group.label}</div>, []);

  const formatOptionLabelInner = useCallback(
    option => (
      <div data-test-option-id={`${option.value}`}>{formatOptionLabel ? formatOptionLabel(option) : option.label}</div>
    ),
    [],
  );

  return (
    <div className={className} ref={selectRef} {...extractSupportProps(props)}>
      <RCSelect<CustomOptionType>
        {...props}
        placeholder={placeholder || textProvider<string>(languageCode, Texts.SelectPlaceholder)}
        onMenuClose={onMenuClose}
        ref={(instance): void => {
          customRef?.(instance as RCSelect<CustomOptionType>);
        }}
        onChange={(...args): void => {
          props?.onChange?.(...args);
          if (closeMenuOnSelect) {
            closeMenu();
          }
        }}
        options={stateOptions}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabelInner}
        components={componentsState}
        styles={customStyles.styles}
        theme={customStyles.theme}
        isSearchable={false}
        menuIsOpen={checkMobileDevice() ? undefined : isOpen}
        blurInputOnSelect={checkMobileDevice() || undefined}
        isSearchableCustom={isSearchable}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        searchValue={inputValue}
        onSearch={setInputSearch}
        toggleMenu={toggleMenu}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>): void => {
          /* todo: fix this `dirty` hack */
          e.defaultPrevented = true;
        }}
        collapsedGroup={collapsedGroup}
      />
    </div>
  );
};
