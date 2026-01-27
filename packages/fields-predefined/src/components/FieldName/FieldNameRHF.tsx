import mergeRefs from 'merge-refs';
import { FocusEventHandler, forwardRef, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { string } from 'yup';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveFieldText } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { runAfterRerender } from '@snack-uikit/input-private';

import { useCustomFieldValidation } from '../../hooks';
import { DEFAULT_MAX_NAME_LENGTH } from './constants';
import { FieldNameRHFProps } from './types';

/**
 * Поле имя c оберткой для React Hook Form
 */
export const FieldNameRHF = forwardRef<HTMLInputElement, WithLayoutType<FieldNameRHFProps>>((props, ref) => {
  const { t } = useLocale('FieldsPredefined');

  const {
    controllerProps,
    maxLength = DEFAULT_MAX_NAME_LENGTH,
    required = true,
    customSchema,
    showLabel = true,
    size = 'm',
    allowMoreThanMaxLength = true,
    error: propError,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const { trigger } = useFormContext();

  const validationSchema = useMemo(() => {
    let baseSchema = string()
      .test('maxLength', t('FieldName.maxSymbols', { max: maxLength }), value => {
        if (!value) return true;
        return value.length <= maxLength;
      })
      .matches(/^[a-zA-Z0-9.\-_]*$/, {
        message: t('FieldName.wrongSymbols'),
        name: 'allowedSymbols',
        excludeEmptyString: true,
      });

    if (customSchema) {
      baseSchema = baseSchema.concat(customSchema);
    }

    return required ? baseSchema.required(t('FieldName.required')) : baseSchema;
  }, [customSchema, maxLength, required, t]);

  const { validateRHF } = useCustomFieldValidation({ schema: validationSchema });

  const handleFocus: FocusEventHandler<HTMLInputElement> = value => {
    setIsFocused(true);
    inputProps.onFocus?.(value);
  };

  return (
    <Controller
      {...controllerProps}
      rules={{ validate: validateRHF }}
      render={({ field: { value, ref: localRef, onBlur, onChange }, fieldState: { error } }) => {
        const isRequiredError = Boolean(error && error.message?.match(t('FieldName.required')));
        const shouldShowCounter =
          error && (error.message?.match(t('FieldName.maxSymbols', { max: maxLength })) || isRequiredError);

        // - Есть ошибка обязательного поля и поле не в фокусе
        // - Или другая ошибка
        // - Или принудительно показываем ошибку
        const showError = error && ((isRequiredError && !isFocused) || !isRequiredError);

        const errorMes = propError ?? error?.message;

        const handleChange = (newValue: string) => {
          inputProps.onChange?.(newValue);
          onChange(newValue);
        };

        const handleBlur: FocusEventHandler<HTMLInputElement> = value => {
          runAfterRerender(() => setIsFocused(false));

          inputProps.onBlur?.(value);
          onBlur();
        };

        return (
          <AdaptiveFieldText
            {...inputProps}
            inputMode='text'
            onClearButtonClick={() => trigger(controllerProps.name)}
            allowMoreThanMaxLength={allowMoreThanMaxLength}
            ref={mergeRefs(ref, localRef)}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            validationState={showError ? 'error' : inputProps.validationState}
            hint={showError ? errorMes : undefined}
            maxLength={shouldShowCounter && showError ? maxLength : undefined}
            size={size}
            label={showLabel ? t('FieldName.label') : undefined}
            caption={!required ? t('FieldDescription.optional') : undefined}
          />
        );
      }}
    />
  );
});
