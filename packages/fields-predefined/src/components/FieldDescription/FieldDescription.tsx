import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, useMemo, useRef, useState } from 'react';
import { string, ValidationError } from 'yup';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveFieldTextArea } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { useCustomFieldValidation } from '../../hooks';
import { FieldWithAddButton } from './components';
import { DEFAULT_MAX_LENGTH } from './constants';
import { FieldDescriptionProps } from './types';

/**
 * Поле описание c локальным стейтом и валидацией
 */
export const FieldDescription = forwardRef<HTMLTextAreaElement, WithLayoutType<FieldDescriptionProps>>(
  (
    {
      size = 'm',
      required = false,
      maxLength = DEFAULT_MAX_LENGTH,
      customSchema,
      resizable = true,
      addButton,
      onValidationError,
      ...props
    },
    ref,
  ) => {
    const { t } = useLocale('FieldsPredefined');

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const validationSchema = useMemo(() => {
      let baseSchema = string()
        .trim()
        .max(maxLength, t('FieldDescription.maxSymbols', { max: maxLength }));

      if (customSchema) {
        baseSchema = baseSchema.concat(customSchema);
      }

      return required ? baseSchema.required(t('FieldDescription.required')) : baseSchema;
    }, [customSchema, maxLength, required, t]);

    const { validate } = useCustomFieldValidation({ schema: validationSchema });

    const [value, setValue] = useState('');
    const [error, setError] = useState<ValidationError | null>(null);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      props.onChange?.(newValue);
      const result = validate(newValue);
      setError(result.error);
      onValidationError?.(result.error);
    };

    const handleBlur = (newValue: FocusEvent<HTMLTextAreaElement, Element>) => {
      props.onBlur?.(newValue);
      const result = validate(value);
      setError(result.error);
      onValidationError?.(result.error);
    };

    const errorMes = props.error ?? error?.message;

    const standaloneComponent = (
      <AdaptiveFieldTextArea
        {...props}
        resizable={resizable}
        label={t('FieldDescription.label')}
        inputMode='text'
        ref={mergeRefs(ref, textareaRef)}
        size={size}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        validationState={errorMes ? 'error' : props.validationState}
        hint={errorMes}
        caption={!required ? t('FieldDescription.optional') : undefined}
      />
    );

    if (addButton && !required) {
      return (
        <FieldWithAddButton autoFocusRef={textareaRef} size={size}>
          {standaloneComponent}
        </FieldWithAddButton>
      );
    }

    return standaloneComponent;
  },
);
