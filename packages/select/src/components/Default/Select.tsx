import { useLanguage } from '@sbercloud/uikit-react-localization';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RCSelect, {
  OptionTypeBase as RCOptionTypeBase,
  ValueType as RCValueType,
  SelectComponentsConfig,
  components,
} from 'react-select';

import getSelectorStyles from '../../helpers/getSelectStyles';
import getCustomComponents from '../../helpers/getSharedComponents';
import { Texts, textProvider } from '../../helpers/texts-provider';
import { SelectType } from '../../helpers/types';

export { default as RCSelect } from 'react-select';

export type OptionPrefixProps = React.ComponentProps<typeof components.Option>;
export type ControlPrefixProps = React.ComponentProps<typeof components.Control>;
export type MultiValueContainerPrefixProps = React.ComponentProps<typeof components.MultiValueContainer>;
export type OptionTypeBase = RCOptionTypeBase;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ValueType<OptionType extends OptionTypeBase> = RCValueType<OptionType>;

type RCProps = React.ComponentProps<typeof RCSelect>;

const toLow = (str?: string): string => (str ? `${str}`.toLowerCase() : '');

export interface ISelectProps<CustomOptionType> extends Omit<RCProps, 'components'> {
  type?: SelectType;
  prefixControl?: (props: ControlPrefixProps) => JSX.Element;
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

export const Select = <CustomOptionType extends OptionTypeBase>(props: ISelectProps<CustomOptionType>): JSX.Element => {
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
    prefixOption,
    postfixOption,
    prefixMultiValueContainer,
    collapsedGroup,
    placeholder,
  } = props;

  const language = useLanguage({ onlyEnabledLanguage: true });
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
    if (!inputValue || !isSearchable) {
      setOptions(options);
      return;
    }
    const nextOptions = filterOptions(options, inputValue);
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
      getCustomComponents<CustomOptionType>({
        prefixControl,
        prefixOption,
        postfixOption,
        prefixMultiValueContainer,
        collapsedGroup,
      }),
    [prefixControl, prefixOption, postfixOption, prefixMultiValueContainer, collapsedGroup],
  );

  const componentsState = useMemo(
    () => ({
      ...memoizeCustomComponents,
      ...(components || {}),
    }),
    [memoizeCustomComponents, components],
  );

  const toggleMenu = (isMenuOpen: boolean): void => {
    if (typeof isMenuOpen === 'boolean') {
      setIsOpen(isMenuOpen);
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={className} ref={selectRef}>
      <RCSelect<CustomOptionType>
        {...props}
        placeholder={placeholder || textProvider<string>(language, Texts.selectPlaceholder)}
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
        menuIsOpen={isOpen}
        components={componentsState}
        styles={customStyles.styles}
        theme={customStyles.theme}
        isSearchable={false}
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
