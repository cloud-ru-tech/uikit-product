import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ClipboardEventHandler, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useIMask } from 'react-imask';

import { AdaptiveDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { AdaptiveFieldText, FieldTextProps } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { useValueControl } from '@snack-uikit/utils';

import { PLACEHOLDER_CHAR } from './constants';
import { useCountries } from './hooks';
import styles from './styles.module.scss';
import { CountrySettings, FieldPhoneOptionsProps, MaskOptions } from './types';
import { detectCountryByPhone, handleAutoInsert } from './utils';

export type FieldPhoneProps = WithLayoutType<
  Omit<
    FieldTextProps,
    | 'prefix'
    | 'prefixIcon'
    | 'postfix'
    | 'placeholder'
    | 'autocomplete'
    | 'decoratorRef'
    | 'allowMoreThanMaxLength'
    | 'onKeyDown'
    | 'button'
    | 'maxLength'
    | 'inputMode'
  > & {
    /** Включить скролл для основной части списка стран */
    scrollList?: boolean;
    onChange?(value: string): void;
    searchPlaceholder?: string;
    onChangeCountry?(country: FieldPhoneOptionsProps): void;
  } & {
    /** options — объект конфигурации для изменения стандартного списка стран */
    options?: CountrySettings;
  }
>;

export const FieldPhone = forwardRef<HTMLInputElement, FieldPhoneProps>(
  (
    {
      value: valueProp,
      onChangeCountry,
      onChange: onChangeProp,
      showClearButton = true,
      searchPlaceholder,
      onPaste,
      className,
      scrollList,
      options: optionsProp,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const localRef = useRef<HTMLInputElement>(null);

    const options = useCountries(optionsProp);
    const isOnlyOneCountryAvailable = options.length === 1;

    const rawInsertRef = useRef('');
    const insertSwitchRef = useRef(false);

    const [country, setCountry] = useValueControl<FieldPhoneOptionsProps>({
      defaultValue: options[0],
      onChange: onChangeCountry,
    });

    const [dropdownSearch, setDropDownSearch] = useState('');

    const items = useMemo(() => {
      if (dropdownSearch.length) {
        return options.filter(opt =>
          [opt.content.option, opt.content.caption].some(val =>
            String(val).toLowerCase().includes(dropdownSearch.toLowerCase()),
          ),
        );
      }

      return options;
    }, [options, dropdownSearch]);

    const maskOptions = useMemo<MaskOptions>(
      () => ({
        mask: country?.mask,
        lazy: false,
        placeholderChar: PLACEHOLDER_CHAR,
        definitions: {
          X: /[0-9]/,
        },
        prepare: (str: string) => {
          if (str.replace(/\D/g, '').length > 1) {
            rawInsertRef.current = str;
          }
          return str;
        },
      }),
      [country?.mask],
    );

    const clearRaw = () => {
      rawInsertRef.current = '';
    };
    const markSwitchRef = () => {
      insertSwitchRef.current = true;
    };

    const {
      ref: iMaskRef,
      value: iMaskValue,
      setValue,
      unmaskedValue,
    } = useIMask<HTMLInputElement>(maskOptions, {
      onAccept: (_: string, maskRef) => {
        const unmasked = maskRef.unmaskedValue;

        const requiredSymbols = country?.mask.replace(/[\D]/g, '');

        const value = unmasked.length ? `${country?.content.caption}${requiredSymbols}${unmasked}` : '';

        if (value !== valueProp) {
          onChangeProp?.(value);
        }

        if (insertSwitchRef.current) {
          insertSwitchRef.current = false;
          return;
        }
        handleAutoInsert({
          raw: rawInsertRef.current,
          onValueChange: value => {
            setTimeout(() => setValue(value), 0);
          },
          onCountryChange: country => {
            markSwitchRef();
            clearRaw();
            setCountry(country);
          },
          country,
          options,
        });
      },
    });

    useEffect(() => {
      const requiredSymbols = country?.mask.replace(/[\D]/g, '');
      const normalizedValue = valueProp?.replace((country?.content.caption ?? '') + requiredSymbols, '');

      if (normalizedValue !== undefined && normalizedValue !== unmaskedValue) {
        setValue(normalizedValue);
      }
      // need to trigger update only on valueProp change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProp]);

    const updateMaskView = (value?: string) => {
      setValue(value?.replaceAll(/\w/g, ' ') ?? '');
    };

    const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
      e.preventDefault();

      const text = e.clipboardData?.getData('text') || '';

      const newCountry = detectCountryByPhone(text, options);
      const isCountryChanged = newCountry && newCountry.id !== country?.id;

      const currentCountry = isCountryChanged ? newCountry : country;

      const prefixNumber = (currentCountry?.content.caption ?? '').replace('+', '');
      const prefixNumberWithOptionalPlus = RegExp(`^(\\+?${prefixNumber})`);
      const valueWithoutPrefix = text.replace(prefixNumberWithOptionalPlus, '');

      // костыль, чтобы всегда срабатывала маска
      const newValue = `+${valueWithoutPrefix}`;
      if (isCountryChanged) {
        setCountry(newCountry);
        updateMaskView(newCountry.mask);

        setTimeout(() => setValue(newValue), 0);
      } else {
        setValue(newValue);
      }

      onPaste?.(e);
    };

    const handleChangeSelection = (selectedOption: string) => {
      if (selectedOption && selectedOption !== country?.content.option) {
        const selectedCountry = options.find(opt => opt.id === selectedOption);

        updateMaskView(selectedCountry?.mask);
        setCountry(selectedCountry);
      }

      setTimeout(() => localRef.current?.focus(), 500);
    };

    const handleChange = (value: string) => {
      // needed only to clear value by clicking on clear button
      if (unmaskedValue && !value) {
        updateMaskView(country?.mask);
        localRef.current?.focus();
      }
    };

    const showClear = showClearButton && Boolean(unmaskedValue);

    return (
      <AdaptiveFieldText
        {...rest}
        inputMode='tel'
        data-test-id='field-phone'
        type='tel'
        ref={mergeRefs(ref, localRef, iMaskRef)}
        className={cn(className, styles.fieldPhone)}
        data-empty={!unmaskedValue || undefined}
        value={iMaskValue}
        onChange={handleChange}
        onPaste={handlePaste}
        showClearButton={showClear}
        prefix={country?.content.caption}
        button={
          isOnlyOneCountryAvailable
            ? undefined
            : {
                variant: 'before',
                hasArrow: true,
                arrowOpen: open,
                wrapper: button => (
                  <div role='presentation' onClick={e => e.stopPropagation()}>
                    <AdaptiveDroplist
                      onOpenChange={setOpen}
                      closeDroplistOnItemClick
                      layoutType={rest.layoutType}
                      items={items}
                      selection={{ mode: 'single', onChange: handleChangeSelection, value: country?.id }}
                      scroll={scrollList}
                      search={{
                        value: dropdownSearch,
                        onChange: setDropDownSearch,
                        placeholder: searchPlaceholder,
                      }}
                    >
                      {button}
                    </AdaptiveDroplist>
                  </div>
                ),
                content: country?.beforeContent,
              }
        }
      />
    );
  },
);
