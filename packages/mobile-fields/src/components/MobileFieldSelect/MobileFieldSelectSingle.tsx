import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  ForwardRefExoticComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { FieldDecorator } from '@snack-uikit/fields';
import { InputPrivate } from '@snack-uikit/input-private';
import { kindFlattenItems, List, ListProps, SelectionSingleValueType } from '@snack-uikit/list';
import { extractSupportProps, isBrowser, useLayoutEffect, useValueControl } from '@snack-uikit/utils';

import { FieldContainerPrivate, ItemContent, ItemContentProps } from '../../helperComponents';
import { usePostfix, usePrefix } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { useButtons, useHandleOnKeyDown, useSearchInput } from './hooks';
import { useSearch } from './legacy';
import styles from './styles.module.scss';
import { ItemWithId, MobileFieldSelectSingleProps, SelectedOptionFormatter } from './types';
import { extractFieldDecoratorProps, extractListProps, getArrowIcon, updateItems } from './utils';

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  item?.content.option || '';

export const MobileFieldSelectSingle: ForwardRefExoticComponent<
  PropsWithoutRef<MobileFieldSelectSingleProps> & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, MobileFieldSelectSingleProps>(
  (
    {
      id,
      name,
      placeholder,
      size = 's',
      options,
      virtualized,
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      disabled = false,
      readonly = false,
      searchable: searchableProp = true,
      showCopyButton = true,
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      required = false,
      validationState = 'default',
      search,
      enableFuzzySearch = true,
      autocomplete = false,
      prefixIcon,
      prefix,
      postfix,
      addOptionByEnter = false,
      open: openProp,
      onOpenChange,
      selectedOptionFormatter = defaultSelectedOptionFormatter,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

    const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
    const [value, setValue] = useValueControl<SelectionSingleValueType>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const [{ selectedItem, items = [] }, setItems] = useState<{
      selectedItem?: ItemWithId;
      items: ListProps['items'];
    }>(() => updateItems({ options, value, currentItems: [], selectedItem: undefined }));

    const { inputValue, setInputValue, prevInputValue } = useSearchInput({
      ...search,
      selectedOptionFormatter,
    });

    const prevSelectedItem = useRef<ItemWithId | undefined>(selectedItem);

    const prefixSettings = usePrefix({ prefix, disabled });
    const postfixSettings = usePostfix({ postfix, disabled });

    useLayoutEffect(() => {
      setItems(({ selectedItem }) => updateItems({ options, value, selectedItem }));
    }, [options, value]);

    const { flattenItems } = useMemo(() => kindFlattenItems({ items }), [items]);

    const searchable = (searchableProp && Object.values(flattenItems).length > 5) || autocomplete;

    useEffect(() => {
      if (
        prevSelectedItem.current &&
        prevSelectedItem.current.id === selectedItem?.id &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        prevSelectedItem.current.content.option === selectedItem?.content.option
      ) {
        return;
      }

      prevSelectedItem.current = selectedItem;
      setInputValue('');

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem, prevSelectedItem]);

    const onClear = useCallback(() => {
      setValue(undefined);
      localRef.current?.focus();
      if (required) {
        setOpen(true);
      }
    }, [required, setOpen, setValue]);

    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

    const { postfixButtons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
      readonly,
      size,
      showClearButton: showClearButton && !disabled && !readonly && value !== undefined,
      showCopyButton,
      inputRef: localRef,
      onClear,
      valueToCopy: selectedOptionFormatter(selectedItem),
    });

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && !buttonsRefs.filter(Boolean).includes(e.relatedTarget)) {
        setInputValue('');

        rest?.onBlur?.(e);
      }
    };

    const commonHandleOnKeyDown = useHandleOnKeyDown({
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
      setOpen,
    });

    const handleSelectionChange = useCallback(
      (newValue?: SelectionSingleValueType) => {
        localRef.current?.focus();
        setOpen(false);
        if (newValue !== undefined) {
          setValue(newValue);
        }
      },
      [setOpen, setValue],
    );

    const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (!open && prevInputValue.current !== inputValue) {
        setOpen(true);
      }

      if (e.code === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
      }

      if (addOptionByEnter && e.code === 'Enter' && inputValue !== '') {
        handleSelectionChange(inputValue);
      }

      commonHandleOnKeyDown(onKeyDown)(e);
    };

    const handleOpenChange = (open: boolean) => {
      if (!readonly && !disabled && isBrowser() && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);

        if (!open) {
          setInputValue('');
        }
      }
    };

    const searcher = useSearch(items, enableFuzzySearch);
    const result =
      autocomplete || !searchable || selectedOptionFormatter(selectedItem) === inputValue
        ? items
        : searcher(inputValue);

    const fieldValidationState = getValidationState({ validationState, error: rest.error });

    const listJsx = (
      <div className={styles.listWrapper}>
        <List
          {...extractListProps(rest)}
          size='l'
          virtualized={virtualized}
          items={result}
          contentRender={({ content, ...rest }) => {
            if (typeof content !== 'function') {
              return <ItemContent {...(content as ItemContentProps)} {...rest} />;
            }

            return content;
          }}
          scroll
          search={
            searchable
              ? {
                  value: inputValue,
                  onChange: setInputValue,
                }
              : undefined
          }
          selection={{
            mode: 'single',
            value: value,
            onChange: handleSelectionChange,
          }}
        />
      </div>
    );

    return (
      <>
        <FieldDecorator
          {...extractSupportProps(rest)}
          {...extractFieldDecoratorProps(rest)}
          validationState={fieldValidationState}
          required={required}
          readonly={readonly}
          labelFor={id}
          disabled={disabled}
          size={size}
        >
          <FieldContainerPrivate
            className={styles.container}
            validationState={fieldValidationState}
            disabled={disabled}
            readonly={readonly}
            focused={open}
            variant={'single-line-container'}
            inputRef={localRef}
            size={size}
            prefix={
              (prefixIcon || prefixSettings.show) && (
                <>
                  {prefixIcon}
                  {prefixSettings.show && prefixSettings.render({ key: prefixSettings.id })}
                </>
              )
            }
            onClick={() => handleOpenChange(true)}
          >
            <InputPrivate
              id={id}
              name={name}
              type='text'
              disabled={disabled}
              placeholder={placeholder}
              ref={mergeRefs(ref, localRef)}
              onChange={undefined}
              value={selectedOptionFormatter(selectedItem)}
              readonly
              data-test-id='field-select__input'
              onKeyDown={handleOnKeyDown()}
              onBlur={handleBlur}
              className={styles.readonlyCursor}
            />

            <div className={styles.postfix}>
              {postfixButtons}
              {postfixSettings.show && postfixSettings.render({ key: postfixSettings.id })}
              <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
            </div>
          </FieldContainerPrivate>
        </FieldDecorator>

        <MobileModalCustom open={open} onClose={() => handleOpenChange(false)} size={searchable ? 'full' : 'auto'}>
          {rest.label && <MobileModalCustom.Header title={rest.label} />}

          {searchable ? listJsx : <MobileModalCustom.Body className={styles.bodyNoPadding} content={listJsx} />}
        </MobileModalCustom>
      </>
    );
  },
);
