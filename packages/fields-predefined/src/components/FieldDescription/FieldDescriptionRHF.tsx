import mergeRefs from 'merge-refs';
import { forwardRef, useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { string } from 'yup';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveFieldTextArea } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { useCustomFieldValidation } from '../../hooks';
import { FieldWithAddButton } from './components/FieldWithAddButton';
import { DEFAULT_MAX_LENGTH } from './constants';
import { FieldDescriptionRHFProps } from './types';

/**
 * Поле описание c оберткой для React Hook Form
 */
export const FieldDescriptionRHF = forwardRef<HTMLTextAreaElement, WithLayoutType<FieldDescriptionRHFProps>>(
  (
    {
      controllerProps,
      customSchema,
      size = 'm',
      required = false,
      maxLength = DEFAULT_MAX_LENGTH,
      addButton,
      resizable = true,
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

    const { validateRHF } = useCustomFieldValidation({ schema: validationSchema });

    const controllerComponent = (
      <Controller
        {...controllerProps}
        rules={{ validate: validateRHF }}
        render={({ field: { value, ref: localRef, onBlur, onChange }, fieldState: { error } }) => {
          const errorMes = props.error ?? error?.message;

          return (
            <AdaptiveFieldTextArea
              {...props}
              resizable={resizable}
              size={size}
              label={t('FieldDescription.label')}
              inputMode='text'
              ref={mergeRefs(ref, localRef, textareaRef)}
              maxLength={maxLength}
              value={value}
              onChange={newValue => {
                props.onChange?.(newValue);
                onChange(newValue);
              }}
              onBlur={value => {
                props.onBlur?.(value);
                onBlur();
              }}
              validationState={errorMes ? 'error' : props.validationState}
              hint={errorMes}
              caption={!required ? t('FieldDescription.optional') : undefined}
            />
          );
        }}
      />
    );

    if (addButton && !required) {
      return (
        <FieldWithAddButton autoFocusRef={textareaRef} size={size}>
          {controllerComponent}
        </FieldWithAddButton>
      );
    }

    return controllerComponent;
  },
);
