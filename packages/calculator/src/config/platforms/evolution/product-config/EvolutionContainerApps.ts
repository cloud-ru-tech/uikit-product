import { CONTROL, FormConfig } from '../../../../components';
import { WORKING_HOURS_ITEMS, WorkingHoursSpecification } from '../../../../constants';
import { generateInstanceConfigItems, getMaxWorkingHoursAmount, getNumeralWord } from '../../../utils';

const configItems = generateInstanceConfigItems(
  [
    [0.1, 256],
    [0.2, 512],
    [0.3, 768],
    [0.5, 1024],
  ],
  ['vCPU', 'МБ RAM'],
);

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
        const maxWorkingHours = getMaxWorkingHoursAmount(period, {
          hour: 1,
          day: 24,
          month: 744,
        });
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
      items: WORKING_HOURS_ITEMS,
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
