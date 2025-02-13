import { Link } from '@snack-uikit/link';

import {
  AlertControl,
  CarouselControl,
  CONTROL,
  FormConfig,
  ObjectControl,
  SegmentedControl,
  StepperControl,
} from '../../../../components';
import { AnyType } from '../../../../types';
import { generateCpuItems, generateRamItems, getDisk } from '../../../utils';

const MrsSpecificationItem = {
  GeneralPurpose: 'General-Purpose (ECS)',
  DedicatedGeneralPurpose: 'Dedicated General-Purpose (ECS)',
  MemoryOptimized: 'Memory-optimized (ECS)',
  DiskIntensive: 'Disk-intensive (ECS)',
};

const mrsSpecificationItems = [
  {
    label: 'General-Purpose',
    value: MrsSpecificationItem.GeneralPurpose,
    description: (
      <span>
        Базовый сервер, который обеспечивает работу виртуального процессора (vCPU), памяти, сети. Подходит для базовых
        вычислений, не требующих высокой нагрузки.{' '}
        <Link
          onClick={event => event.stopPropagation()}
          href='https://cloud.ru/docs/ecs/ug/topics/glossary.html#term-2'
          target='_blank'
          textMode='accent'
          insideText
          size='m'
          text='Коэффициент переподписки на ядра'
        />{' '}
        1:3.
      </span>
    ),
  },
  {
    label: 'Dedicated General-Purpose',
    value: MrsSpecificationItem.DedicatedGeneralPurpose,
    description: (
      <span>
        Предоставляет выделенные процессоры и память. Подходит для сервисов и маломасштабных приложений баз данных с
        высокими требованиями к производительности процессора и памяти. Не использует{' '}
        <Link
          onClick={event => event.stopPropagation()}
          href='https://cloud.ru/docs/ecs/ug/topics/glossary.html#term-2'
          target='_blank'
          textMode='accent'
          insideText
          size='m'
          text='переподписку на ядра'
        />
        .
      </span>
    ),
  },
  {
    label: 'Memory-optimized',
    value: MrsSpecificationItem.MemoryOptimized,
    description:
      'Развернут на платформе виртуализации последнего поколения. Обеспечивает высокоэффективный доступ к памяти. Не использует переподписку на ядра.',
  },
  {
    label: 'Disk-intensive',
    value: MrsSpecificationItem.DiskIntensive,
    description:
      'Disk-intensive Развернут на платформе виртуализации последнего поколения. Обеспечивает высокую пропускную способность хранилища. Не использует переподписку на ядра.',
  },
];

const specificationToCpuMap = {
  [MrsSpecificationItem.GeneralPurpose]: [16],
  [MrsSpecificationItem.DedicatedGeneralPurpose]: [16, 32, 64],
  [MrsSpecificationItem.MemoryOptimized]: [8, 16, 32, 64],
  [MrsSpecificationItem.DiskIntensive]: [16, 24, 32, 48, 64, 72],
};

const specificationCpuToRamMap: Record<string, Record<string, number[]>> = {
  [MrsSpecificationItem.GeneralPurpose]: {
    '16': [64],
  },
  [MrsSpecificationItem.DedicatedGeneralPurpose]: {
    '16': [32, 64],
    '32': [64, 128],
    '64': [128, 256],
  },
  [MrsSpecificationItem.MemoryOptimized]: {
    '8': [64],
    '16': [128],
    '32': [256],
    '64': [512],
  },
  [MrsSpecificationItem.DiskIntensive]: {
    '16': [64],
    '24': [96],
    '32': [128],
    '48': [192],
    '64': [256],
    '72': [288],
  },
};

