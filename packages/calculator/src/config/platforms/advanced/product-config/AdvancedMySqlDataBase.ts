import { CONTROL, FormConfig, SegmentedControl, StepperControl } from '../../../../components';
import { generateCpuItems, generateRamItems, getEip, getObs } from '../../../utils';
import { getDisk } from '../../../utils/diskPostgreSqlMySQL';

const BdEngineVersionItem = {
  General_Purpose: 'General Purpose',
  Dedicated: 'Dedicated',
} as const;

const bdEngineVersionItems = [
  {
    value: BdEngineVersionItem.Dedicated,
    label: 'Dedicated',
    description: `Инстансы имеют выделенные ресурсы процессора`,
  },
  {
    value: BdEngineVersionItem.General_Purpose,
    label: 'General Purpose',
    description: `Инстансы используют ресурсы процессора совместно с другими инстансами того же класса, размещенными на одном физическом сервере`,
  },
];

const BdInstanceTypeItem = {
  Single: 'Single',
  Replica: 'Replica',
  PrimaryStandby: 'Primary/Standby',
};

const bdInstanceTypeItems = [
  {
    value: BdInstanceTypeItem.Single,
    label: 'Single',
    description: 'Одноузловая конфигурация',
  },
  {
    value: BdInstanceTypeItem.PrimaryStandby,
    label: 'Primary/Standby',
    description: 'Отказоустойчивый кластер высокой доступности',
  },
];

const CpuRamByClassType: {
  [instanceClass: string]: { [instanceType: string]: Record<string, number[]> };
} = {
  [BdEngineVersionItem.Dedicated]: {
    [BdInstanceTypeItem.Single]: {
      '2': [8],
      '4': [16, 32],
      '8': [32, 64],
      '12': [96],
      '16': [64, 128],
      '24': [192],
      '32': [128],
      '48': [384],
      '64': [256, 512],
      '96': [768],
    },
    [BdInstanceTypeItem.PrimaryStandby]: {
      '2': [8],
      '4': [16, 32],
      '8': [32, 64],
      '12': [96],
      '16': [64, 128],
      '24': [192],
      '32': [128],
      '48': [384],
      '64': [256, 512],
      '96': [768],
    },
    [BdInstanceTypeItem.Replica]: {
      '2': [8],
      '4': [16, 32],
      '8': [32, 64],
      '12': [96],
      '16': [64, 128],
      '24': [192],
      '32': [128],
      '48': [384],
      '64': [256, 512],
      '96': [768],
    },
  },
  [BdEngineVersionItem.General_Purpose]: {
    [BdInstanceTypeItem.Single]: {
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
    },
    [BdInstanceTypeItem.PrimaryStandby]: {
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
    },
    [BdInstanceTypeItem.Replica]: {
      '2': [4, 8],
      '4': [8, 16],
      '8': [16, 32],
    },
  },
};

type GetRdsControlsProps = {
  prefix: string;
};

const getRdsControls = ({
  prefix,
}: GetRdsControlsProps): {
  cpu: SegmentedControl;
  ram: SegmentedControl;
  bdQuantity: StepperControl;
} => ({
  cpu: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.cpu`,
    defaultValue: '2',
    items: [],
    decoratorProps: {
      label: 'Количество vCPU',
      labelTooltip: 'Виртуальный процессор',
    },
    watchedControls: {
      rdsBdEngineVersion: 'rds.bdInstanceClass',
      rdsBdInstanceType: 'rds.bdInstanceType',
    },
    relateFn: ({
      rdsBdEngineVersion,
      rdsBdInstanceType,
    }: {
      rdsBdEngineVersion: string;
      rdsBdInstanceType: string;
    }) => ({
      items: generateCpuItems(
        Object.entries(CpuRamByClassType[rdsBdEngineVersion][rdsBdInstanceType]).map(([key]) => Number(key)) ?? [],
      ),
    }),
  },
  ram: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.ram`,
    defaultValue: '2',
    items: [],
    decoratorProps: {
      label: 'Объём RAM',
      labelTooltip: 'Оперативная память',
    },
    watchedControls: {
      cpu: `${prefix}.cpu`,
      rdsBdEngineVersion: 'rds.bdInstanceClass',
      rdsBdInstanceType: 'rds.bdInstanceType',
    },
    relateFn: ({
      cpu,
      rdsBdEngineVersion,
      rdsBdInstanceType,
    }: {
      cpu: string;
      rdsBdEngineVersion: string;
      rdsBdInstanceType: string;
    }) => ({
      items: generateRamItems(CpuRamByClassType[rdsBdEngineVersion][rdsBdInstanceType][cpu] ?? []),
    }),
  },
  bdQuantity: {
    type: CONTROL.Stepper,
    accessorKey: `${prefix}.bdQuantity`,
    defaultValue: 1,
    decoratorProps: {
      label: 'Количество баз данных',
    },
    uiProps: {
      min: 1,
      max: 50,
      postfix: 'Шт',
    },
  },
});

const rds = getRdsControls({ prefix: 'rds' });
const bdReplicaRds = getRdsControls({ prefix: 'bdReplica.rds' });

