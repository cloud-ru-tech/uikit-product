import { Select } from '../../components';
import { FieldProps } from './FieldProps';

export const TERRITORIAL_SUB_DIVISION_FIELD_NAME = 'territorialSubDivision';

const OPTIONS = [
  { value: 'centralOffice', label: 'Центральный Аппарат' },
  { value: 'baikalBank', label: 'Байкальский банк' },
  { value: 'volgoVyatkaBank', label: 'Волго-Вятский банк' },
  { value: 'farEasternBank', label: 'Дальневосточный банк' },
  { value: 'moscowBank', label: 'Московский банк' },
  { value: 'volgaBank', label: 'Поволжский банк' },
  { value: 'northWestBank', label: 'Северо-Западный банк' },
  { value: 'siberianBank', label: 'Сибирский банк' },
  { value: 'centralRussianBank', label: 'Среднерусский банк' },
  { value: 'uralBank', label: 'Уральский банк' },
  { value: 'centralBlackEarthBank', label: 'Центрально-Черноземный банк' },
  { value: 'southWestBank', label: 'Юго-Западный банк' },
];

export function TerritorialSubDivision(props: FieldProps) {
  const { className, label = 'Территориальное подразделение', required = false, disabled } = props;

  return (
    <Select
      classNames={{ wrapper: className }}
      options={OPTIONS}
      name={TERRITORIAL_SUB_DIVISION_FIELD_NAME}
      label={label}
      required={required}
      disabled={disabled}
    />
  );
}
