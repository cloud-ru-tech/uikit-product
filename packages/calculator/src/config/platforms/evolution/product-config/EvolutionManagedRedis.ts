import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateRamItems, getDisk } from '../../../utils';
import { DeploymentMode, deploymentModes } from '../constants';

const CPU = [2, 4, 8, 16];
const RAM = [4, 8, 16, 32, 64, 128];

const DISK_CAPACITY_MIN = 10;
const DISK_CAPACITY_MAX = 16384;

const cpuToRamMap: Record<string, number[]> = {
  '2': [4, 8, 16],
  '4': [16, 32, 64],
  '8': [32, 64, 128],
  '16': [64, 128],
};

const ramToMinDisk: Record<string, number> = {
  '4': DISK_CAPACITY_MIN,
  '8': 40,
  '16': 40,
  '32': 64,
  '64': 128,
  '128': 256,
};

const valueMasterReplica = 'Master/Replica';
const valueStandalone = 'Standalone';

const hostsByStandalone = [1];
const hostsByMasterReplica = [3];

const hostsByInstantType: { [key: string]: number[] } = {
  [valueStandalone]: hostsByStandalone,
  [valueMasterReplica]: hostsByMasterReplica,
};

const instanceTypePartCards = [
  {
    value: valueStandalone,
    label: valueStandalone,
    description: 'Конфигурация с одним хостом',
  },
  {
    value: valueMasterReplica,
    label: valueMasterReplica,
    description: 'Отказоустойчивый кластер высокой доступности',
  },
];

const getMinMaxDiskSize = ({ ramAmount }: { ramAmount: string }) => ({
  uiProps: {
    min: ramToMinDisk[ramAmount] || DISK_CAPACITY_MIN,
    max: DISK_CAPACITY_MAX,
  },
});

export const EVOLUTION_MANAGED_REDIS_CONFIG: FormConfig = {
  ui: ['deploymentMode', 'instanceType', ['vCpuCoreCount', 'ramAmount'], 'hostQuantity', ['systemDisk']],
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
            ['hostQuantity', hostsByStandalone[0].toString()],
          ]);
        } else {
          setValue([
            ['instanceType', value],
            ['hostQuantity', hostsByMasterReplica[0].toString()],
          ]);
        }
      },
    },
    vCpuCoreCount: {
      type: CONTROL.Segmented,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '2',
      items: generateCpuItems(CPU),
      decoratorProps: {
        label: 'Количество ядер vCPU',
      },
    },

    ramAmount: {
      type: CONTROL.Segmented,
      accessorKey: 'ramAmount',
      watchedControls: { vCpuCoreCount: 'vCpuCoreCount' },
      defaultValue: '4',
      items: generateRamItems(RAM),
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      relateFn: ({ vCpuCoreCount }: { vCpuCoreCount: string }) => {
        const itemsByCpu = cpuToRamMap[vCpuCoreCount];

        if (itemsByCpu?.length > 0) {
          return {
            items: generateRamItems(itemsByCpu),
          };
        }
      },
    },
    hostQuantity: {
      type: CONTROL.Segmented,
      accessorKey: 'hostQuantity',
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
        defaultValue: DISK_CAPACITY_MIN,
        uiProps: {
          min: DISK_CAPACITY_MIN,
          max: DISK_CAPACITY_MAX,
        },
        watchedControls: { ramAmount: 'ramAmount' },
        relateFn: getMinMaxDiskSize,
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
