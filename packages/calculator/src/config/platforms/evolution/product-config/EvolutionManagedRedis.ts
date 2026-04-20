import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateInstanceConfigItems, getDisk } from '../../../utils';
import { DeploymentMode, deploymentModes } from '../constants';

const nodeConfigItems = generateInstanceConfigItems([
  [2, 4],
  [4, 16],
  [8, 32],
]);

const valueMasterReplica = 'Master/Replica';
const valueStandalone = 'Standalone';

const hostsByStandalone = [1];
const hostsByMasterReplica = [3];

const shardQuantityItemsByInstantType: { [key: string]: number[] } = {
  [valueStandalone]: [1],
  [valueMasterReplica]: [1],
};

const hostsByInstantType: { [key: string]: number[] } = {
  [valueStandalone]: hostsByStandalone,
  [valueMasterReplica]: hostsByMasterReplica,
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
];

export const EVOLUTION_MANAGED_REDIS_CONFIG: FormConfig = {
  ui: ['deploymentMode', 'instanceType', 'masterNodeConfig', ['hostsQuantity', 'shardQuantity'], ['systemDisk']],
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
            ['hostsQuantity', hostsByStandalone[0].toString()],
          ]);
        } else {
          setValue([
            ['instanceType', value],
            ['hostsQuantity', hostsByMasterReplica[0].toString()],
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
      accessorKey: 'shardQuantity',
      defaultValue: '1',
      decoratorProps: {
        label: 'Количество шардов',
      },
      items: generateCpuItems([1]),
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
    hostsQuantity: {
      type: CONTROL.Segmented,
      accessorKey: 'hostsQuantity',
      defaultValue: '1',
      decoratorProps: {
        label: 'Количество хостов',
      },
      items: generateCpuItems([...hostsByStandalone, ...hostsByMasterReplica]),
      watchedControls: { instanceType: 'instanceType' },
      relateFn: ({ instanceType }) => {
        const items = hostsByInstantType[instanceType];

        if (items?.length > 0) {
          return {
            items: generateCpuItems(items),
          };
        }
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
