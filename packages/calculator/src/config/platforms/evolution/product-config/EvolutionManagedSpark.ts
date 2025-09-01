import { CONTROL, FormConfig } from '../../../../components';
import { generateRamItems } from '../../../utils';

const VCPU_CORE_ITEMS_WITHOUT_GPU = [4, 8, 16];

const VCPU_NO_MODEL_GPU: { [key: string]: number[] } = {
  '4': [8, 16, 32, 64],
  '8': [16, 32, 64, 128],
  '16': [32, 64],
  '24': [32],
};

const NVIDIA_H100_NVLINK_ITEM = {
  value: 'NVIDIA H100 NVLink',
  label: 'NVIDIA H100 NVLink',
};

const NVIDIA_H100_NVLINK_ITEM_WITHOUT = {
  value: 'NVIDIA H100 PCI without NVLink',
  label: 'NVIDIA H100 PCI без NVLink',
};

const NVIDIA_V100 = {
  value: 'NVIDIA V100',
  label: 'NVIDIA V100',
};

const NVIDIA_A100_WITHOUT = {
  value: 'NVIDIA A100 PCI without NVLink',
  label: 'NVIDIA A100 80Гб PCI без NVLink',
};

const MODEL_ITEMS = [NVIDIA_H100_NVLINK_ITEM_WITHOUT, NVIDIA_V100, NVIDIA_H100_NVLINK_ITEM, NVIDIA_A100_WITHOUT];

const GPU_BY_MODEL: { [model: string]: number[] } = {
  [NVIDIA_H100_NVLINK_ITEM.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_H100_NVLINK_ITEM_WITHOUT.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_V100.value]: [1, 2, 4, 8, 16],
  [NVIDIA_A100_WITHOUT.value]: [1, 2, 3, 4, 5, 6, 7, 8],
};

