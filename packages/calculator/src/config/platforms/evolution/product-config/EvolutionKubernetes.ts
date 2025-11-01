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

const NVIDIA_A100_80GB = {
  value: 'NVIDIA A100 80GB',
  label: 'NVIDIA A100 80GB',
};

const NVIDIA_H100_NVLINK_ITEM = {
  value: 'NVIDIA H100 NVLink',
  label: 'NVIDIA H100 NVLink',
};
const NVIDIA_H100_NVLINK_ITEM_PCIe = {
  value: 'NVIDIA H100 PCI',
  label: 'NVIDIA H100 PCI',
};

const NVIDIA_V100 = {
  value: 'NVIDIA V100',
  label: 'NVIDIA V100',
};

const MODEL_ITEMS = [NVIDIA_A100_80GB, NVIDIA_H100_NVLINK_ITEM, NVIDIA_H100_NVLINK_ITEM_PCIe, NVIDIA_V100];

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

const GPU_BY_MODEL: { [model: string]: number[] } = {
  [NVIDIA_A100_80GB.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_H100_NVLINK_ITEM.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_H100_NVLINK_ITEM_PCIe.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_V100.value]: [1, 2, 4, 8, 16],
};

const CPU_BY_MODEL_AND_GPU: { [model: string]: { [gpu: string]: number[] } } = {
  [NVIDIA_A100_80GB.value]: {
    '1': [20],
    '2': [40],
    '3': [60],
    '4': [80],
    '5': [100],
    '6': [120],
    '7': [140],
    '8': [160],
  },
  [NVIDIA_H100_NVLINK_ITEM.value]: {
    '1': [20],
    '2': [40],
    '3': [60],
    '4': [80],
    '5': [100],
    '6': [120],
    '7': [140],
    '8': [160],
  },
  [NVIDIA_H100_NVLINK_ITEM_PCIe.value]: {
    '1': [20],
    '2': [40],
    '3': [60],
    '4': [80],
    '5': [100],
    '6': [120],
    '7': [140],
    '8': [160],
  },
  [NVIDIA_V100.value]: {
    '1': [4],
    '2': [8],
    '4': [16],
    '8': [32],
    '16': [64],
  },
};

const RAN_BY_MODEL_AND_GPU: { [model: string]: { [gpu: string]: number[] } } = {
  [NVIDIA_A100_80GB.value]: {
    '1': [125],
    '2': [250],
    '3': [375],
    '4': [500],
    '5': [625],
    '6': [750],
    '7': [875],
    '8': [900],
  },
  [NVIDIA_H100_NVLINK_ITEM.value]: {
    '1': [186],
    '2': [372],
    '3': [558],
    '4': [744],
    '5': [930],
    '6': [1116],
    '7': [1302],
    '8': [1488],
  },
  [NVIDIA_H100_NVLINK_ITEM_PCIe.value]: {
    '1': [125],
    '2': [250],
    '3': [375],
    '4': [500],
    '5': [625],
    '6': [750],
    '7': [875],
    '8': [900],
  },
  [NVIDIA_V100.value]: {
    '1': [64],
    '2': [128],
    '4': [256],
    '8': [512],
    '16': [1024],
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
        ui: [
          'hasGpu',
          ['gpuModel'],
          'gpuCount',
          'guaranteedPart',
          ['vCpuCount', 'ramAmount'],
          ['nodeCount'],
          ['diskSize'],
        ],
        decoratorProps: {
          label: 'Рабочие узлы',
        },
        controls: {
          hasGpu: {
            type: CONTROL.Toggle,
            accessorKey: 'workerNode.hasGpu',
            defaultValue: false,
            decoratorProps: {
              label: 'Графический процессор (GPU)',
            },
          },
          gpuModel: {
            type: CONTROL.SelectSingle,
            accessorKey: 'workerNode.gpuModel',
            defaultValue: MODEL_ITEMS[0].value,
            items: MODEL_ITEMS,
            uiProps: {
              visible: false,
            },
            decoratorProps: {
              label: 'Модель GPU',
            },
            watchedControls: {
              hasGpu: 'workerNode.hasGpu',
            },
            relateFn: ({ hasGpu }) => ({
              uiProps: {
                visible: hasGpu,
              },
            }),
          },
          gpuCount: {
            type: CONTROL.Slider,
            accessorKey: 'workerNode.gpuCount',
            defaultValue: '1',
            items: GPU_BY_MODEL[0],
            decoratorProps: {
              label: 'Количество GPU',
            },
            uiProps: {
              visible: false,
              step: 1,
            },
            watchedControls: {
              hasGpu: 'workerNode.hasGpu',
              gpuModel: 'workerNode.gpuModel',
            },
            relateFn: ({ hasGpu, gpuModel }) => ({
              uiProps: {
                visible: hasGpu,
              },
              items: GPU_BY_MODEL[gpuModel],
            }),
          },
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
            watchedControls: {
              hasGpu: 'workerNode.hasGpu',
            },
            relateFn: ({ hasGpu }) => ({
              items: hasGpu ? [guaranteedPartCards[guaranteedPartCards.length - 1]] : guaranteedPartCards,
            }),
          },
          vCpuCount: {
            type: CONTROL.Slider,
            accessorKey: 'workerNode.vCpuCount',
            defaultValue: '2',
            items: [2, 4, 8],
            decoratorProps: {
              label: 'Количество ядер vCPU',
              labelTooltip: 'Виртуальные ядра',
            },
            watchedControls: {
              guaranteedPart: 'workerNode.guaranteedPart',
              hasGpu: 'workerNode.hasGpu',
              gpuModel: 'workerNode.gpuModel',
              gpuCount: 'workerNode.gpuCount',
            },
            relateFn: ({ guaranteedPart, hasGpu, gpuModel, gpuCount }) => {
              const items = hasGpu
                ? CPU_BY_MODEL_AND_GPU[gpuModel][String(gpuCount)]
                : guaranteedPartToVCpuMap?.[guaranteedPart];

              if (items?.length > 0) {
                return {
                  items,
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
              hasGpu: 'workerNode.hasGpu',
              gpuCount: 'workerNode.gpuCount',
              gpuModel: 'workerNode.gpuModel',
            },
            relateFn: ({ guaranteedPart, vCpuCoreCount, gpuModel, hasGpu, gpuCount }) => {
              const items = hasGpu
                ? RAN_BY_MODEL_AND_GPU[gpuModel][String(gpuCount)]
                : guaranteedPartVCpuToRamMap?.[guaranteedPart]?.[vCpuCoreCount];

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
