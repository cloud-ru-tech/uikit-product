import { CONTROL, FormConfig } from '../../../../components';
import { generateBaseItems, generateCpuItems, generateRamItems, getDisk } from '../../../utils';

const osItems = ['Fedora 38', 'Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04'];

export const EVOLUTION_CLOUD_SERVER_FREE_TIER_FORM_CONFIG: FormConfig = {
  ui: [
    'alert',
    'guaranteedPart',
    ['os'],
    ['vCpuCoreCount', 'ramAmount'],
    ['systemDisk'],
    'additionalOptions',
    'networkIsNeeded',
  ],
  controls: {
    alert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Можно подключить только 1 бесплатную виртуальную машину',
      },
    },
    guaranteedPart: {
      decoratorProps: {
        label: 'Гарантированная доля vCPU',
        labelTooltip:
          'Гарантированная доля vCPU определяет долю использования процессора, выделенную для виртуальной машины. Этот параметр известен также как переподписка vCPU (vCPU Overcommitment). При 100% гарантируется использование полной мощности виртуальных ядер процессора хоста виртуализации, выделенных виртуальной машине.',
      },
      type: CONTROL.Carousel,
      accessorKey: 'guaranteedPart',
      defaultValue: '10',
      items: [
        {
          value: '10',
          label: 'Доля до 10%',
          description: 'Для тестирования и несложных приложений',
        },
      ],
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
      type: CONTROL.Segmented,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '2',
      items: generateCpuItems([1, 2, 4, 8]),
      decoratorProps: {
        label: 'Количество ядер vCPU',
        labelTooltip: 'Количество ядер vCPU',
      },
      uiProps: {
        disabled: true,
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

    systemDisk: getDisk({
      space: {
        label: 'Загрузочный диск',
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 30,
        uiProps: {
          min: 30,
          max: 30,
          showHint: false,
          disabled: true,
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

    additionalOptions: {
      type: CONTROL.Object,
      decoratorProps: {
        label: 'Дополнительные платные опции',
      },
      ui: ['additionalDisks'],
      controls: {
        additionalDisks: {
          type: CONTROL.ToggleObject,
          switchKey: 'evs.additionalDisksIsNeeded',
          decoratorProps: {
            label: 'Дополнительные диски',
          },
          control: {
            type: 'object',
            ui: ['alertAdditional', ['additionalDisks']],
            controls: {
              alertAdditional: {
                type: 'alert',
                uiProps: {
                  appearance: 'info',
                  outline: true,
                  description: 'Можно добавить до 7 дополнительных дисков',
                },
              },
              additionalDisks: {
                type: CONTROL.Array,
                min: 1,
                max: 7,
                accessorKey: 'evs.additionalDisks',
                addText: 'Добавить диск',
                ui: ['disk'],
                defaultValue: [
                  {
                    diskSpace: 5,
                    specification: 'SSD',
                  },
                ],
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
            },
          },
        },
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
