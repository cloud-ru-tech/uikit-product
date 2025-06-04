import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  ForwardRefExoticComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  PropsWithoutRef,
  RefAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { FieldDecorator } from '@snack-uikit/fields';
import { InputPrivate } from '@snack-uikit/input-private';
import { ItemId, kindFlattenItems, List, ListProps, SelectionSingleValueType } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';
import { extractSupportProps, isBrowser, useLayoutEffect, useValueControl } from '@snack-uikit/utils';

import { FieldContainerPrivate, ItemContent, ItemContentProps } from '../../helperComponents';
import { usePostfix, usePrefix } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { useButtons, useHandleDeleteItem, useHandleOnKeyDown, useSearchInput } from './hooks';
import { useSearch } from './legacy';
import styles from './styles.module.scss';
import { ItemWithId, MobileFieldSelectMultipleProps, SelectedOptionFormatter } from './types';
import { extractFieldDecoratorProps, extractListProps, getArrowIcon, updateMultipleItems } from './utils';

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  item?.content.option || '';

export const MobileFieldSelectMultiple: ForwardRefExoticComponent<
  PropsWithoutRef<MobileFieldSelectMultipleProps> & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, MobileFieldSelectMultipleProps>(
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
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      validationState = 'default',
      search,
      enableFuzzySearch = true,
      autocomplete = false,
      prefixIcon,
      prefix,
      postfix,
      removeByBackspace = false,
      addOptionByEnter = false,
      open: openProp,
      onOpenChange,
      selectedOptionFormatter = defaultSelectedOptionFormatter,
      ...rest
    },
    ref,
  ) => {
    const { t } = useLocale('MobileFields');

    const localRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });

    const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const [{ selectedItems, items = [] }, setItems] = useState<{
      selectedItems?: ItemWithId[];
      items: ListProps['items'];
    }>(() => updateMultipleItems({ options, value, currentItems: [], selectedItems: undefined }));

    const { flattenItems } = useMemo(() => kindFlattenItems({ items }), [items]);

    const searchable = (searchableProp && Object.values(flattenItems).length > 5) || autocomplete;

    const { inputValue, setInputValue, prevInputValue, updateInputValue } = useSearchInput({
      ...search,
      defaultValue: '',
      selectedOptionFormatter,
    });

    const prefixSettings = usePrefix({ prefix, disabled });
    const postfixSettings = usePostfix({ postfix, disabled });

    useLayoutEffect(() => {
      setItems(({ selectedItems }) => updateMultipleItems({ options, value, selectedItems }));
    }, [options, value]);

    const onClear = () => {
      setValue(selectedItems?.filter(item => item.disabled).map(item => item.id) as ItemId[]);
      localRef.current?.focus();

      if (rest.required) {
        setOpen(true);
      }
    };

    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

    const { postfixButtons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
      readonly,
      size,
      showClearButton:
        showClearButton && !disabled && !readonly && Boolean(selectedItems?.find(item => !item.disabled)),
      showCopyButton: false,
      inputRef: localRef,
      onClear,
    });

    const commonHandleOnKeyDown = useHandleOnKeyDown({
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
      setOpen,
    });

    const handleItemDelete = useHandleDeleteItem(setValue);
    const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (removeByBackspace && e.code === 'Backspace' && inputValue === '') {
        if (selectedItems?.length && !selectedItems.slice(-1)[0].disabled) {
          handleItemDelete(selectedItems.pop() as ListProps['items'][0])();
        }
      }

      if (e.code === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
      }

      if (addOptionByEnter && e.code === 'Enter' && inputValue !== '') {
        if (!(value ?? []).includes(inputValue)) {
          setValue((value: SelectionSingleValueType[]) => (value ?? []).concat(inputValue));
          updateInputValue();
        }
      }

      if (!open && prevInputValue.current !== inputValue) {
        setOpen(true);
      }

      commonHandleOnKeyDown(onKeyDown)(e);
    };

    const handleOpenChange = (open: boolean) => {
      if (!readonly && !disabled && isBrowser() && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);

        if (!open) {
          updateInputValue();
        }
      }
    };

    const handleApplyChange = () => {
      onChangeProp?.(selectedItems?.map(item => item.id));
      handleOpenChange(false);
      setInputValue('');
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && !buttonsRefs.filter(Boolean).includes(e.relatedTarget)) {
        updateInputValue();

        rest?.onBlur?.(e);
      }
    };

    const searcher = useSearch(items, enableFuzzySearch);
    const result = autocomplete || !searchable || prevInputValue.current === inputValue ? items : searcher(inputValue);

    const fieldValidationState = getValidationState({ validationState, error: rest.error });

    const listJsx = (
      <div className={styles.listWrapper}>
        <List
          {...extractListProps(rest)}
          items={result}
          size='l'
          scroll
          virtualized={virtualized}
          search={
            searchable
              ? {
                  value: inputValue,
                  onChange: setInputValue,
                }
              : undefined
          }
          contentRender={({ content, ...rest }) => {
            if (typeof content !== 'function') {
              return <ItemContent {...(content as ItemContentProps)} {...rest} />;
            }

            return content;
          }}
          selection={{
            mode: 'multiple',
            value: value,
            onChange: value => {
              setValue(value);
            },
          }}
        />
      </div>
    );

    return (
      <>
        <FieldDecorator
          {...extractSupportProps(rest)}
          {...extractFieldDecoratorProps(rest)}
          labelFor={id}
          size={size}
          validationState={fieldValidationState}
        >
          <FieldContainerPrivate
            className={cn(styles.container, styles.tagContainer)}
            validationState={fieldValidationState}
            disabled={disabled}
            readonly={readonly}
            focused={open}
            variant='single-line-container'
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
            onClick={() => {
              handleOpenChange(true);
            }}
          >
            <>
              <div className={styles.contentWrapper} ref={contentRef}>
                {selectedItems &&
                  selectedItems.map(option => (
                    <Tag
                      size={size === 'l' ? 's' : 'xs'}
                      tabIndex={-1}
                      label={selectedOptionFormatter(option)}
                      key={option.id}
                      appearance={option.appearance ?? 'neutral'}
                    />
                  ))}

                <div className={styles.inputWrapper}>
                  <InputPrivate
                    id={id}
                    name={name}
                    type='text'
                    disabled={disabled}
                    placeholder={!selectedItems || !selectedItems.length ? placeholder : undefined}
                    ref={mergeRefs(ref, localRef)}
                    onChange={undefined}
                    value={''}
                    readonly
                    data-test-id='field-select__input'
                    onKeyDown={handleOnKeyDown()}
                    onBlur={handleBlur}
                    className={styles.readonlyCursor}
                  />
                </div>
              </div>

              <div className={styles.postfix}>
                {postfixButtons}
                {postfixSettings.show && postfixSettings.render({ key: postfixSettings.id })}
                <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
              </div>
            </>
          </FieldContainerPrivate>
        </FieldDecorator>

        <MobileModalCustom open={open} onClose={() => handleOpenChange(false)} size={searchable ? 'full' : 'auto'}>
          {rest.label && <MobileModalCustom.Header title={rest.label} />}

          {searchable ? listJsx : <MobileModalCustom.Body className={styles.bodyNoPadding} content={listJsx} />}

          <MobileModalCustom.Footer
            actions={
              <div className={styles.footer}>
                <div className={styles.footerTopLine}>
                  <span className={styles.counter}>{`${t('selectedN')}${selectedItems?.length || 0}`}</span>
                  <ButtonFunction
                    size='m'
                    label={t('resetAll')}
                    onClick={onClear}
                    data-test-id='field-select__reset-all-button'
                  />
                </div>
                <ButtonFilled
                  fullWidth
                  label={t('select')}
                  data-test-id='field-select__approve-button'
                  onClick={handleApplyChange}
                  size='l'
                />
              </div>
            }
          />
        </MobileModalCustom>
      </>
    );
  },
);
