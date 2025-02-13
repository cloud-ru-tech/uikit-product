import { ValueOf } from '@snack-uikit/utils';

import { CONTROL, FormConfig } from '../../../../components';
import { CALCULATOR_TYPE } from '../../../../types';
import { generateRamItems, getDisk, getEip, SpecificationItem } from '../../../utils';

export const EcsSpecificationItem = {
  GeneralPurpose: 'General-Purpose (ECS)',
  DedicatedGeneralPurpose: 'Dedicated General-Purpose (ECS)',
  MemoryOptimized: 'Memory-optimized (ECS)',
  DiskIntensive: 'Disk-intensive (ECS)',
  UltraHigh: 'Ultra high I/O (ECS)',
} as const;

export type EcsSpecificationType = ValueOf<typeof EcsSpecificationItem>;

export const ecsSpecificationItems = [
  {
    value: EcsSpecificationItem.GeneralPurpose,
    label: 'General-Purpose',
    description: (
      <ul>
        <li>Базовый сервер</li>
        <li>Переподписка по&nbsp;ядрам 1:3</li>
        <li>
          Для базовых вычислений,
          <br />
          не требующих высокой нагрузки
        </li>
      </ul>
    ) as unknown as string,
  },
  {
    value: EcsSpecificationItem.DedicatedGeneralPurpose,
    label: 'Dedicated General-Purpose',
    description: (
      <ul>
        <li>
          Выделенный стандартный сервер с&nbsp;механизмом ускорения сети последнего поколения и&nbsp;набором библиотек
          и&nbsp;драйверов для быстрой обработки пакетов (DPDK)
        </li>
        <li>Без переподписки</li>
        <li>Для вычислений с&nbsp;высокими требованиями к&nbsp;CPU</li>
      </ul>
    ) as unknown as string,
  },
  {
    value: EcsSpecificationItem.MemoryOptimized,
    label: 'Memory-optimized',
    description: (
      <ul>
        <li>
          Сервер с увеличенным объемом памяти на&nbsp;платформе виртуализации последнего поколения, обеспечивающий
          высокоэффективный доступ к&nbsp;памяти
        </li>
        <li>Без переподписки</li>
        <li>
          Для приложений, которым требуется хранить и&nbsp;обрабатывать большие объемы данных в&nbsp;оперативной памяти
        </li>
      </ul>
    ) as unknown as string,
  },
  {
    value: EcsSpecificationItem.DiskIntensive,
    label: 'Disk-intensive',
    description: (
      <ul>
        <li>
          Сервер с высокопроизводительными локальными дисками для последовательного чтения/записи файлов и
          их&nbsp;низкой задержки
        </li>
        <li>Без переподписки</li>
        <li>
          Для задач, в&nbsp;которых требуется чтение и/или&nbsp;запись файлов большого объема
          <br />
          <br />
          <b>Тарифицируются в&nbsp;выключенном (остановленном) режиме</b>
        </li>
      </ul>
    ) as unknown as string,
  },
  {
    value: EcsSpecificationItem.UltraHigh,
    label: 'Ultra-high I/O',
    description: (
      <ul>
        <li>
          Сервер с&nbsp;высокопроизводительными локальными NVMe SSD дисками, обеспечивающий повышенное количество
          I/O-операций в&nbsp;секунду и&nbsp;минимальную задержку
          <br />
          чтения/записи данных
        </li>
        <li>Без переподписки</li>
        <li>Для приложений с&nbsp;повышенными требованиями к&nbsp;производительности дисков</li>
      </ul>
    ) as unknown as string,
  },
];

export const OsItem = {
  Linux: 'Linux',
  Essentials: 'Essentials',
};

export const osItems = [
  {
    value: OsItem.Linux,
    label: 'Linux',
  },
  {
    value: OsItem.Essentials,
    label: 'Essentials',
  },
];

export const ServerGenItem = {
  SkyLake: '3',
  CascadeLake: '6',
  IceLake: '7',
} as const;

