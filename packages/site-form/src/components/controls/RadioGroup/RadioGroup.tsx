import cn from 'classnames';
import { JSX, useContext, useImperativeHandle, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldDecorator } from '@snack-uikit/fields';
import { Radio, RadioProps, ToggleGroup, useToggleGroup } from '@snack-uikit/toggles';

import { SiteFormContext } from '../../../context';
import { valSchema } from '../../../validation/valSchema';
import s from './styles.module.scss';

const EMPTY_ARRAY: string[] = [];

type RadioBase = Pick<RadioProps, 'disabled'> & {
  id: string;
  label: string | JSX.Element;
  labelOnlyTextWithoutHtml?: string;
};

type RadioGroupProps = {
  radioButtons: Array<RadioBase>;
  disabled?: boolean;
  className?: string;
  label?: string;
  name: string;
  required?: boolean;
  requiredText?: string;
};

type RadioGroupItemProps = Pick<RadioBase, 'id' | 'label' | 'disabled'> & Pick<RadioProps, 'onBlur' | 'inputRef'>;

function RadioGroupItem({ id, label, disabled, onBlur, inputRef }: RadioGroupItemProps) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });

  return (
    <label htmlFor={id} className={s.label}>
      <Radio
        id={id}
        disabled={disabled}
        checked={isChecked}
        onClick={handleClick}
        onBlur={onBlur}
        inputRef={inputRef}
        data-test-id='radio'
        data-click='funnel-form-input'
      />
      {typeof label === 'string' ? <span className={s.text} dangerouslySetInnerHTML={{ __html: label }} /> : label}
    </label>
  );
}

export function RadioGroup({
  required,
  requiredText,
  radioButtons,
  name,
  disabled,
  label,
  className,
  ...rest
}: RadioGroupProps) {
  const { onControlClick } = useContext(SiteFormContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { clearErrors } = useFormContext();
  const { field, fieldState } = useController<Record<string, string[]>>({
    name,
    rules: {
      required: required ? requiredText || valSchema.default?.required : false,
    },
  });
  useImperativeHandle(field.ref, () => inputRef.current, []);

  const value = field.value ?? EMPTY_ARRAY;

  const handleChange = (newValue: string[] = EMPTY_ARRAY) => {
    const changedOption = radioButtons.find(option => value.includes(option.id) !== newValue.includes(option.id));

    if (fieldState.error) {
      clearErrors(name);
    }

    field.onChange(newValue);

    if (changedOption) {
      const title =
        changedOption.labelOnlyTextWithoutHtml ??
        (typeof changedOption.label === 'string' ? changedOption.label : changedOption.id);
      onControlClick?.({ content: `radio-${title}`, id: `radio-${title}` });
    }
  };

  return (
    <FieldDecorator
      error={fieldState.error?.message}
      disabled={disabled}
      size='m'
      className={cn(s.decorator, className)}
      label={label}
      required={required}
      {...rest}
    >
      <ToggleGroup selectionMode='multiple' value={value} onChange={handleChange}>
        <div className={s.toggleGroup}>
          {radioButtons.map((option, index) => (
            <RadioGroupItem
              key={option.id}
              id={option.id}
              label={option.label}
              disabled={disabled || option.disabled}
              onBlur={field.onBlur}
              inputRef={index === 0 ? inputRef : undefined}
            />
          ))}
        </div>
      </ToggleGroup>
    </FieldDecorator>
  );
}
