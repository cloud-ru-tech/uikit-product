import { RadioGroup } from '../../components';
import { FieldProps } from './FieldProps';

const RADIO_BUTTONS = [
  { label: 'Коррупционные действия', id: 'corruptPractices' },
  { label: 'Конфликт интересов', id: 'conflictOfInterest' },
  { label: 'Нарушения принципов кодекса этики', id: 'violationsOfThePrinciples' },
  { label: 'Неправомерное использование инсайдерской информации', id: 'misuseOfInsiderInformation' },
  { label: 'Манипулирование рынком', id: 'marketManipulation' },
];

export function Offence(props: FieldProps) {
  const { className, label = 'О каком правонарушении Вы хотите сообщить?', required = false, disabled } = props;

  return (
    <RadioGroup
      className={className}
      name='offence'
      label={label}
      required={required}
      disabled={disabled}
      radioButtons={RADIO_BUTTONS}
    />
  );
}
