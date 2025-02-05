import { ValueOf } from '@snack-uikit/utils';

import { CONTROL, FormConfig, SegmentedControl, StepperControl } from '../../../../components';
import { generateCpuItems, generateRamItems, getDisk, getEip, getObs } from '../../../utils';

const BdInstanceTypeItem = {
  Single: 'Single',
  PrimaryStandby: 'Primary/Standby',
};

const bdInstanceTypeItems = [
  {
    value: BdInstanceTypeItem.Single,
    label: 'Single',
  },
  {
    value: BdInstanceTypeItem.PrimaryStandby,
    label: 'Primary/Standby',
  },
];

const BdEngineVersionItem = {
  Web: 'Web Edition',
  Standard: 'Standard Edition',
  Enterprise: 'Enterprise Edition',
} as const;

type BdEngineVersionType = ValueOf<typeof BdEngineVersionItem>;

const bdEngineVersionItems = [
  {
    value: BdEngineVersionItem.Enterprise,
    label: 'Enterprise',
  },
  {
    value: BdEngineVersionItem.Standard,
    label: 'Standard',
  },
  {
    value: BdEngineVersionItem.Web,
    label: 'Web',
  },
];

const BdEngineVersionItemCpuRamMap: Record<BdEngineVersionType, Record<string, number[]>> = {
  [BdEngineVersionItem.Enterprise]: {
    '2': [8, 16],
    '4': [8, 16, 32],
    '8': [32, 64],
    '16': [64, 128],
    '24': [192],
    '32': [128, 256],
    '64': [256, 512],
  },
  [BdEngineVersionItem.Standard]: {
    '2': [4, 8, 16],
    '4': [8, 16, 32],
    '8': [16, 32, 64],
    '16': [64, 128],
    '24': [192],
    '32': [256],
    '64': [256],
  },
  [BdEngineVersionItem.Web]: {
    '2': [4, 8],
    '4': [8, 16],
    '8': [16, 32],
    '16': [64],
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
    items: generateCpuItems([2, 4, 8, 16, 24, 32, 64]),
    decoratorProps: {
      label: 'Количество vCPU',
      labelTooltip: 'Виртуальный процессор',
    },
    watchedControls: { bdEngineVersion: `${prefix}.bdEngineVersion` },
    relateFn: ({ bdEngineVersion }) => {
      if (bdEngineVersion === BdEngineVersionItem.Web) {
        return {
          items: generateCpuItems([2, 4, 8, 16]),
        };
      }
    },
  },
  ram: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.ram`,
    defaultValue: '8',
    items: generateRamItems([8, 16]),
    decoratorProps: {
      label: 'Объём RAM',
      labelTooltip: 'Оперативная память',
    },
    watchedControls: {
      bdEngineVersion: 'rds.bdEngineVersion',
      cpu: `${prefix}.cpu`,
    },
    relateFn: ({ bdEngineVersion, cpu }: { bdEngineVersion: ValueOf<typeof BdEngineVersionItem>; cpu: string }) => {
      const items: number[] = BdEngineVersionItemCpuRamMap?.[bdEngineVersion]?.[cpu];

      if (items?.length > 0) {
        return {
          items: generateRamItems(items),
        };
      }
    },
  },
  bdQuantity: {
    type: CONTROL.Stepper,
    accessorKey: `${prefix}.bdQuantity`,
    defaultValue: 1,
    decoratorProps: {
      label: 'Количество RDS',
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

export const SQL_DATA_BASE_FORM_CONFIG: FormConfig = {
  ui: [
    ['rdsBdEngineVersion', 'rdsBdInstanceType'],
    'bdInstanceAlert',
    ['rdsCpu', 'rdsRam'],
    ['evs', 'rdsBdQuantity'],
    'eip',
    'bdReplica',
    ['obs'],
  ],
  controls: {
    rdsBdEngineVersion: {
      type: CONTROL.Segmented,
      accessorKey: 'rds.bdEngineVersion',
      defaultValue: BdEngineVersionItem.Enterprise,
      items: bdEngineVersionItems,
      decoratorProps: {
        label: 'Версия базы данных',
      },
    },
    rdsBdInstanceType: {
      type: CONTROL.Segmented,
      accessorKey: 'rds.bdInstanceType',
      items: bdInstanceTypeItems,
      defaultValue: BdInstanceTypeItem.Single,
      decoratorProps: {
        label: 'Режим развертывания',
      },
      watchedControls: { bdEngineVersion: 'rds.bdEngineVersion' },
      relateFn: ({ bdEngineVersion }) => {
        if (bdEngineVersion === BdEngineVersionItem.Web) {
          return {
            items: bdInstanceTypeItems.slice(0, 1),
          };
        }
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
      watchedControls: { bdInstanceType: 'rds.bdInstanceType' },
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
      watchedControls: { bdEngineVersion: 'rds.bdEngineVersion' },
      relateFn: ({ bdEngineVersion }) => {
        if (bdEngineVersion !== BdEngineVersionItem.Enterprise) {
          return {
            visible: false,
          };
        }
      },
      controls: {
        replica: {
          type: CONTROL.ToggleObject,
          switchKey: 'bdReplicaIsNeeded',
          decoratorProps: {
            label: 'Реплика базы данных',
            hint: 'Тип сервера реплики равен типу сервера базы данных',
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
                  defaultValue: 'SSD',
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
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
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
  },
};
