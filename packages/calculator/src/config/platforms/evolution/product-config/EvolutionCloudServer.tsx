import { CONTROL, FormConfig } from '../../../../components';
import { generateBaseItems, generateRamItems, getDisk } from '../../../utils';

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

const osItems = [
  'CentOS 7',
  'CentOS 7 kernel 5.4',
  'CentOS 7 kernel 5.4 v2',
  'CentOS 8',
  'CentOS 9',
  'Debian 12',
  'Fedora 38',
  'Ubuntu 18.04',
  'Ubuntu 20.04',
  'Ubuntu 22.04',
  'openSUSE 15.2',
];

const guaranteedPartToVCpuMap = {
  [GuaranteedPartItem[10]]: [1, 2, 4, 8],
  [GuaranteedPartItem[30]]: [1, 2, 4, 8, 16, 24, 32],
  [GuaranteedPartItem[100]]: [1, 2, 4, 8, 16, 24, 32, 64],
};

const guaranteedPartVCpuToRamMap: Record<string, Record<string, number[]>> = {
  [GuaranteedPartItem[10]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32],
    '8': [16, 32],
  },
  [GuaranteedPartItem[30]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64],
    '16': [32, 64],
    '24': [48],
    '32': [64],
  },

  [GuaranteedPartItem[100]]: {
    '1': [1, 2],
    '2': [4],
    '4': [8, 16, 32, 64],
    '8': [16, 32, 64, 128],
    '16': [32, 64, 128, 256],
    '24': [32, 48],
    '32': [64, 128, 256],
    '64': [128, 256],
  },
};

export const EVOLUTION_CLOUD_SERVER_FORM_CONFIG: FormConfig = {
  ui: [
    'alertStart',
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
      watchedControls: { guaranteedPart: 'guaranteedPart' },
      relateFn: ({ guaranteedPart }) => {
        const items = guaranteedPartToVCpuMap?.[guaranteedPart];

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
        vCpuCoreCount: 'vCpuCoreCount',
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
