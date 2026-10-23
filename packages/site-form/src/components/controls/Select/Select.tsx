import cn from 'classnames';
import { useContext, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  AdaptiveFieldSelect,
  BaseOptionProps,
  MobileFieldSelectSingleProps,
} from '@cloud-ru/uikit-product-mobile-fields';

import { SiteFormContext } from '../../../context';
import { Option } from '../../../types';
import { valSchema } from '../../../validation/valSchema';
import s from './styles.module.scss';

type SelectProps = Pick<MobileFieldSelectSingleProps, 'required' | 'disabled'> & {
  options: Option[];
  name: string;
  label: string;
  classNames?: {
    wrapper?: string;
  };
};

export function Select({ options, name, label, classNames, required = false, disabled, ...rest }: SelectProps) {
  const { layoutType, onControlClick } = useContext(SiteFormContext);
  const { clearErrors } = useFormContext();
  const { field, fieldState } = useController({
    name,
    rules: {
      required: required ? valSchema.default.required.message : undefined,
    },
  });

  const opts = useMemo<BaseOptionProps[]>(
    () =>
      options.map(opt => ({
        value: opt.value,
        option: opt.label,
        disabled: opt.disabled,
      })),
    [options],
  );

  const handleChange: NonNullable<MobileFieldSelectSingleProps['onChange']> = newValue => {
    if (fieldState.error) {
      clearErrors(name);
    }

    field.onChange(newValue);
    onControlClick?.({ content: label, id: `multiselect-${name}` });
  };

  return (
    <div className={cn(s.multiSelect, classNames?.wrapper)} {...rest}>
      <AdaptiveFieldSelect
        id={name}
        name={field.name}
        ref={field.ref}
        layoutType={layoutType}
        selection='single'
        size='l'
        options={opts}
        value={field.value}
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
