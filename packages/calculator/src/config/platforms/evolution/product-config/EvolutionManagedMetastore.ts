import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateRamItems } from '../../../utils';

export const EVOLUTION_MANAGED_METASTORE_CONFIG: FormConfig = {
  ui: [['vCpuCoreCount', 'ramAmount'], 'alert'],
  controls: {
    alert: {
      type: CONTROL.Alert,
      uiProps: {
        description:
          'Для хранения информации об операциях инстанс можно подключить к внешнему S3 или к Evolution Object Storage',
      },
      accessorKey: 'free',
    },
    vCpuCoreCount: {
      type: CONTROL.Segmented,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '2',
      items: generateCpuItems([2]),
      decoratorProps: {
        label: 'Количество ядер vCPU',
        labelTooltip: 'Количество ядер vCPU',
      },
    },
    ramAmount: {
      type: CONTROL.Segmented,
      accessorKey: 'ramAmount',
      defaultValue: '4',
      items: generateRamItems([4]),
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      uiProps: {
        disabled: true,
      },
    },
  },
};
