import { CONTROL, FormConfig } from '../../../../components';
import { generateBaseItems, generateRamItems, getDisk } from '../../../utils';
import { guaranteedPartToVCpuMap, guaranteedPartVCpuToRamMap } from '../constants';

const GuaranteedPartItem = {
  '10': '10',
  '30': '30',
  '100': '100',
};

const NVIDIA_A100_40GB = {
  value: 'NVIDIA A100 40GB',
  label: 'NVIDIA A100 40GB',
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
  value: 'NVIDIA H100 PCIe',
  label: 'NVIDIA H100 PCIe',
};

const NVIDIA_V100 = {
  value: 'NVIDIA V100',
  label: 'NVIDIA V100',
};

const MODEL_ITEMS = [
  NVIDIA_A100_40GB,
  NVIDIA_A100_80GB,
  NVIDIA_H100_NVLINK_ITEM,
  NVIDIA_H100_NVLINK_ITEM_PCIe,
  NVIDIA_V100,
];

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

const osItems = ['CentOS 9', 'Debian 11', 'Debian 12', 'Ubuntu 20.04', 'Ubuntu 22.04', 'Ubuntu 24.04'];

const GPU_BY_MODEL: { [model: string]: number[] } = {
  [NVIDIA_A100_40GB.value]: [1, 2, 4],
  [NVIDIA_A100_80GB.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_H100_NVLINK_ITEM.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_H100_NVLINK_ITEM_PCIe.value]: [1, 2, 3, 4, 5, 6, 7, 8],
  [NVIDIA_V100.value]: [1, 2, 4, 8, 16],
};

const CPU_BY_MODEL_AND_GPU: { [model: string]: { [gpu: string]: number[] } } = {
  [NVIDIA_A100_40GB.value]: {
    '1': [24],
    '2': [48],
    '4': [96],
  },
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
  [NVIDIA_A100_40GB.value]: {
    '1': [240],
    '2': [480],
    '4': [960],
  },
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
    '1': [110],
    '2': [220],
    '3': [330],
    '4': [440],
    '5': [550],
    '6': [660],
    '7': [770],
    '8': [880],
  },
  [NVIDIA_V100.value]: {
    '1': [64],
    '2': [128],
    '4': [256],
    '8': [512],
    '16': [1024],
  },
};

export const EVOLUTION_CLOUD_SERVER_FORM_CONFIG: FormConfig = {
  ui: [
    'alertStart',
    'hasGpu',
    ['gpuModel'],
    'gpuCount',
    'guaranteedPart',
    ['os'],
    ['vCpuCoreCount', 'ramAmount'],
    ['systemDisk'],
    'alertAdditional',
    ['additionalDisks'],
    'networkIsNeeded',
  ],
  controls: {
    alertStart: {
      type: CONTROL.Alert,
      uiProps: {
        appearance: 'info',
        outline: true,
        description: (
          <>
            Начните работать с&nbsp;сервисами бесплатно с&nbsp;бонусной программой Cloud.ru
            <br />
            Получить 4000 бонусов для оплаты сервисов можно за&nbsp;первую привязку карты.
          </>
        ),
      },
      accessorKey: 'start',
    },

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

    guaranteedPart: {
      decoratorProps: {
        label: 'Гарантированная доля vCPU',
        labelTooltip:
          'Гарантированная доля vCPU определяет долю использования процессора, выделенную для виртуальной машины. Этот параметр известен также как переподписка vCPU (vCPU Overcommitment). При 100% гарантируется использование полной мощности виртуальных ядер процессора хоста виртуализации, выделенных виртуальной машине.',
      },
      type: CONTROL.Carousel,
      accessorKey: 'guaranteedPart',
      defaultValue: GuaranteedPartItem[10],
      items: guaranteedPartCards,
      watchedControls: {
        hasGpu: 'hasGpu',
      },
      relateFn: ({ hasGpu }) => ({
        items: hasGpu ? [guaranteedPartCards[guaranteedPartCards.length - 1]] : guaranteedPartCards,
      }),
    },

    os: {
      type: CONTROL.SelectSingle,
      decoratorProps: {
        label: 'Операционная система',
      },
      accessorKey: 'os',
      defaultValue: 'Ubuntu 22.04',
      items: generateBaseItems(osItems),
    },

    vCpuCoreCount: {
      type: CONTROL.Slider,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '1',
      items: [1, 2, 4, 8],
      decoratorProps: {
        label: 'Количество ядер vCPU',
        labelTooltip: 'Количество ядер vCPU',
      },
      watchedControls: {
        guaranteedPart: 'guaranteedPart',
        hasGpu: 'hasGpu',
        gpuModel: 'gpuModel',
        gpuCount: 'gpuCount',
      },
      relateFn: ({ guaranteedPart, hasGpu, gpuModel, gpuCount }) => {
        const items = hasGpu
          ? CPU_BY_MODEL_AND_GPU[gpuModel][String(gpuCount)]
          : guaranteedPartToVCpuMap?.[guaranteedPart];

        if (items?.length > 0) {
          return {
            items: items,
          };
        }
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
        guaranteedPart: 'guaranteedPart',
        gpuModel: 'gpuModel',
        hasGpu: 'hasGpu',
        gpuCount: 'gpuCount',
        vCpuCoreCount: 'vCpuCoreCount',
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

    systemDisk: getDisk({
      space: {
        label: 'Загрузочный диск',
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 10,
        uiProps: {
          min: 10,
          max: 4_096,
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),

    alertAdditional: {
      type: 'alert',
      uiProps: {
        appearance: 'info',
        outline: true,
        description: 'Можно добавить до 7 дополнительных дисков',
      },
      accessorKey: 'risks',
    },
    additionalDisks: {
      type: CONTROL.Array,
      max: 7,
      accessorKey: 'evs.additionalDisks',
      defaultValue: [],
      addText: 'Добавить диск',
      ui: ['disk'],
      controls: {
        disk: getDisk({
          space: {
            label: 'Дополнительный диск',
            accessorKey: 'diskSpace',
            defaultValue: 10,
            uiProps: {
              min: 10,
              max: 4_096,
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
    },

    networkIsNeeded: {
      type: CONTROL.Toggle,
      defaultValue: false,
      accessorKey: 'networkIsNeeded',
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
    },

    // Hidden
    network: {
      type: CONTROL.Object,
      defaultValue: {
        ipQuantity: 1,
        bindingIpAddressesQuantity: 0,
        publicGatewayQuantity: 0,
        privateGatewayQuantity: 0,
      },
      ui: [],
      controls: {},
      visible: false,
    },
  },
};
