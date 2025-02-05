import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateInstanceConfigItems, generateRamItems } from '../../../utils';

const nodeConfigItems = generateInstanceConfigItems([
  [2, 4],
  [4, 8],
  [8, 16],
  [16, 32],
]);

const masterNodeCount = generateCpuItems([1, 3, 5]);

const GuaranteedPartItem = {
  '10': '10',
  '30': '30',
  '100': '100',
};

const guaranteedPartCards = [
  {
    value: GuaranteedPartItem[10],
    label: '10% доля',
    description: 'Для тестирования и несложных приложений',
  },
  {
    value: GuaranteedPartItem[30],
    label: '30% доля',
    description: 'Для стандартной рабочей нагрузки',
  },
  {
    value: GuaranteedPartItem[100],
    label: '100% доля',
    description: 'Для высоконагруженных сервисов',
  },
];

const guaranteedPartToVCpuMap = {
  [GuaranteedPartItem[10]]: [2, 4, 8],
  [GuaranteedPartItem[30]]: [2, 4, 8, 16, 24, 32],
  [GuaranteedPartItem[100]]: [2, 4, 8, 16, 24, 32],
};

const guaranteedPartVCpuToRamMap: Record<string, Record<string, number[]>> = {
  [GuaranteedPartItem[10]]: {
    '2': [4],
    '4': [8, 16, 32],
    '8': [16, 32],
  },
  [GuaranteedPartItem[30]]: {
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64],
    '16': [32, 64],
    '24': [48],
    '32': [64],
  },
  [GuaranteedPartItem[100]]: {
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64, 128],
    '16': [32, 64, 128, 256],
    '24': [48],
    '32': [64, 128, 256],
  },
};

export const EVOLUTION_KUBERNETES_FORM_CONFIG: FormConfig = {
  ui: ['masterNode', 'workerNode', 'bindingPublicIpAddress'],
  controls: {
    masterNode: {
      ui: [['masterNodeConfig', 'masterNodeCount']],
      type: CONTROL.Object,
      decoratorProps: {
        label: 'Мастер-узел',
      },
      controls: {
        masterNodeConfig: {
          type: CONTROL.SelectSingle,
          accessorKey: 'masterNode.nodeConfig',
          items: nodeConfigItems,
          decoratorProps: {
            label: 'Конфигурация мастер-узла',
          },
          defaultValue: '2 4',
        },
        masterNodeCount: {
          type: CONTROL.Segmented,
          accessorKey: 'masterNode.nodeCount',
          defaultValue: masterNodeCount[0].value,
          items: masterNodeCount,
          decoratorProps: {
            label: 'Количество мастер-узлов',
          },
        },
      },
    },
    workerNode: {
      type: CONTROL.ToggleObject,
      switchKey: 'workerNodeNeeded',
      decoratorProps: {
        label: 'Узлы для запуска контейнера',
      },
      control: {
        type: CONTROL.Object,
        ui: ['guaranteedPart', ['vCpuCount', 'ramAmount'], ['nodeCount'], ['diskSize']],
        decoratorProps: {
          label: 'Рабочие узлы',
        },
        controls: {
          guaranteedPart: {
            type: CONTROL.Carousel,
            accessorKey: 'workerNode.guaranteedPart',
            defaultValue: guaranteedPartCards[0].value,
            items: guaranteedPartCards,
            decoratorProps: {
              label: 'Гарантированная доля vCPU',
              labelTooltip:
                'Гарантированная доля vCPU определяет долю использования процессора, выделенную для виртуальной машины. Этот параметр известен также как переподписка vCPU (vCPU Overcommitment). При 100% гарантируется использование полной мощности виртуальных ядер процессора хоста виртуализации, выделенных виртуальной машине.',
            },
          },
          vCpuCount: {
            type: CONTROL.Segmented,
            accessorKey: 'workerNode.vCpuCount',
            defaultValue: '2',
            items: generateCpuItems([2, 4, 8]),
            decoratorProps: {
              label: 'Количество ядер vCPU',
              labelTooltip: 'Виртуальные ядра',
            },
            watchedControls: { guaranteedPart: 'workerNode.guaranteedPart' },
            relateFn: ({ guaranteedPart }) => {
              const items = guaranteedPartToVCpuMap?.[guaranteedPart];

              if (items?.length > 0) {
                return {
                  items: generateCpuItems(items),
                };
              }
            },
          },
          ramAmount: {
            type: CONTROL.Segmented,
            accessorKey: 'workerNode.ramAmount',
            defaultValue: '4',
            items: generateRamItems([4]),
            decoratorProps: {
              label: 'Количество оперативной памяти RAM',
            },
            watchedControls: {
              guaranteedPart: 'workerNode.guaranteedPart',
              vCpuCoreCount: 'workerNode.vCpuCount',
            },
            relateFn: ({ guaranteedPart, vCpuCoreCount }) => {
              const items = guaranteedPartVCpuToRamMap?.[guaranteedPart]?.[vCpuCoreCount];

              if (items?.length > 0) {
                return {
                  items: generateRamItems(items),
                };
              }
            },
          },
          nodeCount: {
            type: CONTROL.Stepper,
            accessorKey: 'workerNode.nodeCount',
            defaultValue: 1,
            decoratorProps: {
              label: 'Количество узлов',
            },
            uiProps: {
              min: 1,
              max: 50,
              postfix: 'Шт',
            },
          },
          diskSize: {
            type: CONTROL.Stepper,
            accessorKey: 'workerNode.diskSize',
            defaultValue: 10,
            decoratorProps: {
              label: 'Диск',
            },
            uiProps: {
              min: 10,
              max: 64,
              postfix: 'ГБ',
            },
          },
        },
      },
    },
    bindingPublicIpAddress: {
      type: CONTROL.Toggle,
      accessorKey:
        // Так специально
        'bindingPublickIpAddress',
      defaultValue: false,
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
    },
  },
};