export type ServerGenType = ValueOf<typeof ServerGenItem>;

export const skyLakeServerGenItem = {
  value: ServerGenItem.SkyLake,
  label: 'Sky Lake',
};
export const cascadeLakeServerGenItem = {
  value: ServerGenItem.CascadeLake,
  label: 'Cascade Lake',
};
export const iceLakeServerGenItem = {
  value: ServerGenItem.IceLake,
  label: 'Ice Lake',
};

export const ecsSpecificationToGenMap = {
  [EcsSpecificationItem.GeneralPurpose]: [cascadeLakeServerGenItem, iceLakeServerGenItem],
  [EcsSpecificationItem.DedicatedGeneralPurpose]: [
    skyLakeServerGenItem,
    cascadeLakeServerGenItem,
    iceLakeServerGenItem,
  ],
  [EcsSpecificationItem.MemoryOptimized]: [skyLakeServerGenItem, cascadeLakeServerGenItem, iceLakeServerGenItem],
  [EcsSpecificationItem.DiskIntensive]: [skyLakeServerGenItem, cascadeLakeServerGenItem],
  [EcsSpecificationItem.UltraHigh]: [skyLakeServerGenItem],
};

export const ecsSpecificationGenToCpuMap: Record<EcsSpecificationType, Record<string, number[]>> = {
  [EcsSpecificationItem.GeneralPurpose]: {
    [ServerGenItem.CascadeLake]: [1, 2, 4, 8],
    [ServerGenItem.IceLake]: [1, 2, 4, 8, 16],
  },
  [EcsSpecificationItem.DedicatedGeneralPurpose]: {
    [ServerGenItem.SkyLake]: [2, 4, 8, 12, 16, 24, 32, 60],
    [ServerGenItem.CascadeLake]: [2, 4, 8, 12, 16, 24, 32, 48, 64],
    [ServerGenItem.IceLake]: [2, 4, 8, 12, 16, 24, 32, 48, 64, 96],
  },
  [EcsSpecificationItem.MemoryOptimized]: {
    [ServerGenItem.SkyLake]: [2, 4, 8, 12, 16, 24, 32, 60],
    [ServerGenItem.CascadeLake]: [2, 4, 8, 12, 16, 24, 32, 64],
    [ServerGenItem.IceLake]: [2, 4, 8, 12, 16, 24, 32, 48, 64, 96],
  },
  [EcsSpecificationItem.DiskIntensive]: {
    [ServerGenItem.SkyLake]: [4, 8, 16, 24, 32, 48, 56],
    [ServerGenItem.CascadeLake]: [4, 8, 16, 24, 32, 48, 64, 72],
  },
  [EcsSpecificationItem.UltraHigh]: {
    [ServerGenItem.SkyLake]: [2, 4, 8, 16, 32, 96],
  },
};

