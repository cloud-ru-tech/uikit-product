import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateRamItems, getDisk } from '../../../utils';

const CPU = [2, 4, 8, 16];
const RAM = [4, 8, 16, 32, 64, 128];

const cpuToRamMap: Record<string, number[]> = {
  '2': [4, 8, 16],
  '4': [8, 16, 32],
  '8': [32, 64],
  '16': [64, 128],
};

const brokerQuantity = [1, 3, 5, 7];

export const EVOLUTION_MANAGED_KAFKA_CONFIG: FormConfig = {
  ui: [['vCpuCoreCount', 'ramAmount'], ['brokerQuantity'], ['systemDisk']],
  controls: {
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
      relateFn: ({ vCpuCoreCount }) => {
        const itemsByCpu = cpuToRamMap[vCpuCoreCount as string];

        if (itemsByCpu?.length > 0) {
          return {
            items: generateRamItems(itemsByCpu),
          };
        }
      },
    },
    brokerQuantity: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество брокеров',
      },
      defaultValue: '1',
      items: generateCpuItems(brokerQuantity),
      accessorKey: 'brokerQuantity',
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
