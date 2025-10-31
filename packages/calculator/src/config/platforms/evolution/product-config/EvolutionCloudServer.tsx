import { CONTROL, FormConfig } from '../../../../components';
import { generateBaseItems, generateRamItems, getDisk } from '../../../utils';
import { guaranteedPartToVCpuMap, guaranteedPartVCpuToRamMap } from '../constants';

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

const osItems = ['CentOS 9', 'Debian 11', 'Debian 12', 'Ubuntu 20.04', 'Ubuntu 22.04', 'Ubuntu 24.04'];

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