const CPU_BY_MODEL_AND_GPU: { [model: string]: { [gpu: string]: number[] } } = {
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
  [NVIDIA_H100_NVLINK_ITEM_WITHOUT.value]: {
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
  [NVIDIA_A100_WITHOUT.value]: {
    '1': [20],
    '2': [40],
    '3': [60],
    '4': [80],
    '5': [100],
    '6': [120],
    '7': [140],
    '8': [160],
  },
};

const RAM_BY_MODEL_AND_CPU: { [model: string]: { [cpu: string]: number[] } } = {
  [NVIDIA_H100_NVLINK_ITEM.value]: {
    '20': [186],
    '40': [372],
    '60': [558],
    '80': [744],
    '100': [930],
    '120': [1116],
    '140': [1302],
    '160': [1488],
  },
  [NVIDIA_H100_NVLINK_ITEM_WITHOUT.value]: {
    '20': [125],
    '40': [250],
    '60': [375],
    '80': [500],
    '100': [625],
    '120': [750],
    '140': [875],
    '160': [1000],
  },
  [NVIDIA_V100.value]: {
    '4': [64],
    '8': [128],
    '16': [256],
    '32': [512],
    '64': [1024],
  },
  [NVIDIA_A100_WITHOUT.value]: {
    '20': [125],
    '40': [250],
    '60': [375],
    '80': [500],
    '100': [625],
    '120': [750],
    '140': [875],
    '160': [1000],
  },
};
const MAX_SIZE_NODE_COUNT_WITH_GPU: {
  [gpuModel: string]: {
    [vcpu: string]: {
      [ram: string]: number;
    };
  };
} = {
  [NVIDIA_H100_NVLINK_ITEM.value]: {
    '20': {
      '186': 7,
    },
    '40': {
      '372': 7,
    },
    '60': {
      '558': 7,
    },
    '100': {
      '930': 7,
    },
    '120': {
      '1116': 7,
    },
    '140': {
      '1302': 7,
    },
    '160': {
      '1488': 7,
    },
  },
  [NVIDIA_H100_NVLINK_ITEM_WITHOUT.value]: {
    '20': {
      '125': 7,
    },
    '40': {
      '250': 7,
    },
    '60': {
      '375': 7,
    },
    '80': {
      '500': 7,
    },
    '100': {
      '625': 7,
    },
    '120': {
      '750': 7,
    },
    '140': {
      '875': 7,
    },
    '160': {
      '1000': 7,
    },
  },
  [NVIDIA_V100.value]: {
    '4': {
      '64': 7,
    },
    '8': {
      '128': 7,
    },
    '16': {
      '256': 7,
    },
    '32': {
      '512': 7,
    },
    '64': {
      '1024': 7,
    },
  },
  [NVIDIA_A100_WITHOUT.value]: {
    '20': {
      '125': 7,
    },
    '40': {
      '250': 7,
    },
    '60': {
      '375': 7,
    },
    '80': {
      '500': 7,
    },
    '100': {
      '625': 7,
    },
  },
};

export const EVOLUTION_MANAGED_SPARK_CONFIG: FormConfig = {
  ui: ['hasGpu', ['gpuModel'], 'gpuCount', ['vCpuCoreCount', 'ramAmount'], ['nodeCount']],
  controls: {
    hasGpu: {
      type: CONTROL.Toggle,
      accessorKey: 'hasGpu',
      defaultValue: false,
      decoratorProps: {
        label: 'Графический процессор (GPU)',
      },
    },
    gpuModel: {
      type: CONTROL.SelectSingle,
      accessorKey: 'gpuModel',
      defaultValue: MODEL_ITEMS[0].value,
      items: MODEL_ITEMS,
      uiProps: {
        visible: false,
      },
      decoratorProps: {
        label: 'Модель GPU',
      },
      watchedControls: {
        hasGpu: 'hasGpu',
      },
      relateFn: ({ hasGpu }) => ({
        uiProps: {
          visible: hasGpu,
        },
      }),
    },
    gpuCount: {
      type: CONTROL.Slider,
      accessorKey: 'gpuCount',
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
        hasGpu: 'hasGpu',
        gpuModel: 'gpuModel',
      },
      relateFn: ({ hasGpu, gpuModel }) => ({
        uiProps: {
          visible: hasGpu,
        },
        items: GPU_BY_MODEL[gpuModel],
      }),
    },
    vCpuCoreCount: {
      type: CONTROL.Slider,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '4',
      items: VCPU_CORE_ITEMS_WITHOUT_GPU,
      decoratorProps: {
        label: 'Количество ядер vCPU',
      },
      uiProps: {
        visible: true,
        step: 1,
      },
      watchedControls: {
        hasGpu: 'hasGpu',
        gpuModel: 'gpuModel',
        gpuCount: 'gpuCount',
      },
      relateFn: ({ hasGpu, gpuModel, gpuCount }) => ({
        items: !hasGpu ? VCPU_CORE_ITEMS_WITHOUT_GPU : CPU_BY_MODEL_AND_GPU[gpuModel][String(gpuCount)],
      }),
    },
    ramAmount: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      defaultValue: '1',
      items: generateRamItems(VCPU_NO_MODEL_GPU['4']),
      accessorKey: 'ramAmount',
      watchedControls: {
        vCpuCoreCount: 'vCpuCoreCount',
        hasGpu: 'hasGpu',
        gpuModel: 'gpuModel',
      },
      relateFn: ({ vCpuCoreCount, hasGpu, gpuModel }) => {
        if (!hasGpu) {
          const ramWithoutGPU = VCPU_NO_MODEL_GPU[vCpuCoreCount];
          if (!ramWithoutGPU) {
            const defaultItems = Object.values(VCPU_NO_MODEL_GPU)[0];
            return {
              items: generateRamItems(defaultItems),
            };
          }
          return {
            items: generateRamItems(ramWithoutGPU),
          };
        }
        const ramByGPU = RAM_BY_MODEL_AND_CPU[gpuModel][String(vCpuCoreCount)];
        if (!ramByGPU) {
          const defaultItems = Object.values(RAM_BY_MODEL_AND_CPU[gpuModel])[0];
          return {
            items: generateRamItems(defaultItems),
          };
        }
        return {
          items: generateRamItems(ramByGPU),
        };
      },
    },
    nodeCount: {
      type: CONTROL.Stepper,
      accessorKey: 'nodeQuantity',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество узлов',
      },
      uiProps: {
        min: 1,
        max: 10,
        postfix: 'Шт',
      },
      watchedControls: {
        vCpuCoreCount: 'vCpuCoreCount',
        hasGpu: 'hasGpu',
        gpuModel: 'gpuModel',
        ramAmount: 'ramAmount',
      },
      relateFn: ({ vCpuCoreCount, hasGpu, gpuModel, ramAmount }) => {
        if (!hasGpu) {
          return {
            uiProps: {
              max: 10,
            },
          };
        }
        return {
          uiProps: {
            max: MAX_SIZE_NODE_COUNT_WITH_GPU?.[gpuModel]?.[vCpuCoreCount]?.[ramAmount] ?? 10,
          },
        };
      },
    },
  },
};
