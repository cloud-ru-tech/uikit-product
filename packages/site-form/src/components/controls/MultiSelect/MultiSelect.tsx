import cn from 'classnames';
import { useContext, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  AdaptiveFieldSelect,
  BaseOptionProps,
  MobileFieldSelectMultipleProps,
} from '@cloud-ru/uikit-product-mobile-fields';

import { SiteFormContext } from '../../../context';
import { Option } from '../../../types';
import { valSchema } from '../../../validation/valSchema';
import s from './styles.module.scss';

const EMPTY_OPTIONS: Option[] = [];

const getOptionId = (option: Option) => option.key ?? option.value;

type MultiSelectProps = Pick<MobileFieldSelectMultipleProps, 'required' | 'disabled'> & {
  options: Option[];
  name: string;
  label: string;
  classNames?: {
    wrapper?: string;
  };
};

export function MultiSelect({
  options,
  name,
  label,
  classNames,
  required = false,
  disabled,
  ...rest
}: MultiSelectProps) {
  const { layoutType, onControlClick } = useContext(SiteFormContext);
  const { clearErrors } = useFormContext();
  const { field, fieldState } = useController<Record<string, Option[]>>({
    name,
    rules: {
      required: required ? valSchema.default.required.message : undefined,
    },
  });

  const selectedOptions = field.value ?? EMPTY_OPTIONS;
  const value = useMemo(() => selectedOptions.map(getOptionId), [selectedOptions]);

  const opts = useMemo<BaseOptionProps[]>(
    () =>
      options.map(opt => ({
        value: getOptionId(opt),
        option: opt.label,
        disabled: opt.disabled,
      })),
    [options],
  );

  const reportControlClick = (content: string) => {
    onControlClick?.({ content, id: `multiselect-${name}` });
  };

  const handleChange: NonNullable<MobileFieldSelectMultipleProps['onChange']> = selectValue => {
    const nextIds = new Set(selectValue ?? []);
    const nextOptions = options.filter(option => nextIds.has(getOptionId(option)));
    const previousIds = new Set(value);
    const addedOptions = nextOptions.filter(option => !previousIds.has(getOptionId(option)));
    const removedOptions = selectedOptions.filter(option => !nextIds.has(getOptionId(option)));

    if (fieldState.error) {
      clearErrors(name);
    }

    field.onChange(nextOptions);

    if (nextOptions.length === 0 && selectedOptions.length > 1) {
      reportControlClick('clear-all-filters');
      return;
    }

    removedOptions.forEach(option => reportControlClick(option.label));
    addedOptions.forEach(option => reportControlClick(option.label));
  };

  return (
    <div className={cn(s.multiSelect, classNames?.wrapper)} {...rest}>
      <AdaptiveFieldSelect
        id={name}
        name={field.name}
        ref={field.ref}
        layoutType={layoutType}
        selection='multiple'
        size='l'
        options={opts}
        value={value}
        required={required}
        disabled={disabled}
        searchable={false}
        label={label}
        error={fieldState.error?.message}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
    </div>
  );
}