function getNodeConfig(prefix: string): {
  specification: CarouselControl;
  cpu: SegmentedControl;
  ram: SegmentedControl;
  systemDisk: ObjectControl;
  additionalDisk: ObjectControl;
  additionalDiskCounter: StepperControl;
  instanceCount: StepperControl;
} {
  const accessorKey = {
    cpu: `${prefix}.mrs.cpu`,
    specification: `${prefix}.mrs.specification`,
    ram: `${prefix}.mrs.ram`,
  };

  return {
    specification: {
      type: CONTROL.Carousel,
      defaultValue: MrsSpecificationItem.GeneralPurpose,
      accessorKey: accessorKey.specification,
      items: mrsSpecificationItems,
      decoratorProps: {
        label: 'Тип сервера',
      },
      onChangeFn: (value, setValue) => {
        const arr: [string, AnyType][] = [[accessorKey.specification, value]];

        switch (value) {
          case MrsSpecificationItem.DedicatedGeneralPurpose: {
            arr.push([accessorKey.cpu, '16']);
            arr.push([accessorKey.ram, '32']);
            break;
          }

          case MrsSpecificationItem.MemoryOptimized: {
            arr.push([accessorKey.cpu, '8']);
            arr.push([accessorKey.ram, '64']);
            break;
          }
          case MrsSpecificationItem.DiskIntensive:
          case MrsSpecificationItem.GeneralPurpose:
          default: {
            arr.push([accessorKey.cpu, '16']);
            arr.push([accessorKey.ram, '64']);
            break;
          }
        }

        setValue(arr);
      },
    },
    cpu: {
      type: CONTROL.Segmented,
      accessorKey: `${prefix}.mrs.cpu`,
      defaultValue: '16',
      items: generateCpuItems([16]),
      decoratorProps: {
        label: 'Количество vCPU',
      },
      watchedControls: { specification: `${prefix}.mrs.specification` },
      relateFn: ({ specification }) => {
        const items = specificationToCpuMap?.[specification];

        if (items?.length > 0) {
          return {
            items: generateCpuItems(items),
          };
        }
      },
    },
    ram: {
      type: CONTROL.Segmented,
      accessorKey: `${prefix}.mrs.ram`,
      defaultValue: '64',
      items: generateRamItems([64]),
      decoratorProps: {
        label: 'Объём RAM',
      },
      watchedControls: { specification: `${prefix}.mrs.specification`, cpu: `${prefix}.mrs.cpu` },
      relateFn: ({ specification, cpu }) => {
        const items = specificationCpuToRamMap?.[specification]?.[cpu];

        if (items?.length > 0) {
          return {
            items: generateRamItems(items),
          };
        }
      },
    },
    systemDisk: getDisk({
      space: {
        accessorKey: `${prefix}.evs.systemDisk.diskSpace`,
        label: 'Объем системного диска',
        defaultValue: 480,
        uiProps: {
          min: 480,
          max: 1000,
        },
      },
      specification: {
        accessorKey: `${prefix}.evs.systemDisk.specification`,
      },
    }),
    additionalDisk: getDisk({
      space: {
        accessorKey: `${prefix}.evs.additionalDisk.diskSpace`,
        label: 'Объем дополнительного диска',
        defaultValue: 600,
        uiProps: {
          min: 600,
          max: 32_000,
        },
      },
      specification: {
        accessorKey: `${prefix}.evs.additionalDisk.specification`,
      },
    }),
    additionalDiskCounter: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Количество дополнительных дисков',
      },
      accessorKey: `${prefix}.evs.additionalDiskCounter`,
      defaultValue: 1,
      uiProps: {
        min: 1,
        max: 10,
        postfix: 'Шт',
        visible: false,
      },
    },
    instanceCount: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Количество Master Node',
      },
      accessorKey: `${prefix}.instanceCount`,
      defaultValue: 2,
      uiProps: {
        min: 2,
        max: 9,
        postfix: 'Шт',
      },
    },
  };
}

function getAlert(prefix: string, label: string): AlertControl {
  return {
    type: CONTROL.Alert,
    uiProps: {
      description: `Для ${label} будет добавлена Виртуальная машина ECS с аналогичными параметрами по типу сервера, vCPU, RAM Виртуальная машина: ECS General-Purpose 16vCPU 64 GB`,
    },
    watchedControls: {
      specification: `${prefix}.mrs.specification`,
      cpu: `${prefix}.mrs.cpu`,
      ram: `${prefix}.mrs.ram`,
    },
    relateFn: ({ specification, cpu, ram }) => ({
      uiProps: {
        description: (
          <>
            {`Для ${label} будет добавлена Виртуальная машина ECS с аналогичными параметрами по типу сервера, vCPU,
            RAM`}
            <br />
            {`Виртуальная машина: ${specification} ${cpu}vCPU ${ram} GB`}
          </>
        ),
      },
    }),
    accessorKey: 'vm-add',
  };
}

