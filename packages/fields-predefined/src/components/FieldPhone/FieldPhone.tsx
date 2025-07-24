import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ClipboardEventHandler, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useIMask } from 'react-imask';

import { AdaptiveDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { AdaptiveFieldText, FieldTextProps } from '@sbercloud/uikit-product-mobile-fields';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { useValueControl } from '@snack-uikit/utils';

import { PLACEHOLDER_CHAR } from './constants';
import { useCountries } from './hooks';
import styles from './styles.module.scss';
import { CountrySettings, FieldPhoneOptionsProps, MaskOptions } from './types';

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
      }),
      [country?.mask],
    );

    const {
      ref: iMaskRef,
      value: iMaskValue,
      setValue,
      unmaskedValue,
    } = useIMask<HTMLInputElement>(maskOptions, {
      onAccept: (_: string, maskRef) => {
        const unmasked = maskRef.unmaskedValue;

        const value = unmasked.length ? `${country?.content.caption}${unmasked}` : '';

        if (value !== valueProp) {
          onChangeProp?.(value);
        }
      },
    });

    useEffect(() => {
      const normalizedValue = valueProp?.replace(country?.content.caption ?? '', '');

      if (normalizedValue !== undefined && normalizedValue !== unmaskedValue) {
        setValue(normalizedValue);
      }
      // need to trigger update only on valueProp change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProp]);

    const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
      e.preventDefault();

      const text = e.clipboardData?.getData('text') || '';

      const prefixNumber = (country?.content.caption ?? '').replace('+', '');
      const prefixNumberWithOptionalPlus = RegExp(`^(\\+?${prefixNumber})`);
      const valueWithoutPrefix = text.replace(prefixNumberWithOptionalPlus, '');

      // костыль, чтобы всегда срабатывала маска
      setValue(`+${valueWithoutPrefix}`);

      onPaste?.(e);
    };

    const updateMaskView = (value?: string) => {
      setValue(value?.replaceAll(/\w/g, ' ') ?? '');
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
