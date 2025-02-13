import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';
import { generateBaseItems, getDisk } from '../../../utils';

enum GpuType {
  Tesla = 'GPU NVIDIA® Tesla® V100',
  H100 = 'GPU NVIDIA® H100',
}

const gpuTypeItems = [GpuType.Tesla, GpuType.H100];

const MinAdditionalDiskSize = 15 as const;

enum OsType {
  Ubuntu18_04 = 'Ubuntu_18.04',
  Fedora38 = 'Fedora_38',
  Debian10 = 'Debian_10',
  Ubuntu22_04_4 = 'Ubuntu_22.04.4',
  Ubuntu22_04 = 'Ubuntu_22.04',
  Ubuntu20_04 = 'Ubuntu_20.04',
  OpenSUSE15_2 = 'openSUSE_15.2',
  Debian12 = 'Debian_12',
  CentOS9 = 'CentOS_9',
  CentOS8 = 'CentOS_8',
  CentOS7Kernel5_4 = 'CentOS_7_kernel_5.4',
  CentOS7 = 'CentOS_7',
  Ubuntu24_04 = 'Ubuntu_24.04',
}

const osItems = [
  OsType.CentOS7,
  OsType.CentOS7Kernel5_4,
  OsType.CentOS8,
  OsType.CentOS9,
  OsType.Debian10,
  OsType.Debian12,
  OsType.Fedora38,
  OsType.Ubuntu22_04,
  OsType.Ubuntu22_04_4,
  OsType.Ubuntu20_04,
  OsType.Ubuntu18_04,
  OsType.Ubuntu24_04,
  OsType.OpenSUSE15_2,
];

const CardValuesTesla = {
  GPU1_vCPU4_RAM64: `1 4 64`,
  GPU2_vCPU8_RAM128: `2 8 128`,
  GPU4_vCPU16_RAM256: `4 16 256`,
  GPU8_vCPU32_RAM512: `8 32 512`,
  GPU16_vCPU64_RAM1024: `16 64 1024`,
} as const;

const CardValuesH100 = {
  GPU1_vCPU20_RAM185: `1 20 186`,
  GPU2_vCPU40_RAM372: `2 40 372`,
  GPU3_vCPU60_RAM558: `3 60 558`,
  GPU4_vCPU80_RAM744: `4 80 744`,
  GPU5_vCPU100_RAM930: `5 100 930`,
  GPU6_vCPU120_RAM1116: `6 120 1116`,
  GPU7_vCPU140_RAM1302: `7 140 1302`,
  GPU8_vCPU160_RAM1488: `8 160 1488`,
} as const;

type FlavorGpuTeslaValue = (typeof CardValuesTesla)[keyof typeof CardValuesTesla];
type FlavorGpuH100Value = (typeof CardValuesH100)[keyof typeof CardValuesH100];

type FlavorsGpuValue = FlavorGpuTeslaValue | FlavorGpuH100Value;

const getParamsByConfigTypeCard = (value: FlavorsGpuValue) => {
  const { 0: gpuCount, 1: vCpuCoreCount, 2: ramAmount } = value.split(' ');

  return { gpuCount, vCpuCoreCount, ramAmount };
};

const generateCards = (cardsData: Record<string, string>, gpuType: GpuType) =>
  Object.keys(cardsData).map(cardDataKey => {
    const { gpuCount, vCpuCoreCount, ramAmount } = getParamsByConfigTypeCard(cardsData[cardDataKey] as FlavorsGpuValue);

    return {
      value: cardsData[cardDataKey],
      label: gpuType,
      description: (
        <>
          {gpuCount} GPU <br />
          {vCpuCoreCount} vCPU <br />
          {ramAmount} ГБ RAM
        </>
      ),
    };
  });

const getMinOsDiskSpace = (os: OsType) => {
  const minSize5GbOs: OsType[] = [OsType.Fedora38, OsType.Ubuntu18_04, OsType.Debian10];
  const minSize15GbOs: OsType[] = [OsType.Ubuntu24_04];

  const minSizeByOsMap = {
    5: minSize5GbOs,
    15: minSize15GbOs,
  };

  const osMinDiskSizeEntry = Object.entries(minSizeByOsMap).find(osMinDiskSizeEntries => {
    const { 1: osMap } = osMinDiskSizeEntries;

    if (osMap.includes(os)) {
      return true;
    }
  });

  if (!osMinDiskSizeEntry) return 10;

  return Number(osMinDiskSizeEntry[0]);
};

