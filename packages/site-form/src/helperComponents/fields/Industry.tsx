import { useWatch } from 'react-hook-form';

import { Select } from '../../components';
import { FieldProps } from './FieldProps';
import { TERRITORIAL_SUB_DIVISION_FIELD_NAME } from './TerritorialSubDivision';

const OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: 'trade', label: 'Торговля' },
  { value: 'transportAndLogistic', label: 'Транспорт и логистика' },
  { value: 'commercialProperty', label: 'Коммерческая недвижимость' },
  { value: 'buildingContractors', label: 'Строительные подрядчики' },
  { value: 'communications', label: 'Связь и телекоммуникации' },
  { value: 'automotiveIndustry', label: 'Автомобильная промышленность' },
  { value: 'healthcare', label: 'Здравоохранение и фармацевтика' },
  { value: 'apc', label: 'АПК' },
  { value: 'mechanicalEngineering', label: 'Машиностроение' },
  { value: 'chemicalIndustry', label: 'Химическая промышленность' },
  { value: 'energy', label: 'Энергетика' },
  { value: 'metallurgy', label: 'Металлургия' },
  { value: 'oilAndGasIndustry', label: 'Нефтегазовая промышленность' },
  { value: 'fintechAndInsurance', label: 'Финтех и Страхование' },
  { value: 'isv', label: 'ISV (разработка ПО)' },
];

const DIVISIONS_WITH_REQUIRED_INDUSTRY = ['centralOffice', 'moscowBank', 'centralRussianBank'];

export function Industry(props: FieldProps) {
  const { className, label = 'Отрасль', disabled } = props;

  const territorialSubDivision = useWatch({ name: TERRITORIAL_SUB_DIVISION_FIELD_NAME });

  return (
    <Select
      classNames={{ wrapper: className }}
      options={OPTIONS}
      name='industry'
      label={label}
      required={DIVISIONS_WITH_REQUIRED_INDUSTRY.includes(territorialSubDivision)}
      disabled={disabled}
    />
  );
}
