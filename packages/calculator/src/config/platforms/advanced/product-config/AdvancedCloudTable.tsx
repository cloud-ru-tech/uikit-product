import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';
import { generateCpuItems, generateRamItems } from '../../../utils';

const ClusterType = {
  ClickHouse: 'clickhouse',
  Doris: 'doris',
  HBase: 'hbase',
} as const;

const ConfigurationType = {
  Single: 'single',
  HighAvailability: 'highAvailability',
} as const;

const ComputeStorageType = {
  HighIO: 'High I/O',
  UltraHighIOCompute: 'Ultra-high I/O Compute',
  ExtremeSSD: 'Extreme SSD',
} as const;

const ZookeeperStorageType = {
  UltraHighIO: 'Ultra-high I/O Zookeper',
} as const;

const StorageType = {
  HighIO: 'High I/O',
  UltraHighIO: 'Ultra-high I/O',
  ExtremeSSD: 'Extreme SSD',
  CommonSSD: 'Common I/O',
} as const;

const clusterTypeItems = [
  { value: ClusterType.ClickHouse, label: 'ClickHouse' },
  { value: ClusterType.Doris, label: 'Doris' },
  { value: ClusterType.HBase, label: 'HBase' },
];

const configurationTypeItems = [
  {
    value: ConfigurationType.Single,
    label: 'Single',
    description: 'Используется одна Compute-нода. Конфигурация может быть использована только для тестовых проектов',
  },
  {
    value: ConfigurationType.HighAvailability,
    label: 'High Availability',
    description: 'Используется минимум 2 реплики для вычислительных нод и 3 ноды для кластера ZooKeeper',
  },
];

const computeCpuToRamMap: Record<string, number[]> = {
  '8': [16, 32],
  '16': [32, 64],
  '32': [64, 128],
  '64': [128, 256],
};

const computeStorageTypeItems = [
  { value: ComputeStorageType.HighIO, label: 'High I/O' },
  { value: ComputeStorageType.UltraHighIOCompute, label: 'Ultra-high I/O Compute' },
  { value: ComputeStorageType.ExtremeSSD, label: 'Extreme SSD' },
];

const zookeeperCpuToRamMap: Record<string, number[]> = {
  '8': [16, 32],
  '16': [32, 64],
  '32': [64, 128],
  '64': [128, 256],
};

const zookeeperStorageTypeItems = [{ value: ZookeeperStorageType.UltraHighIO, label: 'Ultra-high I/O Zookeper' }];

const dorisCpuToRamMap: Record<string, number[]> = {
  '4': [16],
  '8': [16, 32],
  '16': [32, 64],
  '32': [64, 128],
  '64': [128, 256],
};

const dorisStorageTypeItems = [
  { value: StorageType.HighIO, label: 'High I/O' },
  { value: StorageType.UltraHighIO, label: 'Ultra-high I/O Compute' },
  { value: StorageType.ExtremeSSD, label: 'Extreme SSD' },
];

const masterCoreCpuToRamMap: Record<string, number[]> = {
  '4': [16],
  '8': [16, 32],
  '16': [32, 64],
  '32': [64, 128],
  '64': [128],
};

const coreStorageTypeItems = [
  { value: StorageType.HighIO, label: 'High I/O' },
  { value: StorageType.UltraHighIO, label: 'Ultra-high I/O' },
  { value: StorageType.CommonSSD, label: 'Common SSD' },
];

