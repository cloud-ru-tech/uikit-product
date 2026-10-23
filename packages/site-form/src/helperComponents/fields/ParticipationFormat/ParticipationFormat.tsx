import { useId, useImperativeHandle, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldDecorator } from '@snack-uikit/fields';
import { Radio, RadioProps, ToggleGroup, useToggleGroup } from '@snack-uikit/toggles';

import { FieldProps } from '../FieldProps';
import s from './styles.module.scss';

const FIELD_NAME = 'participationFormat';

const REQUIRED_ERR = 'Выберите формат участия';

const OPTIONS = [
  { value: 'offline', label: 'Офлайн' },
  { value: 'online', label: 'Онлайн' },
] as const;

type ParticipationOptionProps = (typeof OPTIONS)[number] &
  Pick<RadioProps, 'name' | 'disabled' | 'onBlur' | 'inputRef'>;

function ParticipationOption({ value, label, ...radioProps }: ParticipationOptionProps) {
  const id = useId();
  const { isChecked, handleClick } = useToggleGroup({ value });

  return (
    <label className={s.label} htmlFor={id}>
      <Radio {...radioProps} id={id} value={value} checked={isChecked} onClick={handleClick} />
      <span className={s.text}>{label}</span>
    </label>
  );
}

export function ParticipationFormat(props: FieldProps) {
  const { className, disabled, onFieldFill } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const { clearErrors } = useFormContext();
  const { field, fieldState } = useController<Record<string, string>>({
    name: FIELD_NAME,
    rules: { required: REQUIRED_ERR },
  });

  useImperativeHandle(field.ref, () => inputRef.current, []);

  const handleChange = (value: string | undefined) => {
    if (value === undefined || value === field.value || disabled) {
      return;
    }

    if (fieldState.error) {
      clearErrors(FIELD_NAME);
    }

    field.onChange(value);
    onFieldFill(`Participation format: ${value}`);
  };

  return (
    <div className={className}>
      <FieldDecorator
        error={fieldState.error?.message}
        label='В каком формате вы хотите принять участие:'
        size='m'
        disabled={disabled}
        required
      >
        <ToggleGroup selectionMode='single' value={field.value ?? ''} onChange={handleChange}>
          <div className={s.fieldWrapper}>
            {OPTIONS.map((option, index) => (
              <ParticipationOption
                key={option.value}
                {...option}
                name={field.name}
                disabled={disabled}
                onBlur={field.onBlur}
                inputRef={index === 0 ? inputRef : undefined}
              />
            ))}
          </div>
        </ToggleGroup>
      </FieldDecorator>
    </div>
  );
}
