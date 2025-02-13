import { CONTROL, FormConfig } from '../../../../components';
import { generateBaseItems } from '../../../utils';

const OsNameItem = {
  Ubuntu: 'Ubuntu',
  OracleLinux: 'Oracle Linux',
};

const osNameItems = [
  {
    value: OsNameItem.Ubuntu,
    label: 'Ubuntu',
  },
  {
    value: OsNameItem.OracleLinux,
    label: 'Oracle Linux',
  },
];

const osNameToOsVersionMap = {
  [OsNameItem.OracleLinux]: ['9.3'],
  [OsNameItem.Ubuntu]: ['20.04', '22.04', '24.04'],
};

const NameFlavourItem = {
  IntelBroadwellSSD: '2 x Intel Broadwell EP Xeon E5-2699 v4 22 ядра 2.2ГГц; RAM: 64ГБ; SSD: 800ГБ SATA',
  IntelBroadwellHDD: '2 x Intel Broadwell EP Xeon E5-2699 v4 22 ядра 2.2ГГц; RAM: 64ГБ; HDD: 2 x 900ГБ SAS',
  IntelHaswellRam64: '2 x Intel Haswell EP Xeon E5-2690 v3 12 ядер 2.6ГГц; RAM: 64ГБ; HDD: 4 x 2ТБ SATA',
  IntelHaswellRam128: '2 x Intel Haswell EP Xeon E5-2690 v3 12 ядер 2.6ГГц; RAM: 128ГБ; HDD: 4 x 2ТБ SATA',
  IntelSkylake: '2 x Intel Skylake-SP Xeon Gold 6161 22 ядра 2.2ГГц; RAM: 64ГБ; SSD: 4 x 800ГБ SAS',
};

const nameFlavourItems = [
  {
    value: NameFlavourItem.IntelBroadwellSSD,
    label: '2 x Intel Broadwell EP Xeon E5-2699 v4',
    description: (
      <>
        22 ядра 2.2 ГГц <br />
        RAM 64 ГБ <br />
        800 ГБ SSD SATA
      </>
    ),
  },
  {
    value: NameFlavourItem.IntelBroadwellHDD,
    label: '2 x Intel Broadwell EP Xeon E5-2699 v4',
    description: (
      <>
        22 ядра 2.2 ГГц <br />
        RAM 64 ГБ <br /> 2 x 900 ГБ HDD SAS
      </>
    ),
  },
  {
    value: NameFlavourItem.IntelHaswellRam64,
    label: '2 x Intel Haswell EP Xeon E5-2690 v3',
    description: (
      <>
        12 ядер 2.6 ГГц <br />
        RAM 64 ГБ <br />4 x 2 ТБ HDD SATA
      </>
    ),
  },
  {
    value: NameFlavourItem.IntelHaswellRam128,
    label: '2 x Intel Haswell EP Xeon E5-2690 v3',
    description: (
      <>
        12 ядер 2.6 ГГц <br />
        RAM 128 ГБ <br />4 x 2 ТБ HDD SATA
      </>
    ),
  },
  {
    value: NameFlavourItem.IntelSkylake,
    label: '2 x Intel Skylake-SP Xeon Gold 6161',
    description: (
      <>
        22 ядра 2.2 ГГц <br />
        RAM 64 ГБ <br />4 x 800 ГБ SSD SAS
      </>
    ),
  },
];

export const EVOLUTION_BARE_METAL_FORM_CONFIG: FormConfig = {
  ui: [['osName', 'osVersion'], 'nameFlavour', 'eipAlert', 'eip'],
  controls: {
    osName: {
      type: CONTROL.SelectSingle,
      accessorKey: 'osName',
      defaultValue: OsNameItem.Ubuntu,
      items: osNameItems,
      decoratorProps: {
        label: 'Операционная система',
      },
    },

    osVersion: {
      type: CONTROL.SelectSingle,
      accessorKey: 'osVersion',
      defaultValue: '20.04',
      items: generateBaseItems(osNameToOsVersionMap[OsNameItem.Ubuntu]),
      decoratorProps: {
        label: 'Версия операционной системы',
      },
      watchedControls: { osName: 'osName' },
      relateFn: ({ osName }) => {
        const items = osNameToOsVersionMap[osName];

        if (items?.length > 0) {
          return {
            items: generateBaseItems(items),
          };
        }
      },
    },
    nameFlavour: {
      type: CONTROL.ToggleCards,
      accessorKey: 'nameFlavour',
      defaultValue: NameFlavourItem.IntelBroadwellSSD,
      items: nameFlavourItems,
      decoratorProps: {
        label: 'Конфигурация',
      },
    },
    eipAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'При подключении сервиса публичный IP-адрес назначается по умолчанию',
      },
      accessorKey: 'public-ip',
    },
    eip: {
      type: CONTROL.Toggle,
      accessorKey: 'bindingPublickIpAddress',
      defaultValue: true,
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
      uiProps: {
        disabled: true,
      },
    },
  },
};
