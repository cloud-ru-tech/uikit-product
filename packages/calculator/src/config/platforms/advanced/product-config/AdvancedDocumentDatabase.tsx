import {
  CONTROL,
  FormConfig,
  ObjectControl,
  SegmentedControl,
  StepperControl,
  ToggleObjectControl,
} from '../../../../components';
import styles from '../../../styles.module.scss';
import { generateCpuItems, generateRamItems, getDisk, getEip, getObs } from '../../../utils';

const DbClassTypeItem = {
  Cluster: 'cluster',
  Replica: 'replica',
};

const dbClassTypeItems = [
  {
    value: DbClassTypeItem.Cluster,
    label: 'Кластер',
  },
  {
    value: DbClassTypeItem.Replica,
    label: 'Реплика',
  },
];

const CpuRamMap: Record<string, number[]> = {
  '2': [4, 8],
  '4': [8, 16],
  '8': [16, 32],
  '16': [32, 64],
  '32': [64, 128],
  '64': [128, 256],
};

type GetRdsControlsProps = {
  prefix: string;
};

const getNodeControls = ({
  prefix,
}: GetRdsControlsProps): {
  cpu: SegmentedControl;
  ram: SegmentedControl;
  counter: StepperControl;
  eip: ToggleObjectControl;
} => ({
  cpu: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.cpu`,
    defaultValue: '2',
    items: generateCpuItems([2, 4, 8, 16, 32, 64]),
    decoratorProps: {
      label: 'Количество vCPU',
    },
  },
  ram: {
    type: CONTROL.Segmented,
    accessorKey: `${prefix}.ram`,
    defaultValue: '4',
    items: generateRamItems([4, 8]),
    decoratorProps: {
      label: 'Объём RAM',
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
  counter: {
    type: CONTROL.Stepper,
    accessorKey: `${prefix}.counter`,
    defaultValue: 2,
    decoratorProps: {
      label: 'Количество Node',
    },
    uiProps: {
      min: 2,
      max: 16,
      postfix: 'Шт',
    },
  },
  eip: getEip({
    trafficKey: `${prefix}.eip.traffic`,
    velocityKey: `${prefix}.eip.velocity`,
    specificationKey: `${prefix}.eip.specification`,
    switchKey: `${prefix}.eipIsNeeded`,
  }),
});

const mongosNodeControls = getNodeControls({ prefix: 'mongosNode' });
const shardNodeControls = getNodeControls({ prefix: 'shardNode' });
const configNodeControls = getNodeControls({ prefix: 'configNode' });

const replicaNodeControls = getNodeControls({ prefix: 'replica' });

const getReplica = (): ObjectControl => ({
  type: CONTROL.Object,
  ui: [
    ['cpu', 'ram'],
    ['disk', 'storage'],
  ],
  controls: {
    cpu: replicaNodeControls.cpu,
    ram: replicaNodeControls.ram,
    disk: getDisk({
      space: {
        accessorKey: 'replica.diskSpace',
        defaultValue: 10,
        uiProps: {
          min: 10,
          max: 2000,
        },
      },
      specification: {
        defaultValue: 'SSD',
        accessorKey: 'replica.specification',
        uiProps: {
          disabled: true,
        },
      },
    }),
    storage: getObs({
      space: {
        accessorKey: 'replica.storage.space',
        defaultValue: 1,
        uiProps: {
          min: 1,
        },
      },
      units: {
        accessorKey: 'replica.storage.unitsOfCalculation',
      },
    }),
  },
});

export const DOCUMENT_DATABASE_FORM_CONFIG: FormConfig = {
  ui: [['dbClassType'], 'clusterDbClassTypeObj', 'replicaDbClassTypeObj'],
  controls: {
    dbClassType: {
      type: CONTROL.Segmented,
      accessorKey: 'dbClassType',
      items: dbClassTypeItems,
      defaultValue: DbClassTypeItem.Cluster,
      decoratorProps: {
        label: 'Тип базы данных',
        labelTooltip: (
          <ul className={styles.tip}>
            <li>
              Каждый кластер DDS представляет собой независимую базу данных документов. Сегментированный кластер состоит
              из ноды конфигурации и нескольких нод mongos и shard
            </li>
            <li>
              Набор реплик состоит из совокупности процессов mongod. Это набор нод, которые помогают обеспечить
              резервирование и надежность данных
            </li>
          </ul>
        ),
      },
    },
    clusterDbClassTypeObj: {
      type: CONTROL.Object,
      ui: ['mongosNode', 'shardNode', 'configNode', 'replica'],
      controls: {
        mongosNode: {
          type: CONTROL.Object,
          ui: [['cpu', 'ram'], ['counter'], 'eip'],
          decoratorProps: {
            label: 'Mongos Node',
            labelTooltip:
              'Каждый mongos представляет собой отдельную ноду, которая пересылает запросы на чтение и запись данных',
          },
          controls: {
            cpu: mongosNodeControls.cpu,
            ram: mongosNodeControls.ram,
            counter: {
              ...mongosNodeControls.counter,
              decoratorProps: {
                label: 'Количество Mongos Node',
              },
            },
            eip: mongosNodeControls.eip,
          },
        },
        shardNode: {
          type: CONTROL.Object,
          ui: [['cpu', 'ram'], ['disk', 'counter'], 'eip'],
          decoratorProps: {
            label: 'Shard Node',
            labelTooltip: 'Каждый шард (shard) представляет собой набор реплик из трех нод',
          },
          controls: {
            cpu: shardNodeControls.cpu,
            ram: shardNodeControls.ram,
            counter: {
              ...shardNodeControls.counter,
              decoratorProps: {
                label: 'Количество Shard Node',
                labelTooltip: 'Каждому Shard Node присваивается отдельный системный диск',
              },
            },
            eip: shardNodeControls.eip,
            disk: getDisk({
              space: {
                accessorKey: 'shardNode.diskSpace',
                defaultValue: 10,
                uiProps: {
                  min: 10,
                  max: 1000,
                },
              },
              specification: {
                defaultValue: 'SSD',
                accessorKey: 'shardNode.specification',
                uiProps: {
                  disabled: true,
                },
                onChangeFn: () => {},
              },
            }),
          },
        },
        configNode: {
          type: CONTROL.Object,
          ui: [['cpu', 'ram'], ['disk', 'storage'], 'eip'],
          decoratorProps: {
            label: 'Config Node',
            labelTooltip:
              'Нода конфигурации (config) является необходимой частью экземпляра кластера, а также развертывается как набор реплик. Она хранит данные конфигурации экземпляра',
          },
          controls: {
            cpu: {
              ...configNodeControls.cpu,
              defaultValue: '2',
              items: generateCpuItems([2]),
              relateFn: undefined,
              watchedControls: undefined,
            },
            ram: {
              ...configNodeControls.ram,
              defaultValue: '4',
              items: generateRamItems([4]),
              relateFn: undefined,
              watchedControls: undefined,
            },
            disk: getDisk({
              space: {
                accessorKey: 'configNode.diskSpace',
                defaultValue: 20,
                uiProps: {
                  min: 20,
                  max: 20,
                  disabled: true,
                },
              },
              specification: {
                defaultValue: 'SSD',
                accessorKey: 'configNode.specification',
                uiProps: {
                  disabled: true,
                },
                onChangeFn: () => {},
              },
            }),
            storage: getObs({
              space: {
                accessorKey: 'configNode.storage.space',
                defaultValue: 1,
                uiProps: {
                  min: 1,
                },
              },
              units: {
                accessorKey: 'configNode.storage.unitsOfCalculation',
              },
            }),

            eip: mongosNodeControls.eip,
          },
        },
        replica: {
          type: CONTROL.ToggleObject,
          switchKey: 'replicaIsNeeded',
          control: getReplica(),
          decoratorProps: {
            label: 'Реплика',
          },
        },
      },
      watchedControls: { dbClassType: 'dbClassType' },
      relateFn: ({ dbClassType }) => {
        if (dbClassType === DbClassTypeItem.Replica) {
          return {
            visible: false,
          };
        }
      },
    },
    replicaDbClassTypeObj: {
      type: CONTROL.Object,
      ui: ['replica'],
      controls: {
        replica: getReplica(),
      },
      watchedControls: { dbClassType: 'dbClassType' },
      relateFn: ({ dbClassType }) => {
        if (dbClassType !== DbClassTypeItem.Replica) {
          return {
            visible: false,
          };
        }
      },
    },
  },
};
