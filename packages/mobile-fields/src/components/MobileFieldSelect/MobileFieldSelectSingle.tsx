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
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { FieldDecorator } from '@snack-uikit/fields';
import { InputPrivate } from '@snack-uikit/input-private';
import { List, ListProps, SelectionSingleValueType } from '@snack-uikit/list';
import { extractSupportProps, useValueControl } from '@snack-uikit/utils';

import { FieldContainerPrivate, ItemContent, ItemContentProps } from '../../helperComponents';
import { useButtons, useHandleOnKeyDown, useSearchInput } from './hooks';
import { useFuzzySearch } from './legacy';
import styles from './styles.module.scss';
import { ItemWithId, MobileFieldSelectSingleProps, SelectedOptionFormatter } from './types';
import { extractFieldDecoratorProps, extractListProps, getArrowIcon, getValidationState, updateItems } from './utils';

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
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      disabled = false,
      readonly = false,
      searchable = true,
      showCopyButton = true,
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      required = false,
      validationState = 'default',
      search,
      autocomplete = false,
      prefixIcon,
      addOptionByEnter = false,
      open: openProp,
      onOpenChange,
      selectedOptionFormatter = defaultSelectedOptionFormatter,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef(null);

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

    useLayoutEffect(() => {
      setItems(({ selectedItem }) => updateItems({ options, value, selectedItem }));
    }, [options, value]);

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

    const { buttons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
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
        if (newValue !== undefined) {
          localRef.current?.focus();

          setOpen(false);
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
      if (!readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);

        if (!open) {
          setInputValue('');
        }
      }
    };

    const fuzzySearch = useFuzzySearch(items);
    const result =
      autocomplete || !searchable || selectedOptionFormatter(selectedItem) === inputValue
        ? items
        : fuzzySearch(inputValue);

    const fieldValidationState = getValidationState({ validationState, error: rest.error });

    const listJsx = (
      <div className={styles.listWrapper}>
        <List
          {...extractListProps(rest)}
          size='l'
          items={result}
          contentRender={({ content, ...rest }) => {
            if (typeof content !== 'function') {
              return <ItemContent {...(content as ItemContentProps)} {...rest} />;
            }

            return content;
          }}
          scroll
          scrollContainerRef={scrollRef}
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
            prefix={prefixIcon}
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
              {buttons}
              <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
            </div>
          </FieldContainerPrivate>
        </FieldDecorator>

        <MobileModalCustom
          open={open}
          onClose={() => handleOpenChange(false)}
          size={searchable ? 'full' : 'auto'}
          scrollRef={scrollRef}
        >
          {rest.label && <MobileModalCustom.Header title={rest.label} />}

          {searchable ? (
            listJsx
          ) : (
            <MobileModalCustom.Body className={styles.bodyNoPadding} content={listJsx} scrollRef={scrollRef} />
          )}
        </MobileModalCustom>
      </>
    );
  },
);
