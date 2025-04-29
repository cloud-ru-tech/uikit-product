import { CONTROL, FormConfig } from '../../../../components';
import { generateRamItems } from '../../../utils';

enum DeploymentMode {
  Standard = 'standart',
  Business = 'business',
}

const deploymentModes = [
  {
    label: 'Стандарт',
    value: DeploymentMode.Standard,
    description: 'Для тестирования и несложных приложений',
  },
  {
    label: 'Бизнес',
    value: DeploymentMode.Business,
    description: 'Для высоконагруженных сервисов',
  },
];

enum ClusterType {
  Single = 'single',
  Master_Replica = 'master/replica',
}

const clusterTypeItems = [
  {
    label: 'Single',
    value: ClusterType.Single,
    description: 'Одноузловая конфигурация',
  },
  {
    label: 'Master/Replica',
    value: ClusterType.Master_Replica,
    description: 'Отказоустойчивый кластер высокой доступности',
  },
];

type MapType<T> = Record<DeploymentMode, Record<ClusterType, T>>;

const vCpuMap: MapType<number[]> = {
  [DeploymentMode.Standard]: {
    [ClusterType.Single]: [1, 2],
    [ClusterType.Master_Replica]: [1, 2],
  },
  [DeploymentMode.Business]: {
    [ClusterType.Single]: [4, 8],
    [ClusterType.Master_Replica]: [4, 8],
  },
};

const ramMap: MapType<Record<string, number[]>> = {
  [DeploymentMode.Standard]: {
    [ClusterType.Single]: {
      '1': [2, 4, 8],
      '2': [4, 8, 16],
      '4': [8, 16],
      '8': [32],
    },
    [ClusterType.Master_Replica]: {
      '1': [2, 4, 8],
      '2': [4, 8, 16],
      '4': [8],
    },
  },
  [DeploymentMode.Business]: {
    [ClusterType.Single]: {
      '4': [8, 16],
      '8': [32],
      '16': [32, 64, 128],
      '24': [48],
      '32': [64, 128, 256],
      '64': [128, 256],
    },
    [ClusterType.Master_Replica]: {
      '4': [8, 16],
      '8': [16, 32, 64],
      '16': [16, 64, 128, 256],
      '24': [48],
      '32': [64, 128, 256],
      '64': [128, 256],
    },
  },
};

const ramAmount = generateRamItems([2, 4, 8, 16, 32]);

const getMinMaxDiskSize = ({ deploymentMode }: { deploymentMode: DeploymentMode }) => {
  switch (deploymentMode) {
    case DeploymentMode.Business: {
      return {
        uiProps: {
          min: 40,
          max: 16000,
        },
      };
    }
    case DeploymentMode.Standard:
    default: {
      return {
        uiProps: {
          min: 10,
          max: 2000,
        },
      };
    }
  }
};

export const EVOLUTION_POSTGRE_SQL_FORM_CONFIG: FormConfig = {
  ui: ['deploymentMode', 'clusterType', 'flavorConfig', ['systemDisk']],
  controls: {
    deploymentMode: {
      type: CONTROL.Carousel,
      accessorKey: 'deploymentMode',
      defaultValue: DeploymentMode.Standard,
      items: deploymentModes,
      decoratorProps: {
        label: 'Режим развертывания',
        labelTooltip: 'Режимы развертывания кластера отличаются объемом ресурсов и уровнем безопасности',
      },
      onChangeFn: (value, setValue) => {
        setValue([
          ['deploymentMode', value],
          ['systemDisk.diskSpace', 0],
        ]);
      },
    },
    clusterType: {
      type: CONTROL.Carousel,
      accessorKey: 'clusterType',
      defaultValue: 'single',
      items: clusterTypeItems,
      decoratorProps: {
        label: 'Тип кластера',
      },
    },
    flavorConfig: {
      type: CONTROL.Object,
      ui: [['vCpu', 'ram']],
      controls: {
        vCpu: {
          type: CONTROL.Slider,
          accessorKey: 'flavorConfig.vCpu',
          defaultValue: '1',
          items: [],
          decoratorProps: {
            label: 'Количество ядер vCPU',
            labelTooltip: 'Виртуальные ядра',
          },
          watchedControls: { deploymentMode: 'deploymentMode', clusterType: 'clusterType' },
          relateFn: ({ deploymentMode, clusterType }: { deploymentMode: DeploymentMode; clusterType: ClusterType }) => {
            const items = vCpuMap?.[deploymentMode]?.[clusterType];

            if (items?.length > 0) {
              return {
                items,
              };
            }
          },
        },

        ram: {
          type: CONTROL.Segmented,
          accessorKey: 'flavorConfig.ram',
          defaultValue: '2',
          items: ramAmount.slice(0, 3),
          decoratorProps: {
            label: 'Количество оперативной памяти (RAM)',
          },
          watchedControls: { deploymentMode: 'deploymentMode', clusterType: 'clusterType', vCpu: 'flavorConfig.vCpu' },
          relateFn: ({
            deploymentMode,
            clusterType,
            vCpu,
          }: {
            deploymentMode: DeploymentMode;
            clusterType: ClusterType;
            vCpu: string;
          }) => {
            const items = ramMap?.[deploymentMode]?.[clusterType]?.[vCpu];

            if (items?.length > 0) {
              return {
                items: generateRamItems(items),
              };
            }
          },
        },
      },
    },
    systemDisk: {
      type: CONTROL.Object,
      ui: [{ controls: ['diskSpace', 'specification'] }],
      controls: {
        diskSpace: {
          type: CONTROL.Stepper,
          decoratorProps: {
            label: 'Диск',
          },
          accessorKey: 'systemDisk.diskSpace',
          defaultValue: 10,
          uiProps: {
            min: 10,
            max: 2000,
            postfix: 'ГБ',
          },
          watchedControls: { deploymentMode: 'deploymentMode' },
          relateFn: getMinMaxDiskSize,
        },
        specification: {
          type: CONTROL.SelectSingle,
          accessorKey: 'systemDisk.specification',
          decoratorProps: {
            label: '',
          },
          defaultValue: 'SSD',
          items: [
            {
              value: 'SSD',
              label: 'SSD',
            },
          ],
          uiProps: {
            disabled: true,
            showClearButton: false,
            searchable: false,
          },
        },
      },
    },
  },
};
