import {
  ComponentProps,
  ComponentRef,
  forwardRef,
  ForwardRefExoticComponent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import RCSelect, {
  components,
  FormatOptionLabelMeta,
  GroupType,
  OptionTypeBase as RCOptionTypeBase,
  SelectComponentsConfig,
  StylesConfig,
} from 'react-select';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-product-input-decorator-private';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { MenuPortal, RCMenuPortal } from '../../helperComponents/MenuPortal';
import { checkMobileDevice } from '../../helpers/checkMobileDevice';
import { getSelectStyles } from '../../helpers/getSelectStyles';
import { getSharedComponents } from '../../helpers/getSharedComponents';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { SelectType } from '../../helpers/types';
import * as S from './styled';

export { default as RCSelect } from 'react-select';

export type OptionPrefixProps = ComponentProps<typeof components.Option>;
export type ControlPrefixProps = ComponentProps<typeof components.Control>;
export type MultiValueContainerPrefixProps = ComponentProps<typeof components.MultiValueContainer>;
export type OptionTypeBase = RCOptionTypeBase;

type RCProps = ComponentProps<typeof RCSelect>;
type RCComponents = SelectComponentsConfig<typeof components, boolean>;

const toLow = (str?: string): string => (str ? `${str}`.toLowerCase() : '');

export type SelectProps = {
  type?: SelectType;
  prefixControl?: (props: ControlPrefixProps) => JSX.Element;
  postfixControl?: (props: ControlPrefixProps) => JSX.Element;
  prefixMultiValueContainer?: (props: MultiValueContainerPrefixProps) => JSX.Element;
  prefixOption?: (props: OptionPrefixProps) => JSX.Element;
  postfixOption?: (props: OptionPrefixProps) => JSX.Element;
  className?: string;
  isLoading?: boolean;
  error?: string;
  components?: RCComponents;
  optionNoWrap?: boolean;
  menuRelative?: boolean;
  isSearchableCustom?: boolean;
  searchableProps?: string[];
  footer?: ReactNode;
  collapsedGroup?: boolean;
  selectStyles?: StylesConfig<OptionTypeBase, false>;
} & Omit<RCProps, 'components'> &
  Pick<InputDecoratorPrivateProps, 'label' | 'labelTooltip' | 'optional' | 'hint'>;

type SelectRef = ComponentRef<typeof RCSelect>;

export const Select = forwardRef<SelectRef, WithSupportProps<SelectProps>>((props, ref) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const portalTargetRef = useRef<HTMLDivElement>(null);

  const {
    id,
    options,
    type = 'medium',
    closeMenuOnSelect = true,
    isSearchable = false,
    searchableProps = ['value'],
    className,
    isLoading,
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
    hint,
    label,
    labelTooltip,
    optional,
    error,
    selectStyles,
  } = props;

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [stateOptions, setOptions] = useState<RCComponents[]>();
  const [inputValue, setInputSearch] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [customStyles, setCustomStyles] = useState(getSelectStyles(type));

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
    onMenuClose?.();
  }, [onMenuClose]);

  useEffect(() => {
    setCustomStyles(getSelectStyles(type));
  }, [type]);

  const filterOptions = useCallback(
    (options: RCOptionTypeBase, inputValue: string) =>
      options
        .map((option: SelectProps['options']) => {
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
        .filter((option: SelectProps['options']) => {
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
    (event: MouseEvent) => {
      if (!portalRef.current || !portalTargetRef.current) {
        return;
      }

      const isClickInsideSelect = portalTargetRef.current.contains(event.target as Node);

      if (isClickInsideSelect) {
        return;
      }

      const isClickInsideDropdown = portalRef.current.contains(event.target as Node);

      if (isClickInsideDropdown) {
        return;
      }

      closeMenu();
    },
    [closeMenu],
  );

  useEffect(() => {
    document.body.addEventListener('click', clickOutside);

    return (): void => {
      document.body.removeEventListener('click', clickOutside);
    };
  }, [clickOutside]);

  const memoizeCustomComponents = useMemo(
    () =>
      getSharedComponents(
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
      MenuPortal: (props: RCMenuPortal) => <MenuPortal ref={portalRef} {...props} />,
    }),
    [memoizeCustomComponents, components],
  );

  const toggleMenu = useCallback((): void => {
    setIsOpen(isOpen => !isOpen);
  }, []);

  const formatGroupLabel = useCallback(
    (group: GroupType<RCOptionTypeBase>) => <div data-test-group-id={`${group.label}`}>{group.label}</div>,
    [],
  );

  const formatOptionLabelInner = useCallback(
    (option: RCOptionTypeBase, labelMeta: FormatOptionLabelMeta<RCOptionTypeBase, boolean>) => (
      <div data-test-option-id={`${option.value}`}>
        {formatOptionLabel ? formatOptionLabel(option, labelMeta) : option.label}
      </div>
    ),
    [formatOptionLabel],
  );

  const appliedSelectStyles = useMemo(() => {
    if (!selectStyles) {
      return customStyles.styles;
    }
    return {
      ...customStyles.styles,
      ...selectStyles,
    };
  }, [customStyles, selectStyles]);

  return (
    <InputDecoratorPrivate
      className={className}
      hint={hint}
      label={label}
      labelTooltip={labelTooltip}
      labelFor={id}
      optional={optional}
      error={error}
      {...extractSupportProps(props)}
    >
      <S.PortalTarget ref={portalTargetRef}>
        <RCSelect
          {...props}
          ref={ref}
          placeholder={placeholder || textProvider<string>(languageCode, Texts.SelectPlaceholder)}
          onMenuClose={onMenuClose}
          onChange={(...args): void => {
            props?.onChange?.(...args);
            if (closeMenuOnSelect) {
              closeMenu();
            }
          }}
          options={isLoading ? undefined : stateOptions}
          formatGroupLabel={formatGroupLabel}
          formatOptionLabel={formatOptionLabelInner}
          components={componentsState}
          styles={appliedSelectStyles}
          theme={customStyles.theme}
          isSearchable={false}
          isLoading={isLoading}
          menuIsOpen={checkMobileDevice() ? undefined : isOpen}
          menuPortalTarget={portalTargetRef.current}
          blurInputOnSelect={checkMobileDevice() || undefined}
          isSearchableCustom={isSearchable}
          backspaceRemovesValue={false}
          hideSelectedOptions={false}
          searchValue={inputValue}
          onSearch={setInputSearch}
          toggleMenu={toggleMenu}
          onKeyDown={(e: KeyboardEvent<HTMLElement>): void => {
            /* todo: fix this `dirty` hack */
            e.defaultPrevented = true;
          }}
          collapsedGroup={collapsedGroup}
        />
      </S.PortalTarget>
    </InputDecoratorPrivate>
  );
  // for storybook args autobinding
  // see https://github.com/storybookjs/storybook/issues/15334
}) as ForwardRefExoticComponent<SelectProps>;
