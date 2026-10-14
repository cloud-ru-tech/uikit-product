import { CONTROL, FormConfig } from '../../../../components';
import { getDisk } from '../../../utils';

const MASTER_NODES_DISABLED_VALUE = 0;
const MASTER_NODES_COUNT = 3;

const DATA_NODES_MIN_COUNT = 3;
const DATA_NODES_MAX_COUNT = 6;

const MASTER_DISK_DISABLED_VALUE = 0;
const MASTER_DISK_MIN_VALUE = 10;
const MASTER_DISK_MAX_VALUE = 16000;

const DATA_DISK_MIN_VALUE = 40;
const DATA_DISK_MAX_VALUE = 16000;

type Flavor = [number, number, number, number];

function hasFlavorMasterNodes(flavor: Flavor) {
  const [vcpuMaster, ramMaster] = flavor;

  return vcpuMaster > 0 && ramMaster > 0;
}

function generateFlavorItems(items: Flavor[]) {
  const cpuPostfix = 'vCPU';
  const ramPostfix = 'ГБ RAM';

  return items.map(flavor => {
    const hasMaster = hasFlavorMasterNodes(flavor);

    const [vcpuMaster, ramMaster, vcpuData, ramData] = flavor;

    return {
      value: flavor.join(' '),
      label:
        (hasMaster ? `мастер-узлы: ${vcpuMaster} ${cpuPostfix}, ${ramMaster} ${ramPostfix}; ` : '') +
        `дата-узлы: ${vcpuData} ${cpuPostfix}, ${ramData} ${ramPostfix}`,
    };
  });
}

const allFlavors: Flavor[] = [
  [0, 0, 4, 16],
  [0, 0, 8, 32],
  [4, 16, 4, 16],
  [4, 16, 8, 32],
  [8, 32, 8, 32],
];

const masterFlavorItems = generateFlavorItems(allFlavors.filter(item => hasFlavorMasterNodes(item)));
const dataFlavorItems = generateFlavorItems(allFlavors.filter(item => !hasFlavorMasterNodes(item)));

export const EVOLUTION_OPEN_SEARCH_FORM_CONFIG: FormConfig = {
  ui: [
    'hasMasterNodes',
    'flavor',
    'vcpuMaster',
    'ramMaster',
    'vcpuData',
    'ramData',
    ['masterNodes', 'dataNodes'],
    ['diskMaster', 'diskData'],
  ],
  controls: {
    hasMasterNodes: {
      type: CONTROL.Toggle,
      accessorKey: 'hasMasterNodes',
      defaultValue: false,
      decoratorProps: {
        label: 'Выделенные мастер-узлы',
      },
      onChangeFn(value, setValue) {
        const flavor = (value ? allFlavors.find(hasFlavorMasterNodes) : allFlavors[0]) || allFlavors[0];

        const [vcpuMaster, ramMaster, vcpuData, ramData] = flavor;

        setValue([
          ['hasMasterNodes', value],
          ['masterNodes', value ? MASTER_NODES_COUNT : MASTER_NODES_DISABLED_VALUE],
          ['storageMaster', value ? MASTER_DISK_MIN_VALUE : MASTER_DISK_DISABLED_VALUE],
          ['flavor', flavor.join(' ')],
          ['vcpuMaster', vcpuMaster],
          ['ramMaster', ramMaster],
          ['vcpuData', vcpuData],
          ['ramData', ramData],
        ]);
      },
    },
    masterNodes: {
      type: CONTROL.Stepper,
      accessorKey: 'masterNodes',
      decoratorProps: {
        label: 'Количество мастер-узлов',
      },
      defaultValue: MASTER_NODES_DISABLED_VALUE,
      uiProps: {
        disabled: true,
      },
      watchedControls: {
        hasMasterNodes: 'hasMasterNodes',
      },
      relateFn: ({ hasMasterNodes }) => ({
        uiProps: {
          visible: hasMasterNodes,
          min: hasMasterNodes ? MASTER_NODES_COUNT : undefined,
          max: hasMasterNodes ? MASTER_NODES_COUNT : undefined,
        },
      }),
    },
    dataNodes: {
      type: CONTROL.Stepper,
      accessorKey: 'dataNodes',
      decoratorProps: {
        label: 'Количество дата-узлов',
      },
      defaultValue: DATA_NODES_MIN_COUNT,
      uiProps: {
        min: DATA_NODES_MIN_COUNT,
        max: DATA_NODES_MAX_COUNT,
      },
    },
    flavor: {
      type: CONTROL.SelectSingle,
      accessorKey: 'flavor',
      items: dataFlavorItems,
      defaultValue: allFlavors[0].join(' '),
      decoratorProps: {
        label: 'Вычислительные ресурсы',
      },
      onChangeFn(value, setValue) {
        const [vcpuMaster, ramMaster, vcpuData, ramData] = value.split(' ').map(value => parseInt(value));

        setValue([
          ['flavor', value],
          ['vcpuMaster', vcpuMaster],
          ['ramMaster', ramMaster],
          ['vcpuData', vcpuData],
          ['ramData', ramData],
        ]);
      },
      watchedControls: {
        hasMasterNodes: 'hasMasterNodes',
      },
      relateFn: ({ hasMasterNodes }) => ({
        items: hasMasterNodes ? masterFlavorItems : dataFlavorItems,
      }),
    },
    vcpuMaster: {
      type: CONTROL.Stepper,
      accessorKey: 'vcpuMaster',
      defaultValue: allFlavors[0][0],
      uiProps: { visible: false },
      decoratorProps: {},
    },
    ramMaster: {
      type: CONTROL.Stepper,
      accessorKey: 'ramMaster',
      defaultValue: allFlavors[0][1],
      uiProps: { visible: false },
      decoratorProps: {},
    },
    vcpuData: {
      type: CONTROL.Stepper,
      accessorKey: 'vcpuData',
      defaultValue: allFlavors[0][2],
      uiProps: { visible: false },
      decoratorProps: {},
    },
    ramData: {
      type: CONTROL.Stepper,
      accessorKey: 'ramData',
      defaultValue: allFlavors[0][3],
      uiProps: { visible: false },
      decoratorProps: {},
    },
    diskMaster: getDisk({
      props: {
        watchedControls: {
          hasMasterNodes: 'hasMasterNodes',
        },
        relateFn: ({ hasMasterNodes }) => ({
          visible: hasMasterNodes,
        }),
      },
      space: {
        label: 'Диск для мастер-узлов',
        accessorKey: 'storageMaster',
        defaultValue: MASTER_DISK_DISABLED_VALUE,
        watchedControls: {
          hasMasterNodes: 'hasMasterNodes',
        },
        relateFn: ({ hasMasterNodes }) => ({
          uiProps: {
            visible: hasMasterNodes,
            min: hasMasterNodes ? MASTER_DISK_MIN_VALUE : undefined,
            max: hasMasterNodes ? MASTER_DISK_MAX_VALUE : undefined,
          },
        }),
      },
      specification: {
        accessorKey: 'specificationMaster',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),
    diskData: getDisk({
      space: {
        label: 'Диск для дата-узлов',
        accessorKey: 'storageData',
        defaultValue: DATA_DISK_MIN_VALUE,
        uiProps: {
          min: DATA_DISK_MIN_VALUE,
          max: DATA_DISK_MAX_VALUE,
        },
      },
      specification: {
        accessorKey: 'specificationData',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),
  },
};
