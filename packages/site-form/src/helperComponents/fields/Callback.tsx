import { Checkbox } from '../../components';
import { FieldProps } from './FieldProps';

export function Callback(props: FieldProps) {
  const { className, label = 'Требуется обратная связь', disabled } = props;

  return <Checkbox className={className} name='callback' label={label} required={false} disabled={disabled} />;
}
