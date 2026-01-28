import { CONTROL, FormConfig } from '../../../../components';
import { WORKING_HOURS_ITEMS, WorkingHoursSpecification } from '../../../../constants';
import { getMaxWorkingHoursAmount, getNumeralWord } from '../../../utils';

const StorageSizeItem = {
  Size1TB: '1',
  Size3TB: '3',
  Size5TB: '5',
  Size10TB: '10',
  Size20TB: '20',
  Size50TB: '50',
};

const storageSizeItems = [
  {
    label: '1 ТБ',
    value: StorageSizeItem.Size1TB,
  },
  {
    label: '3 ТБ',
    value: StorageSizeItem.Size3TB,
  },
  {
    label: '5 ТБ',
    value: StorageSizeItem.Size5TB,
  },
  {
    label: '10 ТБ',
    value: StorageSizeItem.Size10TB,
  },
  {
    label: '20 ТБ',
    value: StorageSizeItem.Size20TB,
  },
  {
    label: '50 ТБ',
    value: StorageSizeItem.Size50TB,
  },
];

const LicenseRentItem = {
  Test: 'test',
  Full: 'full',
};

const licenseRentItems = [
  {
    label: 'Тестовая',
    value: LicenseRentItem.Test,
    description: 'Для тестирования гипотез с ограниченной поддержкой Arenadata',
  },
  {
    label: 'Полная',
    value: LicenseRentItem.Full,
    description: 'Для хранилищ данных корпоративного уровня с полной поддержкой Arenadata',
  },
];

export const EVOLUTION_ARENADATA_DB_FORM_CONFIG: FormConfig = {
  ui: [['storageSize'], ['workHours', 'workHoursSpecification'], 'licenseRent', 'alert', 'snat', 'publicIp'],
  controls: {
    storageSize: {
      type: CONTROL.Segmented,
      accessorKey: 'storageSize',
      items: storageSizeItems,
      decoratorProps: {
        label: 'Размер хранилища',
      },
    },
    workHours: {
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
          month: 720,
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
    workHoursSpecification: {
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
    licenseRent: {
      type: CONTROL.ToggleCards,
      accessorKey: 'licenseRent',
      items: licenseRentItems,
      decoratorProps: {
        label: 'Тип арендуемой лицензии',
        labelTooltip:
          'Сервис тарифицируется по модели Allocated. Стоимость начинает рассчитываться с момента передачи в аренду и до отказа от аренды.',
      },
    },
    alert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'При подключении сервиса SNAT-шлюз добавляется по умолчанию',
      },
      accessorKey: 'alert',
    },
    snat: {
      type: CONTROL.Toggle,
      accessorKey: 'snat',
      defaultValue: true,
      decoratorProps: {
        label: 'SNAT-шлюз',
      },
      uiProps: {
        disabled: true,
      },
    },
    publicIp: {
      type: CONTROL.Toggle,
      accessorKey: 'publicIp',
      defaultValue: false,
      decoratorProps: {
        label: 'Публичный IP',
      },
    },
  },
};
