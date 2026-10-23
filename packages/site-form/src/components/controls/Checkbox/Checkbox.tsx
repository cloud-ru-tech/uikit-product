import { JSX, useContext, useId, useImperativeHandle, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldDecorator } from '@snack-uikit/fields';
import { Checkbox as SnackCheckbox, CheckboxProps as SnackCheckboxProps } from '@snack-uikit/toggles';

import { SiteFormContext } from '../../../context';
import { valSchema } from '../../../validation/valSchema';
import s from './styles.module.scss';

type CheckboxBase = SnackCheckboxProps & {
  name: string;
  label: string | JSX.Element;
  labelOnlyTextWithoutHtml?: string;
};

type CheckboxProps = CheckboxBase & {
  required?: boolean;
  requiredText?: string;
};

export function Checkbox({
  name,
  required,
  requiredText,
  disabled,
  label,
  labelOnlyTextWithoutHtml,
  value,
  checked,
  defaultChecked,
  onChange,
  onBlur,
  onClick,
  inputRef,
  className,
  ...rest
}: CheckboxProps) {
  const checkBoxId = useId();
  const localInputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = inputRef ?? localInputRef;
  const { onControlClick } = useContext(SiteFormContext);
  const { clearErrors } = useFormContext();
  const { field, fieldState } = useController({
    name,
    defaultValue: checked ?? defaultChecked ?? false,
    rules: {
      required: required ? requiredText || valSchema.default?.required : false,
    },
  });

  useImperativeHandle(field.ref, () => checkboxRef.current, [checkboxRef]);

  const handleClick: NonNullable<SnackCheckboxProps['onClick']> = event => {
    onClick?.(event);
    const title = labelOnlyTextWithoutHtml ?? 'label';
    onControlClick?.({ content: `checkbox-${title}`, id: `checkbox-${title}` });
  };

  const handleChange = (checked: boolean) => {
    if (fieldState.error) {
      clearErrors(name);
    }

    field.onChange(checked);
    onChange?.(checked);
  };

  const handleBlur: NonNullable<SnackCheckboxProps['onBlur']> = event => {
    field.onBlur();
    onBlur?.(event);
  };

  return (
    <FieldDecorator error={fieldState.error?.message} disabled={disabled} size='m' className={className} {...rest}>
      <label htmlFor={checkBoxId} className={s.label}>
        <SnackCheckbox
          id={checkBoxId}
          disabled={disabled}
          name={field.name}
          inputRef={checkboxRef}
          checked={Boolean(field.value)}
          value={value}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleBlur}
          data-test-id='checkbox'
          data-click='funnel-form-input'
        />
        {typeof label === 'string' ? (
          <span className={s.text} dangerouslySetInnerHTML={{ __html: label }} />
        ) : (
          <span className={s.text}>{label}</span>
        )}
      </label>
    </FieldDecorator>
  );
}