export const ecsSpecificationGenCpuToRamMap: Record<EcsSpecificationType, Record<string, Record<string, number[]>>> = {
  [EcsSpecificationItem.GeneralPurpose]: {
    [ServerGenItem.CascadeLake]: {
      '1': [1, 2, 4],
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
    },
    [ServerGenItem.IceLake]: {
      '1': [2, 4],
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
      '16': [32, 64],
    },
  },
  [EcsSpecificationItem.DedicatedGeneralPurpose]: {
    [ServerGenItem.SkyLake]: {
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
      '12': [24, 48],
      '16': [32, 64],
      '24': [48, 96],
      '32': [64, 128],
      '60': [128, 256],
    },
    [ServerGenItem.CascadeLake]: {
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
      '12': [24, 48],
      '16': [32, 64],
      '24': [48, 96],
      '32': [64, 128],
      '48': [96, 192],
      '64': [128, 256],
    },
    [ServerGenItem.IceLake]: {
      '2': [8],
      '4': [16],
      '8': [32],
      '12': [48],
      '16': [64],
      '24': [96],
      '32': [128],
      '48': [192],
      '64': [256],
      '96': [384],
    },
  },
  [EcsSpecificationItem.MemoryOptimized]: {
    [ServerGenItem.SkyLake]: {
      '2': [16],
      '4': [32],
      '8': [64],
      '12': [96],
      '16': [128],
      '24': [192],
      '32': [256],
      '60': [512],
    },
    [ServerGenItem.CascadeLake]: {
      '2': [16],
      '4': [32],
      '8': [64],
      '12': [96],
      '16': [128],
      '24': [192],
      '32': [256],
      '64': [512],
    },
    [ServerGenItem.IceLake]: {
      '2': [16],
      '4': [32],
      '8': [64],
      '12': [96],
      '16': [128],
      '24': [192],
      '32': [256],
      '48': [384],
      '64': [512],
      '96': [768],
    },
  },
  [EcsSpecificationItem.DiskIntensive]: {
    [ServerGenItem.SkyLake]: { '4': [32], '8': [64], '16': [128], '24': [192], '32': [256], '48': [284], '56': [560] },
    [ServerGenItem.CascadeLake]: {
      '4': [16],
      '8': [32],
      '16': [64],
      '24': [96],
      '32': [128],
      '48': [192],
      '64': [256],
      '72': [288],
    },
  },
  [EcsSpecificationItem.UltraHigh]: {
    [ServerGenItem.SkyLake]: { '2': [8], '4': [16], '8': [32], '16': [64], '32': [128], '96': [384] },
  },
};

const shortSpecificationItems = [
  {
    value: SpecificationItem.HDD,
    label: 'HDD',
  },
  {
    value: SpecificationItem.SSD,
    label: 'SSD',
  },
];

const specificationItems = [
  {
    value: SpecificationItem.HDD,
    label: 'HDD',
  },
  {
    value: SpecificationItem.SSD,
    label: 'SSD',
  },
  {
    value: SpecificationItem.ESSD,
    label: 'ESSD',
  },
];

export const getCpuFrequency = (ecsSpecification: EcsSpecificationType, serverGen: ServerGenType) => {
  switch (ecsSpecification) {
    case EcsSpecificationItem.UltraHigh:
    case EcsSpecificationItem.GeneralPurpose: {
      return '2.6';
    }
    case EcsSpecificationItem.DiskIntensive: {
      if (serverGen === ServerGenItem.SkyLake) {
        return '3.0';
      }

      return '2.6';
    }

    case EcsSpecificationItem.DedicatedGeneralPurpose:
    case EcsSpecificationItem.MemoryOptimized: {
      if (serverGen === ServerGenItem.IceLake) {
        return '2.6';
      }

      return '3.0';
    }
    default: {
      return '3.0';
    }
  }
};

const generateCpuGHItems = (items: number[], frequency: string) =>
  items.map(item => ({
    value: String(item),
    label: `${item} (${frequency} GHz)`,
  }));