export const EVOLUTION_CLOUD_SERVER_GPU_FORM_CONFIG: FormConfig = {
  ui: [['osType'], ['gpuType'], 'configTypeCard', ['systemDisk'], 'additionalOptions', 'networkIsNeeded'],
  controls: {
    osType: {
      type: CONTROL.SelectSingle,
      accessorKey: 'os',
      defaultValue: OsType.Ubuntu22_04,
      items: generateBaseItems(osItems, value => value.replace(/_/g, ' ')),
      decoratorProps: {
        label: 'Операционная система',
      },
      onChangeFn: (value: OsType, setValue) => {
        const arr: [string, AnyType][] = [
          ['os', value],
          ['evs.systemDisk.diskSpace', getMinOsDiskSpace(value)],
        ];

        setValue(arr);
      },
    },
    gpuType: {
      type: CONTROL.SelectSingle,
      accessorKey: 'gpuType',
      defaultValue: GpuType.Tesla,
      items: generateBaseItems(gpuTypeItems),
      decoratorProps: {
        label: 'Тип графического процессора',
      },
      uiProps: {
        visible: false,
      },
    },
    // значение не учитывается при подсчете data
    configTypeCard: {
      type: CONTROL.ToggleCards,
      accessorKey: 'configTypeCard',
      defaultValue: CardValuesTesla.GPU1_vCPU4_RAM64,
      items: generateCards(CardValuesTesla, GpuType.Tesla),
      decoratorProps: {
        label: 'Конфигурация',
      },
      watchedControls: { gpuType: 'gpuType' },
      onChangeFn: (value: FlavorGpuTeslaValue, setValue) => {
        const { gpuCount, vCpuCoreCount, ramAmount } = getParamsByConfigTypeCard(value);

        const valuesToSet = [
          ['configTypeCard', value],
          ['gpuCount', gpuCount],
          ['vCpuCoreCount', vCpuCoreCount],
          ['ramAmount', ramAmount],
        ] as [string, AnyType][];

        setValue(valuesToSet);
      },
      relateFn: ({ gpuType }: { gpuType: GpuType }) => ({
        items:
          gpuType === GpuType.H100
            ? generateCards(CardValuesH100, GpuType.H100)
            : generateCards(CardValuesTesla, GpuType.Tesla),
      }),
    },
    gpuCount: {
      type: CONTROL.Segmented,
      accessorKey: 'gpuCount',
      defaultValue: '1',
      items: [],
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
    vCpuCoreCount: {
      type: CONTROL.Segmented,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '4',
      items: [],
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
    ramAmount: {
      type: CONTROL.Segmented,
      accessorKey: 'ramAmount',
      defaultValue: '64',
      items: [],
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
    systemDisk: getDisk({
      space: {
        label: 'Диск',
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 10,
        uiProps: {
          min: 10,
          max: 4_096,
        },
        watchedControls: { os: 'os' },
        relateFn: ({ os }: { os: OsType }) => ({
          uiProps: {
            min: getMinOsDiskSpace(os),
          },
        }),
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
      ui: ['alertAdditional', ['additionalDisks']],
      controls: {
        alertAdditional: {
          type: 'alert',
          uiProps: {
            appearance: 'info',
            outline: true,
            description: 'Можно добавить до 7 дополнительных дисков',
          },
          accessorKey: 'addDisk',
        },
        additionalDisks: {
          type: CONTROL.Array,
          max: 7,
          accessorKey: 'evs.additionalDisks',
          addText: 'Добавить диск',
          ui: ['disk'],
          defaultValue: [],
          controls: {
            disk: getDisk({
              space: {
                label: 'Дополнительный диск',
                accessorKey: 'diskSpace',
                defaultValue: MinAdditionalDiskSize,
                // TODO в текущем исполнении watchedControls и relateFn работают не корректно, поэтому в дальнейшем будут внесены правки, чтобы правильно отображать минимальные значения дисков
                uiProps: {
                  min: MinAdditionalDiskSize,
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
    networkIsNeeded: {
      type: CONTROL.Toggle,
      defaultValue: false,
      accessorKey: 'networkIsNeeded',
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
    },
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
