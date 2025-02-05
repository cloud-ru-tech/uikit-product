import { CONTROL, FormConfig } from '../../../../components';

export const FUNCTION_GRAPH_FORM_CONFIG: FormConfig = {
  ui: [['requestsCount', 'memoryVolume'], 'memoryVolumeAlert', ['computationTime'], 'requestsCountAlert'],
  controls: {
    requestsCount: {
      type: CONTROL.Stepper,
      accessorKey: 'requestsCount',
      defaultValue: 0,
      decoratorProps: {
        label: 'Количество запросов',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        step: 1,
        multiplier: 1_000_000,
        showHint: false,
        postfix: 'млн',
      },
    },
    memoryVolume: {
      type: CONTROL.Stepper,
      accessorKey: 'memoryVolume',
      defaultValue: 1,
      decoratorProps: {
        label: 'Объем памяти',
        labelTooltip: 'Объем выделяемый для выполнения одной функции',
      },
      uiProps: {
        min: 128,
        max: 4_194_304,
        postfix: 'МБ',
      },
    },
    memoryVolumeAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: <>Первые 2&nbsp;000&nbsp;000 запросов бесплатно</>,
      },
    },
    computationTime: {
      type: CONTROL.Stepper,
      accessorKey: 'computationTime',
      defaultValue: 0,
      decoratorProps: {
        label: 'Продолжительность вычислений',
        labelTooltip: 'Максимальная продолжительность выполнения одной функции',
      },
      uiProps: {
        min: 0,
        max: 900,
        postfix: 'сек',
      },
    },
    requestsCountAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: <>Продолжительность вычислений в&nbsp;размере 400&nbsp;000&nbsp;ГБ/с бесплатно</>,
      },
    },
  },
};