export const CLOUD_TABLE_FORM_CONFIG: FormConfig = {
  ui: [
    ['clusterType'],
    'configurationTypeObj',
    'computeNodesObj',
    'zookeeperNodesObj',
    'frontendNodesObj',
    'backendNodesObj',
    'masterNodesObj',
    'coreNodesObj',
  ],
  controls: {
    clusterType: {
      type: CONTROL.Segmented,
      accessorKey: 'clusterType',
      defaultValue: ClusterType.ClickHouse,
      items: clusterTypeItems,
      decoratorProps: {
        label: 'Тип кластера',
      },
    },

    configurationTypeObj: {
      type: CONTROL.Object,
      ui: ['configurationType'],
      visible: true,
      watchedControls: { clusterType: 'clusterType' },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.ClickHouse) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Тип конфигурации',
      },
      controls: {
        configurationType: {
          type: CONTROL.Carousel,
          accessorKey: 'configurationType',
          defaultValue: ConfigurationType.HighAvailability,
          items: configurationTypeItems,
          decoratorProps: {},
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['configurationType', value]];
            if (value === ConfigurationType.Single) {
              updates.push(['computeNodes.quantity', 1]);
            }
            setValue(updates);
          },
        },
      },
    },

    computeNodesObj: {
      type: CONTROL.Object,
      ui: [['computeCpu', 'computeRam'], ['computeStorage', 'computeStorageType'], [['computeNodeCount']]],
      visible: true,
      watchedControls: {
        clusterType: 'clusterType',
        configurationType: 'configurationType',
      },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.ClickHouse) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Compute Nodes',
        labelTooltip: 'Обрабатывают запросы и выполняют вычисления в кластере',
      },
      controls: {
        computeCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'computeNodes.vCPU',
          defaultValue: '8',
          items: generateCpuItems([8, 16, 32, 64]),
          decoratorProps: {
            label: 'Количество vCPU',
          },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['computeNodes.vCPU', value]];
            const rams = computeCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['computeNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        computeRam: {
          type: CONTROL.Segmented,
          accessorKey: 'computeNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(computeCpuToRamMap['8']),
          decoratorProps: {
            label: 'Объём RAM',
          },
          watchedControls: { cpu: 'computeNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? computeCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        computeStorage: {
          type: CONTROL.Stepper,
          accessorKey: 'computeNodes.storage.space',
          defaultValue: 100,
          decoratorProps: { label: 'Объем хранилища' },
          uiProps: {
            min: 100,
            max: 10_000,
            step: 100,
            postfix: 'ГБ',
          },
        },
        computeStorageType: {
          type: CONTROL.SelectSingle,
          accessorKey: 'computeNodes.storage.type',
          defaultValue: ComputeStorageType.HighIO,
          items: computeStorageTypeItems,
          decoratorProps: { label: 'Тип хранилища' },
          uiProps: { disabled: computeStorageTypeItems.length === 1 },
        },
        computeNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'computeNodes.quantity',
          defaultValue: 2,
          decoratorProps: {
            label: 'Количество Compute Nodes',
            labelTooltip: 'Обрабатывают запросы и выполняют вычисления в кластере',
          },
          uiProps: {
            min: 2,
            max: 40,
            step: 1,
            postfix: 'шт',
          },
        },
      },
    },

    zookeeperNodesObj: {
      type: CONTROL.Object,
      ui: [['zookeeperCpu', 'zookeeperRam'], ['zookeeperStorage', 'zookeeperStorageType'], [['zookeeperNodeCount']]],
      visible: true,
      watchedControls: {
        clusterType: 'clusterType',
        configurationType: 'configurationType',
      },
      relateFn: ({ clusterType, configurationType }) => {
        if (clusterType !== ClusterType.ClickHouse || configurationType !== ConfigurationType.HighAvailability) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Zookeeper Nodes',
        labelTooltip: 'Обеспечивают согласованность данных и координацию в кластере',
      },
      controls: {
        zookeeperCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'zookeeperNodes.vCPU',
          defaultValue: '8',
          items: generateCpuItems([8, 16, 32, 64]),
          decoratorProps: {
            label: 'Количество vCPU',
          },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['zookeeperNodes.vCPU', value]];
            const rams = zookeeperCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['zookeeperNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        zookeeperRam: {
          type: CONTROL.Segmented,
          accessorKey: 'zookeeperNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(zookeeperCpuToRamMap['8']),
          decoratorProps: {
            label: 'Объём RAM',
          },
          watchedControls: { cpu: 'zookeeperNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? zookeeperCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        zookeeperStorage: {
          type: CONTROL.Stepper,
          accessorKey: 'zookeeperNodes.storage.space',
          defaultValue: 100,
          decoratorProps: { label: 'Объем хранилища' },
          uiProps: {
            min: 100,
            max: 100,
            step: 1,
            postfix: 'ГБ',
            disabled: true,
          },
        },
        zookeeperStorageType: {
          type: CONTROL.SelectSingle,
          accessorKey: 'zookeeperNodes.storage.type',
          defaultValue: ZookeeperStorageType.UltraHighIO,
          items: zookeeperStorageTypeItems,
          decoratorProps: { label: 'Тип хранилища' },
          uiProps: { disabled: zookeeperStorageTypeItems.length === 1 },
        },
        zookeeperNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'zookeeperNodes.quantity',
          defaultValue: 3,
          decoratorProps: { label: 'Количество Zookeeper Nodes' },
          uiProps: {
            min: 3,
            max: 3,
            step: 1,
            postfix: 'шт',
            disabled: true,
          },
        },
      },
    },

    frontendNodesObj: {
      type: CONTROL.Object,
      ui: [['frontendCpu', 'frontendRam'], ['frontendStorage', 'frontendStorageType'], [['frontendNodeCount']]],
      visible: true,
      watchedControls: { clusterType: 'clusterType' },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.Doris) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Frontend Nodes',
        labelTooltip:
          'Используются для обработки запросов пользователей, планирования разбора очередей, а также для управления метаданными и нодами',
      },
      controls: {
        frontendCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'frontendNodes.vCPU',
          defaultValue: '4',
          items: generateCpuItems([4, 8, 16, 32, 64]),
          decoratorProps: { label: 'Количество vCPU' },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['frontendNodes.vCPU', value]];
            const rams = dorisCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['frontendNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        frontendRam: {
          type: CONTROL.Segmented,
          accessorKey: 'frontendNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(dorisCpuToRamMap['4']),
          decoratorProps: { label: 'Объём RAM' },
          watchedControls: { cpu: 'frontendNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? dorisCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        frontendStorage: {
          type: CONTROL.Stepper,
          accessorKey: 'frontendNodes.storage.space',
          defaultValue: 200,
          decoratorProps: { label: 'Объем хранилища' },
          uiProps: {
            min: 200,
            max: 2_000,
            step: 100,
            postfix: 'ГБ',
          },
        },
        frontendStorageType: {
          type: CONTROL.SelectSingle,
          accessorKey: 'frontendNodes.storage.type',
          defaultValue: StorageType.HighIO,
          items: dorisStorageTypeItems,
          decoratorProps: { label: 'Тип хранилища' },
          uiProps: { disabled: dorisStorageTypeItems.length === 1 },
        },
        frontendNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'frontendNodes.quantity',
          defaultValue: 3,
          decoratorProps: { label: 'Количество Frontend Nodes' },
          uiProps: {
            min: 3,
            max: 5,
            step: 1,
            postfix: 'шт',
          },
        },
      },
    },

    backendNodesObj: {
      type: CONTROL.Object,
      ui: [['backendCpu', 'backendRam'], ['backendStorage', 'backendStorageType'], [['backendNodeCount']]],
      visible: true,
      watchedControls: { clusterType: 'clusterType' },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.Doris) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Backend Nodes',
        labelTooltip: 'Используются для хранения информации и исполнения очередей',
      },
      controls: {
        backendCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'backendNodes.vCPU',
          defaultValue: '4',
          items: generateCpuItems([4, 8, 16, 32, 64]),
          decoratorProps: { label: 'Количество vCPU' },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['backendNodes.vCPU', value]];
            const rams = dorisCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['backendNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        backendRam: {
          type: CONTROL.Segmented,
          accessorKey: 'backendNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(dorisCpuToRamMap['4']),
          decoratorProps: { label: 'Объём RAM' },
          watchedControls: { cpu: 'backendNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? dorisCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        backendStorage: {
          type: CONTROL.Stepper,
          accessorKey: 'backendNodes.storage.space',
          defaultValue: 400,
          decoratorProps: { label: 'Объем хранилища' },
          uiProps: {
            min: 400,
            max: 10_000,
            step: 100,
            postfix: 'ГБ',
          },
        },
        backendStorageType: {
          type: CONTROL.SelectSingle,
          accessorKey: 'backendNodes.storage.type',
          defaultValue: StorageType.HighIO,
          items: dorisStorageTypeItems,
          decoratorProps: { label: 'Тип хранилища' },
          uiProps: { disabled: dorisStorageTypeItems.length === 1 },
        },
        backendNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'backendNodes.quantity',
          defaultValue: 3,
          decoratorProps: { label: 'Количество Backend Nodes' },
          uiProps: {
            min: 3,
            max: 100,
            step: 1,
            postfix: 'шт',
          },
        },
      },
    },

    masterNodesObj: {
      type: CONTROL.Object,
      ui: [['masterCpu', 'masterRam'], [['masterNodeCount']]],
      visible: true,
      watchedControls: { clusterType: 'clusterType' },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.HBase) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Master Nodes',
        labelTooltip: 'Используются для управления кластером',
      },
      controls: {
        masterCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'masterNodes.vCPU',
          defaultValue: '4',
          items: generateCpuItems([4, 8, 16, 32, 64]),
          decoratorProps: { label: 'Количество vCPU' },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['masterNodes.vCPU', value]];
            const rams = masterCoreCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['masterNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        masterRam: {
          type: CONTROL.Segmented,
          accessorKey: 'masterNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(masterCoreCpuToRamMap['4']),
          decoratorProps: { label: 'Объём RAM' },
          watchedControls: { cpu: 'masterNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? masterCoreCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        masterNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'masterNodes.quantity',
          defaultValue: 2,
          decoratorProps: { label: 'Количество Master Nodes' },
          uiProps: {
            min: 2,
            max: 2,
            step: 1,
            postfix: 'шт',
            disabled: true,
          },
        },
      },
    },

    coreNodesObj: {
      type: CONTROL.Object,
      ui: [['coreCpu', 'coreRam'], ['coreStorage', 'coreStorageType'], [['coreNodeCount']]],
      visible: true,
      watchedControls: {
        clusterType: 'clusterType',
        coreStorageType: 'coreNodes.storage.type',
      },
      relateFn: ({ clusterType }) => {
        if (clusterType !== ClusterType.HBase) {
          return { visible: false };
        }
      },
      decoratorProps: {
        label: 'Core Nodes',
        labelTooltip: 'Используются для обработки и хранения данных',
      },
      controls: {
        coreCpu: {
          type: CONTROL.Segmented,
          accessorKey: 'coreNodes.vCPU',
          defaultValue: '4',
          items: generateCpuItems([4, 8, 16, 32, 64]),
          decoratorProps: { label: 'Количество vCPU' },
          onChangeFn: (value, setValue) => {
            const updates: [string, AnyType][] = [['coreNodes.vCPU', value]];
            const rams = masterCoreCpuToRamMap[value];
            if (rams?.length) {
              updates.push(['coreNodes.RAM', String(rams[0])]);
            }
            setValue(updates);
          },
        },
        coreRam: {
          type: CONTROL.Segmented,
          accessorKey: 'coreNodes.RAM',
          defaultValue: '16',
          items: generateRamItems(masterCoreCpuToRamMap['4']),
          decoratorProps: { label: 'Объём RAM' },
          watchedControls: { cpu: 'coreNodes.vCPU' },
          relateFn: ({ cpu }: { cpu: string }) => {
            const items = cpu ? masterCoreCpuToRamMap[cpu] : undefined;
            if (items?.length) {
              return { items: generateRamItems(items) };
            }
          },
        },
        coreStorage: {
          type: CONTROL.Stepper,
          accessorKey: 'coreNodes.storage.space',
          defaultValue: 400,
          decoratorProps: { label: 'Объем хранилища' },
          uiProps: {
            min: 400,
            max: 30_000,
            step: 100,
            postfix: 'ГБ',
          },
          watchedControls: { coreStorageType: 'coreNodes.storage.type' },
          relateFn: ({ coreStorageType }) => {
            if (coreStorageType === StorageType.CommonSSD) {
              return { uiProps: { min: 1, max: 99_999_999_999, step: 1 } };
            }
            return { uiProps: { min: 400, max: 30_000, step: 100 } };
          },
        },
        coreStorageType: {
          type: CONTROL.SelectSingle,
          accessorKey: 'coreNodes.storage.type',
          defaultValue: StorageType.HighIO,
          items: coreStorageTypeItems,
          decoratorProps: { label: 'Тип хранилища' },
          uiProps: { disabled: coreStorageTypeItems.length === 1 },
        },
        coreNodeCount: {
          type: CONTROL.Stepper,
          accessorKey: 'coreNodes.quantity',
          defaultValue: 2,
          decoratorProps: { label: 'Количество Core Nodes' },
          uiProps: {
            min: 2,
            max: 20,
            step: 1,
            postfix: 'шт',
          },
        },
      },
    },
  },
};
