import { CONTROL, FormConfig, StepperControl } from '../../../../components';

const apiUiProps: Partial<StepperControl['uiProps']> = { disabled: true, postfix: 'Шт', showHint: false };

export const EVOLUTION_STORAGE_S3_FREE_TIER_FORM_CONFIG: FormConfig = {
  ui: ['storageType', ['storageSize', 'outgoingTraffic'], ['apiPut', 'apiPost'], ['apiGet', 'apiHead'], ['apiList']],
  controls: {
    storageType: {
      type: CONTROL.Carousel,
      defaultValue: 'standart',
      items: [
        {
          label: 'Стандартное (Standard)',
          description:
            'Для медиаконтента, писем и документов. Высокая стоимость хранения, низкая стоимость операций с данными',
          value: 'standart',
        },
      ],
      accessorKey: 'storageType',
      decoratorProps: {
        label: 'Тип хранилища',
      },
    },
    storageSize: {
      type: CONTROL.Stepper,
      defaultValue: 15,
      accessorKey: 'storageSize',
      decoratorProps: {
        label: 'Размер хранилища',
      },
      uiProps: {
        disabled: true,
        postfix: 'ГБ',
        showHint: false,
      },
    },
    outgoingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 10_000,
      accessorKey: 'outgoingTraffic',
      decoratorProps: {
        label: 'Исходящий трафик',
      },
      uiProps: {
        disabled: true,
        postfix: 'ТБ',
        showHint: false,
        multiplier: 1000,
      },
    },
    apiPut: {
      type: CONTROL.Stepper,
      defaultValue: 100_000,
      accessorKey: 'apiPut',
      decoratorProps: {
        label: 'PUT-операции',
      },
      uiProps: apiUiProps,
    },
    apiPost: {
      type: CONTROL.Stepper,
      defaultValue: 100_000,
      accessorKey: 'apiPost',
      decoratorProps: {
        label: 'POST-операции',
      },
      uiProps: apiUiProps,
    },
    apiGet: {
      type: CONTROL.Stepper,
      defaultValue: 100_000,
      accessorKey: 'apiGet',
      decoratorProps: {
        label: 'GET-операции',
      },
      uiProps: apiUiProps,
    },
    apiHead: {
      type: CONTROL.Stepper,
      defaultValue: 100_000,
      accessorKey: 'apiHead',
      decoratorProps: {
        label: 'HEAD-операции',
      },
      uiProps: apiUiProps,
    },
    apiList: {
      type: CONTROL.Stepper,
      defaultValue: 100_000,
      accessorKey: 'apiList',
      decoratorProps: {
        label: 'LIST-операции',
      },
      uiProps: apiUiProps,
    },
  },
};