const masterNode = getNodeConfig('masterNode');
const workerNode = getNodeConfig('workerNode');

export const MAP_REDUCE_FORM_CONFIG: FormConfig = {
  ui: ['masterNode', 'workerNode'],
  controls: {
    masterNode: {
      type: CONTROL.Object,
      decoratorProps: {
        label: 'Master Node',
        labelTooltip:
          'Мастер-нода (Master Node) предназначена для управления кластером и включает в себя виртуальную машину ECS, службу MRS для работы с большими данными на базе ClickHouse и диски EVS для выполнения вычислений',
      },
      ui: ['alert', 'specification', ['cpu', 'ram'], ['systemDisk', 'additionalDisk'], ['instanceCount']],
      controls: {
        alert: getAlert('masterNode', 'Master Node'),
        specification: { ...masterNode.specification, items: masterNode.specification.items.slice(0, 3) },
        cpu: masterNode.cpu,
        ram: masterNode.ram,
        systemDisk: masterNode.systemDisk,
        additionalDisk: masterNode.additionalDisk,
        instanceCount: masterNode.instanceCount,
        // Hidden
        additionalDiskCounter: masterNode.additionalDiskCounter,
      },
    },

    workerNode: {
      type: CONTROL.Object,
      decoratorProps: {
        label: 'Worker Node',
        labelTooltip:
          'Воркер-нода (Worker Node) предназначена для обработки и хранения данных и включает в себя виртуальную машину ECS, службу MRS для работы с большими данными на базе ClickHouse и диски EVS для выполнения вычислений',
      },
      ui: [
        'alert',
        'specification',
        ['cpu', 'ram'],
        ['systemDisk', 'additionalDisk'],
        ['additionalDiskCounter', 'localDisk'],
        ['instanceCount'],
      ],
      controls: {
        alert: getAlert('workerNode', 'Worker Node'),
        specification: workerNode.specification,
        cpu: workerNode.cpu,
        ram: workerNode.ram,
        systemDisk: workerNode.systemDisk,
        additionalDisk: workerNode.additionalDisk,
        additionalDiskCounter: {
          ...workerNode.additionalDiskCounter,
          uiProps: {
            ...workerNode.additionalDiskCounter.uiProps,
            visible: true,
          },
          watchedControls: { workerNodeMrsSpecification: 'workerNode.mrs.specification' },
          relateFn: ({ workerNodeMrsSpecification }) => {
            if (workerNodeMrsSpecification === MrsSpecificationItem.DiskIntensive) {
              return {
                uiProps: {
                  visible: false,
                },
              };
            }
          },
        },

        localDisk: {
          type: CONTROL.Object,
          ui: ['workerNodeEvsLocalDisk'],
          controls: {
            workerNodeEvsLocalDisk: getDisk({
              space: {
                accessorKey: 'workerNode.evs.localDisk.diskSpace',
                label: 'Объем локального диска',
                defaultValue: 29_800,
                uiProps: {
                  min: 600,
                  max: 32_000,
                  showHint: false,
                  disabled: true,
                },
              },
              specification: {
                accessorKey: 'workerNode.evs.localDisk.specification',
                uiProps: {
                  disabled: true,
                },
              },
            }),
          },
          visible: false,
          watchedControls: { workerNodeMrsSpecification: 'workerNode.mrs.specification' },
          relateFn: ({ workerNodeMrsSpecification }) => {
            if (workerNodeMrsSpecification === MrsSpecificationItem.DiskIntensive) {
              return {
                visible: true,
              };
            }
          },
        },

        instanceCount: {
          ...workerNode.instanceCount,
          decoratorProps: {
            label: 'Количество Worker Node',
          },
        },
      },
    },
  },
};
