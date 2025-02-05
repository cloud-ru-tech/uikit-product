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

const CpuRamMap: Record<string, number[]> = {
  '1': [2, 4],
  '2': [4, 8, 16],
  '4': [8, 16, 32],
  '8': [16, 32, 64],
  '16': [32, 64, 128],
  '32': [64, 128],
  '64': [128, 256, 512],
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
    defaultValue: '1',
    items: generateCpuItems([1, 2, 4, 8, 16, 32, 64]),
    decoratorProps: {
      label: 'Количество vCPU',
      labelTooltip: 'Виртуальный процессор',
    },
  },
  ram: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.ram`,
    defaultValue: '2',
    items: generateRamItems(CpuRamMap['1']),
    decoratorProps: {
      label: 'Объём RAM',
      labelTooltip: 'Оперативная память',
    },
    watchedControls: {
      cpu: `${prefix}.cpu`,
    },
    relateFn: ({ cpu }: { cpu: string }) => {
      const items: number[] = CpuRamMap[cpu] || [];

      return {
        items: generateRamItems(items),
      };
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

export const MYSQL_DATA_BASE_FORM_CONFIG: FormConfig = {
  ui: [
    ['rdsBdInstanceType'],
    'bdInstanceAlert',
    ['rdsCpu', 'rdsRam'],
    ['evs', 'rdsBdQuantity'],
    'eip',
    'bdReplica',
    ['obs'],
  ],
  controls: {
    rdsBdInstanceType: {
      type: CONTROL.Segmented,
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
                  defaultValue: 'SAS',
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
        defaultValue: 'SAS',
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
