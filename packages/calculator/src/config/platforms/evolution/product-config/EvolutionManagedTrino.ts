import { CONTROL, FormConfig } from '../../../../components';
import { generateRamItems } from '../../../utils';
import { guaranteedPartVCpuToRamMap } from '../constants';

export const EVOLUTION_MANAGED_TRINO_CONFIG: FormConfig = {
  ui: [['vCpuCoreCount', 'ramAmount'], ['nodeCount']],
  controls: {
    vCpuCoreCount: {
      type: CONTROL.Slider,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '2',
      items: [2, 4, 8, 16, 24, 32, 64],
      decoratorProps: {
        label: 'Количество ядер vCPU',
        labelTooltip: 'Количество ядер vCPU',
      },
    },
    ramAmount: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      defaultValue: '1',
      items: generateRamItems([1, 2]),
      accessorKey: 'ramAmount',
      watchedControls: {
        vCpuCoreCount: 'vCpuCoreCount',
      },
      relateFn: ({ vCpuCoreCount }) => {
        const items = guaranteedPartVCpuToRamMap?.['100']?.[vCpuCoreCount];

        if (items?.length > 0) {
          return {
            items: generateRamItems(items),
          };
        }
      },
    },
    nodeCount: {
      type: CONTROL.Stepper,
      accessorKey: 'nodeQuantity',
      defaultValue: 2,
      decoratorProps: {
        label: 'Количество узлов',
      },
      uiProps: {
        min: 2,
        max: 10,
        postfix: 'Шт',
      },
    },
  },
};
