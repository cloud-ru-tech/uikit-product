import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateRamItems, getDisk } from '../../../utils';

const valueSingleNode = 'Single-node';
const valueSingleShard = 'Single-shard';
const valueMultiShard = 'Multi-shard';

const CPU = [4, 8];
const RAM = [16, 32];

const cpuToRamMap: Record<string, number[]> = {
  '4': [16],
  '8': [32],
};

const cpuConfigItems: {
  [key: string]: {
    value: string;
    label: string;
  }[];
} = {
  [valueSingleNode]: generateCpuItems(CPU),
  [valueSingleShard]: generateCpuItems(CPU),
  [valueMultiShard]: generateCpuItems([CPU[0]]),
};

const ramConfigItems: {
  [key: string]: number[];
} = {
  [valueSingleNode]: RAM,
  [valueSingleShard]: RAM,
  [valueMultiShard]: [RAM[0]],
};

const instanceTypePartCards = [
  {
    value: valueSingleNode,
    label: valueSingleNode,
    description: 'Шард с одной репликой',
  },
  {
    value: valueSingleShard,
    label: valueSingleShard,
    description: 'Шард с репликами',
  },
  {
    value: valueMultiShard,
    label: valueMultiShard,
    description: 'Несколько шардов с репликами',
  },
];

const shardQuantityItemsByInstantType: { [key: string]: number[] } = {
  [valueSingleNode]: [1],
  [valueSingleShard]: [1],
  [valueMultiShard]: [3],
};

const hostQuantityItemsByInstantType: { [key: string]: number[] } = {
  [valueSingleNode]: [1],
  [valueSingleShard]: [3],
  [valueMultiShard]: [3],
};

export const EVOLUTION_MANAGED_CLICKHOUSE_CONFIG: FormConfig = {
  ui: ['instanceType', ['vCpuCoreCount', 'ramAmount'], ['shardQuantity', 'hostQuantity'], ['systemDisk']],
  controls: {
    instanceType: {
      decoratorProps: {
        label: 'Тип инстанса',
      },
      type: CONTROL.Carousel,
      accessorKey: 'instanceType',
      defaultValue: instanceTypePartCards[0].value,
      items: instanceTypePartCards,
      onChangeFn: (value, setValue) => {
        if (value === valueMultiShard) {
          setValue([
            ['instanceType', value],
            ['shardQuantity', '3'],
            ['hostQuantity', '3'],
          ]);
        } else if (value === valueSingleShard) {
          setValue([
            ['instanceType', value],
            ['shardQuantity', '1'],
            ['hostQuantity', '3'],
          ]);
        } else {
          setValue([
            ['instanceType', value],
            ['shardQuantity', '1'],
            ['hostQuantity', '1'],
          ]);
        }
      },
    },
    vCpuCoreCount: {
      type: CONTROL.Segmented,
      accessorKey: 'vCpuCoreCount',
      watchedControls: { instanceType: 'instanceType' },
      defaultValue: '4',
      items: generateCpuItems(CPU),
      decoratorProps: {
        label: 'Количество ядер vCPU',
      },
      relateFn: ({ instanceType }) => {
        const items = cpuConfigItems[instanceType];

        if (items?.length > 0) {
          return { items };
        }
      },
    },

    ramAmount: {
      type: CONTROL.Segmented,
      accessorKey: 'ramAmount',
      watchedControls: { instanceType: 'instanceType', vCpuCoreCount: 'vCpuCoreCount' },
      defaultValue: '16',
      items: generateRamItems(RAM),
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      relateFn: ({ instanceType, vCpuCoreCount }) => {
        const itemsByInstanceType = ramConfigItems[instanceType];
        const itemsByCpu = new Set(cpuToRamMap[vCpuCoreCount as string]);

        if (itemsByInstanceType?.length > 0) {
          const resolvedItems = itemsByInstanceType.filter(item => itemsByCpu.has(item));
          return {
            items: generateRamItems(resolvedItems),
          };
        }
      },
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
    hostQuantity: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество хостов',
      },
      defaultValue: '1',
      items: generateCpuItems([1]),
      accessorKey: 'hostQuantity',
      watchedControls: { instanceType: 'instanceType' },
      relateFn: ({ instanceType }) => {
        const items = hostQuantityItemsByInstantType[instanceType];

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
        accessorKey: 'diskType',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),
  },
};
