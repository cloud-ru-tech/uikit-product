import { CONTROL, FormConfig } from '../../../../components';
import { generateInstanceConfigItems } from '../../../utils';

const configItems = generateInstanceConfigItems(
  [
    [0.1, 256],
    [0.2, 512],
    [0.3, 768],
    [0.5, 1024],
  ],
  ['vCPU', 'МБ RAM'],
);

enum WorkingHoursSpecification {
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
}

const workingHoursItems = [
  {
    value: WorkingHoursSpecification.Month,
    label: 'Месяц',
  },
  {
    value: WorkingHoursSpecification.Day,
    label: 'День',
  },
  {
    value: WorkingHoursSpecification.Hour,
    label: 'Час',
  },
];

const getNumeralWord = (value: number, words: string[]) => {
  const newValue = Math.abs(value) % 100;
  const num = value % 10;

  if (newValue > 10 && newValue < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

const getMaxWorkingHoursAmount = (period: WorkingHoursSpecification) => {
  switch (period) {
    case WorkingHoursSpecification.Hour:
      return 1;
    case WorkingHoursSpecification.Day:
      return 24;
    case WorkingHoursSpecification.Month:
      return 744;
    default:
      return 1;
  }
};

export const EVOLUTION_CONTAINER_APPS_CONFIG: FormConfig = {
  ui: ['serviceAlert', ['config'], ['workingHours', 'workingHoursSpecification']],
  controls: {
    serviceAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Первые 120 vCPU и 480 ГБ RAM не тарифицируется каждый месяц в рамках free tier',
      },
      accessorKey: 'tarification',
    },
    config: {
      type: CONTROL.SelectSingle,
      accessorKey: 'config',
      items: configItems,
      defaultValue: '0.1 256',
      decoratorProps: {
        label: 'Конфигурация',
      },
    },
    workingHours: {
      type: CONTROL.Stepper,
      accessorKey: 'workingHours',
      defaultValue: 1,
      uiProps: {
        min: 1,
        max: 1,
        postfix: 'час',
      },
      decoratorProps: {
        label: 'Время работы',
      },
      watchedControls: { period: 'workingHoursSpecification', workingHours: 'workingHours' },
      relateFn: ({ period, workingHours }) => {
        const maxWorkingHours = getMaxWorkingHoursAmount(period);
        const isStepperDisabled = maxWorkingHours === 1;

        return {
          uiProps: {
            min: 1,
            max: maxWorkingHours,
            showHint: !isStepperDisabled,
            disabled: isStepperDisabled,
            postfix: getNumeralWord(workingHours, ['час', 'часа', 'часов']),
          },
        };
      },
    },
    workingHoursSpecification: {
      type: CONTROL.SelectSingle,
      accessorKey: 'workingHoursSpecification',
      defaultValue: WorkingHoursSpecification.Hour,
      items: workingHoursItems,
      uiProps: {
        showClearButton: false,
        searchable: false,
      },
      decoratorProps: {
        label: 'Период',
      },
      onChangePeriod: (period, setValue) => {
        setValue([['workingHoursSpecification', period]]);
      },
      canChangeWholePricePeriod: true,
    },
  },
};
