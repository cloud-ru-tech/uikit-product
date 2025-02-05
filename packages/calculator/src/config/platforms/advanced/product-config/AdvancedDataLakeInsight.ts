import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, getObs } from '../../../utils';

const resourceUsageModeItem = {
  Dedicated: 'dedicated',
  NonDedicated: 'nonDedicated',
};

const requestQueueTypeItem = {
  Sql: 'sql',
  GeneralPurpose: 'general-purpose',
};

export const DATA_LAKE_INSIGHT_FORM_CONFIG: FormConfig = {
  ui: ['requestQueueType', ['resourceUsageMode', 'queryRunTime'], ['computeUnitCount'], ['obs', 'scannedDataVolume']],
  controls: {
    requestQueueType: {
      type: CONTROL.Carousel,
      accessorKey: 'requestQueueType',
      defaultValue: requestQueueTypeItem.Sql,
      items: [
        {
          value: requestQueueTypeItem.Sql,
          label: 'For SQL',
          description:
            'Используется стандартный SQL, Spark и Presto SQL для запроса и анализа разнородных данных из нескольких облачных служб. Задания SQL поддерживают основные форматы данных, такие как CSV, JSON, Parquet, Carbon и ORC',
        },
        {
          value: requestQueueTypeItem.GeneralPurpose,
          label: 'For General Purpose',
          description:
            'Включает в себя Задания Spark и Flink. Spark предназначен для создания сеансов и заданий пакетной обработки через консоль управления. Flink предназначен для анализа потоков в реальном времени с помощью инструкций или загруженных файлов.',
        },
      ],
      decoratorProps: {
        label: 'Тип очереди запроса',
      },
      uiProps: {
        showItems: 2,
        pagination: false,
        arrows: false,
      },
    },
    resourceUsageMode: {
      type: CONTROL.Segmented,
      accessorKey: 'resourceUsageMode',
      defaultValue: resourceUsageModeItem.Dedicated,
      items: [
        {
          value: resourceUsageModeItem.Dedicated,
          label: 'Выделенный',
        },
        {
          value: resourceUsageModeItem.NonDedicated,
          label: 'Невыделенный',
        },
      ],
      decoratorProps: {
        label: 'Режим использования ресурса',
      },
    },
    queryRunTime: {
      type: CONTROL.Stepper,
      accessorKey: 'queryRunTime',
      defaultValue: 0,
      decoratorProps: {
        label: 'Время использования ресурса',
      },
      uiProps: {
        min: 0,
        max: 10_000,
        postfix: 'ч',
        showHint: false,
        visible: false,
      },
      watchedControls: { resourceUsageMode: 'resourceUsageMode' },
      relateFn: ({ resourceUsageMode }) => {
        if (resourceUsageModeItem.NonDedicated === resourceUsageMode) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
      },
    },
    computeUnitCount: {
      type: CONTROL.Segmented,
      accessorKey: 'computeUnitCount',
      items: generateCpuItems([16, 64, 256, 512]),
      defaultValue: '16',
      decoratorProps: {
        label: 'Количество CU',
        labelTooltip: 'CU (Compute unit) — единица тарификации, которая состоит из 1 vCPU и 4 ГБ памяти.',
      },
    },
    scannedDataVolume: {
      type: CONTROL.Stepper,
      accessorKey: 'scannedDataVolume',
      decoratorProps: {
        label: 'Объем сканируемых данных',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        postfix: 'ГБ',
        showHint: false,
        visible: false,
      },
      watchedControls: { requestQueueType: 'requestQueueType' },
      relateFn: ({ requestQueueType }) => {
        if (requestQueueTypeItem.Sql === requestQueueType) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
      },
    },
    obs: getObs({
      space: {
        accessorKey: 'obs.space',
        defaultValue: 0,
        uiProps: {
          min: 0,
        },
      },
      units: {
        accessorKey: 'obs.unitsOfCalculation',
      },
    }),
  },
};