export const MYSQL_DATA_BASE_FORM_CONFIG: FormConfig = {
  ui: [
    'rdsBdEngineVersion',
    'rdsBdInstanceType',
    'bdInstanceAlert',
    ['rdsCpu', 'rdsRam'],
    ['evs', 'rdsBdQuantity'],
    'bdReplica',
    'eip',
    ['obs'],
  ],
  controls: {
    rdsBdEngineVersion: {
      type: CONTROL.Carousel,
      accessorKey: 'rds.bdInstanceClass',
      defaultValue: BdEngineVersionItem.Dedicated,
      items: bdEngineVersionItems,
      decoratorProps: {
        label: 'Класс инстанса',
      },
    },
    rdsBdInstanceType: {
      type: CONTROL.Carousel,
      accessorKey: 'rds.bdInstanceType',
      items: bdInstanceTypeItems,
      defaultValue: BdInstanceTypeItem.Single,
      decoratorProps: {
        label: 'Режим развертывания',
      },
    },
    bdInstanceAlert: {
      type: 'alert',
      uiProps: {
        appearance: 'info',
        description:
          'Данный режим подразумевает развертывание на двух инстансах — Primary и Standby. Конфигурация инстанса Primary дублируется для инстанса Standby. Стоимость в чеке указывается за 2 инстанса',
        outline: true,
        visible: false,
      },
      accessorKey: 'instances',
      watchedControls: { bdInstanceType: 'rds.bdInstanceClass' },
      relateFn: ({ bdInstanceType }) => {
        if (bdInstanceType === BdInstanceTypeItem.PrimaryStandby) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
      },
    },

    bdReplica: {
      type: CONTROL.Object,
      ui: ['replica'],
      visible: true,
      controls: {
        replica: {
          type: CONTROL.ToggleObject,
          switchKey: 'bdReplicaIsNeeded',
          decoratorProps: {
            label: 'Реплика базы данных',
            labelTooltip: 'Тип сервера реплики равен типу сервера базы данных',
          },
          control: {
            type: CONTROL.Object,
            ui: [
              ['cpu', 'ram'],
              ['systemDisk', 'bdQuantity'],
            ],
            controls: {
              cpu: {
                ...bdReplicaRds.cpu,
                decoratorProps: {
                  ...bdReplicaRds.cpu.decoratorProps,
                  labelTooltip: 'Количество vCPU реплики рекомендуется выбирать равное количеству основного RDS',
                },
              },
              ram: {
                ...bdReplicaRds.ram,
                decoratorProps: {
                  ...bdReplicaRds.ram.decoratorProps,
                  labelTooltip: 'Объем RAM реплики рекомендуется выбирать равное количеству основного RDS',
                },
              },
              bdQuantity: {
                ...bdReplicaRds.bdQuantity,
                accessorKey: 'bdReplica.replicaQuantity',
                decoratorProps: {
                  label: 'Количество реплик',
                },
                uiProps: {
                  min: 1,
                  max: 5,
                  postfix: 'Шт',
                },
              },
              systemDisk: getDisk({
                space: {
                  accessorKey: 'bdReplica.evs.systemDisk.diskSpace',
                  defaultValue: 40,
                  uiProps: {
                    min: 40,
                    max: 4000,
                    disabled: true,
                  },
                  decoratorProps: {
                    labelTooltip:
                      'SSD имеют высокую скорость передачи данных, что в два раза быстрее, чем HDD-накопители',
                  },
                },
                specification: {
                  accessorKey: 'bdReplica.evs.systemDisk.specification',
                  defaultValue: 'Cloud SSD',
                  uiProps: { disabled: true },
                },
              }),

              // Hidden
              replicaQuantity: {
                type: CONTROL.Stepper,
                accessorKey: 'bdReplica.rds.bdQuantity',
                defaultValue: 1,
                decoratorProps: {
                  label: '',
                },
                uiProps: {
                  visible: false,
                },
              },

              // Hidden
              evsAdditionalDisks: {
                type: 'select-multiple',
                accessorKey: 'bdReplica.evs.additionalDisks',
                items: [],
                defaultValue: [],
                uiProps: {
                  visible: false,
                },
                decoratorProps: {
                  label: '',
                },
              },
            },
          },
        },
      },
    },
    rdsCpu: {
      ...rds.cpu,
      onChangeFn: (value, setValue) => {
        setValue([
          ['rds.cpu', value],
          ['bdReplica.rds.cpu', value],
        ]);
      },
    },
    rdsRam: {
      ...rds.ram,
      onChangeFn: (value, setValue) => {
        setValue([
          ['rds.ram', value],
          ['bdReplica.rds.ram', value],
        ]);
      },
    },
    rdsBdQuantity: rds.bdQuantity,

    evs: getDisk({
      space: {
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 40,
        uiProps: {
          min: 40,
          max: 4000,
        },
        decoratorProps: {
          labelTooltip: 'SSD имеют высокую скорость передачи данных, что в два раза быстрее, чем HDD-накопители',
        },
        onChangeFn: (value, setValue) => {
          setValue([
            ['evs.systemDisk.diskSpace', value],
            ['bdReplica.evs.systemDisk.diskSpace', value],
          ]);
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        defaultValue: 'Cloud SSD',
        onChangeFn: (value, setValue) => {
          setValue([
            ['evs.systemDisk.specification', value],
            ['bdReplica.evs.systemDisk.specification', value],
          ]);
        },
      },
    }),
    eip: getEip({
      trafficKey: 'eip.traffic',
    }),
    obs: getObs({
      space: {
        accessorKey: 'obs.storage.space',
        defaultValue: 0,
      },
      units: {
        accessorKey: 'obs.storage.unitsOfCalculation',
      },
    }),

    // Hidden
    evsAdditionalDisks: {
      type: 'select-multiple',
      accessorKey: 'evs.additionalDisks',
      items: [],
      defaultValue: [],
      uiProps: {
        visible: false,
      },
      decoratorProps: {
        label: '',
      },
    },
    // Hidden
    ipQuantity: {
      accessorKey: 'eip.ipQuantity',
      type: CONTROL.Stepper,
      defaultValue: 0,
      decoratorProps: {},
      uiProps: {
        visible: false,
      },
    },
  },
};
