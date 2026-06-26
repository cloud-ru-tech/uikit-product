import { CONTROL, FormConfig } from '../../../../components';
import { fillArrayWithNumbers } from '../../../utils';

const flavorsConfig = [
  { label: '2vCPU, 4ГБ RAM', value: '2 4' },
  { label: '4vCPU, 8ГБ RAM', value: '4 8' },
  { label: '4vCPU, 16ГБ RAM', value: '4 16' },
  { label: '4vCPU, 32ГБ RAM', value: '4 32' },
  { label: '4vCPU, 64ГБ RAM', value: '4 64' },
  { label: '8vCPU, 16ГБ RAM', value: '8 16' },
  { label: '8vCPU, 32ГБ RAM', value: '8 32' },
  { label: '8vCPU, 64ГБ RAM', value: '8 64' },
  { label: '8vCPU, 128ГБ RAM', value: '8 128' },
  { label: '16vCPU, 32ГБ RAM', value: '16 32' },
  { label: '16vCPU, 64ГБ RAM', value: '16 64' },
];

const quantityConfig = {
  min: 1,
  max: 10,
};

export const EVOLUTION_MANAGED_AIRFLOW_CONFIG: FormConfig = {
  ui: [
    ['webserverConfig', 'webserverCount'],
    ['schedulerConfig', 'schedulerCount'],
    ['workerConfig', 'workerCount'],
    ['dagProcessorConfig', 'dagProcessorCount'],
    'withTriggerer',
    ['triggererConfig', 'triggererCount'],
  ],
  controls: {
    webserverConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'webServerConfig',
      decoratorProps: {
        label: 'Конфигурация веб-сервера',
        labelTooltip: 'Вычислительные ресурсы - Количество ядер vCPU и RAM',
      },
      defaultValue: flavorsConfig[0].value,
      items: flavorsConfig,
    },
    webserverCount: {
      type: CONTROL.Stepper,
      accessorKey: 'webserverCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество экземпляров',
      },
      uiProps: {
        min: quantityConfig.min,
        max: quantityConfig.max,
        postfix: 'шт',
      },
    },

    schedulerConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'schedulerConfig',
      decoratorProps: {
        label: 'Конфигурация планировщика',
        labelTooltip: 'Вычислительные ресурсы - Количество ядер vCPU и RAM',
      },
      defaultValue: flavorsConfig[0].value,
      items: flavorsConfig,
    },
    schedulerCount: {
      type: CONTROL.Stepper,
      accessorKey: 'schedulerCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество экземпляров',
      },
      uiProps: {
        min: quantityConfig.min,
        max: quantityConfig.max,
        postfix: 'шт',
      },
    },

    workerConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'workerConfig',
      decoratorProps: {
        label: 'Конфигурация воркеров',
        labelTooltip: 'Вычислительные ресурсы - Количество ядер vCPU и RAM',
      },
      defaultValue: flavorsConfig[0].value,
      items: flavorsConfig,
    },
    workerCount: {
      type: CONTROL.Slider,
      accessorKey: 'workerCount',
      defaultValue: '1',
      decoratorProps: {
        label: 'Минимальное и максимальное количество воркеров',
      },
      items: fillArrayWithNumbers(quantityConfig.min, quantityConfig.max),
    },

    dagProcessorConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'dagProcessorConfig',
      decoratorProps: {
        label: 'Конфигурация DAG-процессора',
        labelTooltip: 'Вычислительные ресурсы - Количество ядер vCPU и RAM',
      },
      defaultValue: flavorsConfig[0].value,
      items: flavorsConfig,
    },
    dagProcessorCount: {
      type: CONTROL.Stepper,
      accessorKey: 'dagProcessorCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество экземпляров',
      },
      uiProps: {
        min: quantityConfig.min,
        max: quantityConfig.max,
        postfix: 'шт',
      },
    },

    withTriggerer: {
      type: CONTROL.Toggle,
      accessorKey: 'withTriggerer',
      defaultValue: false,
      decoratorProps: {
        label: 'Включить Triggerer',
        labelTooltip:
          'Компонент для автоматизации запуска задач, что упрощает управление рабочими процессами и повышает их эффективность',
      },
    },

    triggererConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'triggererConfig',
      decoratorProps: {
        label: 'Конфигурация triggerer',
        labelTooltip: 'Вычислительные ресурсы - Количество ядер vCPU и RAM',
      },
      defaultValue: flavorsConfig[0].value,
      items: flavorsConfig,
      watchedControls: {
        withTriggerer: 'withTriggerer',
      },
      relateFn: ({ withTriggerer }) => ({
        uiProps: {
          visible: withTriggerer,
        },
      }),
    },
    triggererCount: {
      type: CONTROL.Stepper,
      accessorKey: 'triggererCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество экземпляров',
      },
      uiProps: {
        min: quantityConfig.min,
        max: quantityConfig.max,
        postfix: 'шт',
      },
      watchedControls: {
        withTriggerer: 'withTriggerer',
      },
      relateFn: ({ withTriggerer }) => ({
        uiProps: {
          visible: withTriggerer,
        },
      }),
    },
  },
};
