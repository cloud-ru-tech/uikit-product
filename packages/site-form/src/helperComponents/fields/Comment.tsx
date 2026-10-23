import { TextArea } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Comment(props: FieldProps) {
  const { className, name = 'comment', label = 'Комментарий', required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <TextArea
      className={className}
      name={name}
      label={label}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
