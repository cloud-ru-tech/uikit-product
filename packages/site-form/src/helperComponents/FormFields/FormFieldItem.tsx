import { Input, MultiSelect } from '../../components';
import { FormField, SiteFormProps } from '../../types';
import { FieldsRegistry } from '../fields';
import { createFieldFillBlurHandler } from '../fields/utils/createFieldFillBlurHandler';
import s from './styles.module.scss';

type FormFieldItemProps = Pick<SiteFormProps, 'layoutType' | 'multipleComment' | 'loading'> & {
  field: FormField;
  onFieldFill(name: string): void;
};

export function FormFieldItem({ field, layoutType, multipleComment, loading, onFieldFill }: FormFieldItemProps) {
  if (multipleComment && field.type === 'comment') {
    return (
      <MultiSelect
        classNames={{ wrapper: s.full }}
        options={multipleComment.options}
        name={multipleComment.name}
        label={multipleComment.label}
        required
        disabled={loading}
      />
    );
  }

  const handleFieldFill = (name: string) => {
    onFieldFill(field.analyticsName || name);
  };

  const className = field.size === 'full' || layoutType === 'mobile' ? s.full : s.half;

  if (field.type === 'text') {
    const handleBlur = createFieldFillBlurHandler(handleFieldFill);

    return (
      <Input
        inputType='text'
        validationType={Input.validations.Default}
        name={field.name}
        label={field.label}
        hint={field.hint}
        showHintIcon={field.showHintIcon}
        maxLength={field.maxLength}
        required={field.required}
        disabled={loading}
        className={className}
        onBlur={handleBlur}
      />
    );
  }

  const Component = FieldsRegistry[field.type];

  return (
    <Component
      className={className}
      name={field.name}
      label={field.label}
      required={field.required}
      disabled={loading}
      onFieldFill={handleFieldFill}
    />
  );
}