export const CLOUD_SERVER_FORM_CONFIG: FormConfig = {
  ui: [
    'ecsSpecification',
    'ecsOs',
    'nonPartnersAlert',
    ['ecsCpu', 'ecsRam'],
    ['ecsGen', 'evsSystemDisk'],
    ['evsAdditionalDisks'],
    'eip',
  ],
  controls: {
    ecsSpecification: {
      type: CONTROL.Carousel,
      accessorKey: 'ecs.specification',
      defaultValue: EcsSpecificationItem.GeneralPurpose,
      items: ecsSpecificationItems,
      decoratorProps: {
        label: 'Тип сервера',
      },
    },
    ecsOs: {
      type: CONTROL.Object,
      ui: [['ecsOs']],
      controls: {
        ecsOs: {
          type: CONTROL.Segmented,
          accessorKey: 'ecs.os',
          defaultValue: OsItem.Linux,
          items: osItems,
          decoratorProps: {
            label: 'Операционная система',
          },
        },
      },
      relateFn: ({ calculatorType }) => {
        if (calculatorType !== CALCULATOR_TYPE.Partners) {
          return {
            visible: false,
          };
        }
      },
    },

    nonPartnersAlert: {
      type: CONTROL.Alert,
      uiProps: {
        visible: false,
        description:
          'По умолчанию в стоимость расчета входит ОС Linux. Для расчета стоимости виртуальных машин с другими ОС оставьте заявку на консультацию',
      },
      accessorKey: 'default',
      relateFn: ({ calculatorType }) => {
        if (calculatorType !== CALCULATOR_TYPE.Partners) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
      },
    },

    ecsCpu: {
      type: CONTROL.SelectSingle,
      accessorKey: 'ecs.cpu',
      defaultValue: '1',
      items: generateCpuGHItems([1, 2, 4, 8], '2.6'),
      decoratorProps: {
        label: 'Количество vCPU, шт',
        labelTooltip: 'Виртуальный процессор',
      },
      watchedControls: { ecsSpecification: 'ecs.specification', serverGen: 'ecs.gen' },
      relateFn: ({
        ecsSpecification,
        serverGen,
      }: {
        ecsSpecification: EcsSpecificationType;
        serverGen: ServerGenType;
      }) => {
        const items = ecsSpecificationGenToCpuMap?.[ecsSpecification]?.[serverGen];

        if (items?.length > 0) {
          return {
            items: generateCpuGHItems(items, getCpuFrequency(ecsSpecification, serverGen)),
          };
        }
      },
    },

    ecsRam: {
      type: CONTROL.Segmented,
      accessorKey: 'ecs.ram',
      defaultValue: '1',
      items: generateRamItems([1, 2, 4]),
      decoratorProps: {
        label: 'Объём RAM',
        labelTooltip: 'Оперативная память',
      },
      watchedControls: { ecsSpecification: 'ecs.specification', serverGen: 'ecs.gen', cpu: 'ecs.cpu' },
      relateFn: ({
        ecsSpecification,
        serverGen,
        cpu,
      }: {
        ecsSpecification: EcsSpecificationType;
        serverGen: ServerGenType;
        cpu: string;
      }) => {
        const items = ecsSpecificationGenCpuToRamMap?.[ecsSpecification]?.[serverGen]?.[cpu];

        if (items?.length > 0) {
          return {
            items: generateRamItems(items),
          };
        }
      },
    },

    ecsGen: {
      type: CONTROL.Segmented,
      accessorKey: 'ecs.gen',
      defaultValue: cascadeLakeServerGenItem.value,
      items: [cascadeLakeServerGenItem, iceLakeServerGenItem],
      decoratorProps: {
        label: 'Поколение GEN',
      },
      watchedControls: { ecsSpecification: 'ecs.specification' },
      relateFn: ({ ecsSpecification }: { ecsSpecification: EcsSpecificationType }) => ({
        items: ecsSpecificationToGenMap[ecsSpecification] || [],
      }),
    },

    evsSystemDisk: getDisk({
      space: {
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 40,
        uiProps: {
          min: 40,
          max: 1_530,
          postfix: 'ГБ',
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        items: specificationItems,
        watchedControls: { escSpecification: 'ecs.specification' },
        relateFn: ({ escSpecification }) => {
          switch (escSpecification) {
            case EcsSpecificationItem.DiskIntensive:
            case EcsSpecificationItem.UltraHigh:
              return {
                items: shortSpecificationItems,
              };

            default: {
              return undefined;
            }
          }
        },
      },
    }),

    evsAdditionalDisks: {
      type: CONTROL.Array,
      max: 23,
      accessorKey: 'evs.additionalDisks',
      defaultValue: [],
      addText: 'Добавить диск',
      ui: ['disk'],
      controls: {
        disk: getDisk({
          space: {
            accessorKey: 'diskSpace',
            defaultValue: 10,
            uiProps: {
              min: 10,
              max: 32_760,
            },
          },
          specification: {
            accessorKey: 'specification',
          },
        }),
      },
    },

    eip: getEip({
      trafficKey: 'eip.traffic',
    }),
  },
};
