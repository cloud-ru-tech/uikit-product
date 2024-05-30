import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { ClipboardEventHandler, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useIMask } from 'react-imask';

import { FieldText, FieldTextProps } from '@snack-uikit/fields';
import { useValueControl } from '@snack-uikit/utils';

import { PLACEHOLDER_CHAR } from './constants';
import styles from './styles.module.scss';
import { FieldPhoneOptionsProps, MaskOptions } from './types';

export type FieldPhoneProps = Omit<
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
> & {
  options: FieldPhoneOptionsProps[];
  onChange?(value: string): void;
  searchPlaceholder?: string;
  onChangeCountry?(country: FieldPhoneOptionsProps): void;
};

export const FieldPhone = forwardRef<HTMLInputElement, FieldPhoneProps>(
  (
    {
      options,
      value: valueProp,
      onChangeCountry,
      onChange: onChangeProp,
      showClearButton = true,
      searchPlaceholder,
      onPaste,
      className,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

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

      localRef.current?.focus();
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
      <FieldText
        data-test-id='field-phone'
        {...rest}
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
                content: country?.beforeContent,
                items,
                selection: { onChange: handleChangeSelection, value: country?.id },
                search: {
                  value: dropdownSearch,
                  onChange: setDropDownSearch,
                  placeholder: searchPlaceholder,
                },
              }
        }
      />
    );
  },
);
