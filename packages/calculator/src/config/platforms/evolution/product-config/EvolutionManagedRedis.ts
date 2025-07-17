import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateInstanceConfigItems, getDisk } from '../../../utils';
import { DeploymentMode, deploymentModes } from '../constants';

const nodeConfigItems = generateInstanceConfigItems([
  [2, 4],
  [4, 16],
  [8, 32],
]);

const valueMasterReplica = 'Master/Replica';
const valueCluster = 'Cluster';
const valueStandalone = 'Standalone';

const DEFAULT_ITEMS_SLIDER = [1, 2, 3, 4, 5];

const shardQuantityItemsByInstantType: { [key: string]: number[] } = {
  [valueStandalone]: [1],
  [valueMasterReplica]: [1],
  [valueCluster]: [3, 4, 5],
};

type ReplicaQuantityItemsByInstant = {
  values: number[];
  label: string;
  visible?: boolean;
};

const replicaQuantityItemsByInstantType: { [key: string]: ReplicaQuantityItemsByInstant } = {
  [valueStandalone]: { values: [0], label: 'Количество реплик', visible: false },
  [valueMasterReplica]: { values: DEFAULT_ITEMS_SLIDER, label: 'Количество реплик' },
  [valueCluster]: { values: DEFAULT_ITEMS_SLIDER, label: 'Количество реплик на шард' },
};

const instanceTypePartCards = [
  {
    value: valueStandalone,
    label: valueStandalone,
    description: 'Одноузловая конфигурация',
  },
  {
    value: valueMasterReplica,
    label: valueMasterReplica,
    description: 'Отказоустойчивый кластер высокой доступности',
  },
  {
    value: valueCluster,
    label: valueCluster,
    description: 'Отказоустойчивый кластер высокой доступности с шардированием',
  },
];

export const EVOLUTION_MANAGED_REDIS_CONFIG: FormConfig = {
  ui: ['deploymentMode', 'instanceType', ['masterNodeConfig', 'shardQuantity'], ['replicaQuantity'], ['systemDisk']],
  controls: {
    deploymentMode: {
      type: CONTROL.Carousel,
      accessorKey: 'deploymentMode',
      defaultValue: DeploymentMode.Business,
      uiProps: {
        visible: false,
      },
      items: deploymentModes,
      decoratorProps: {
        label: 'Режим развертывания',
        labelTooltip: 'Режимы развертывания кластера отличаются объемом ресурсов и уровнем безопасности',
      },
    },
    instanceType: {
      decoratorProps: {
        label: 'Тип инстанса',
      },
      type: CONTROL.Carousel,
      accessorKey: 'instanceType',
      defaultValue: instanceTypePartCards[0].value,
      items: instanceTypePartCards,
      onChangeFn: (value, setValue) => {
        if (value === valueStandalone) {
          setValue([
            ['instanceType', value],
            ['replicaQuantity', '0'],
          ]);
        } else {
          setValue([
            ['instanceType', value],
            ['replicaQuantity', '1'],
          ]);
        }
      },
    },
    masterNodeConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: 'masterNode.nodeConfig',
      items: nodeConfigItems,
      decoratorProps: {
        label: 'Конфигурация',
      },
      defaultValue: '2 4',
    },
    shardQuantity: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество шардов',
      },
      defaultValue: '1',
      items: generateCpuItems([1]),
      accessorKey: 'shardQuantity',
      watchedControls: { instanceType: 'instanceType' },
      relateFn: ({ instanceType }) => {
        const items = shardQuantityItemsByInstantType[instanceType];

        if (items?.length > 0) {
          return {
            items: generateCpuItems(items),
          };
        }
      },
    },
    replicaQuantity: {
      type: CONTROL.Slider,
      accessorKey: 'replicaQuantity',
      defaultValue: '0',
      items: DEFAULT_ITEMS_SLIDER,
      decoratorProps: {
        label: 'Количество реплик',
      },
      watchedControls: { instanceType: 'instanceType' },
      relateFn: ({ instanceType }) => {
        const item = replicaQuantityItemsByInstantType[instanceType];

        return {
          items: item.values,
          uiProps: {
            visible: item.visible,
          },
          decoratorProps: {
            label: item.label,
          },
        };
      },
    },
    systemDisk: getDisk({
      space: {
        label: 'Диск',
        accessorKey: 'diskCapacity',
        defaultValue: 40,
        uiProps: {
          min: 40,
          max: 16_384,
        },
      },
      specification: {
        accessorKey: 'specification',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),
  },
};
