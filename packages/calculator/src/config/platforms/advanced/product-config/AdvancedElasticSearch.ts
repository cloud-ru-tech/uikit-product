import {
  CONTROL,
  FormConfig,
  ObjectControl,
  SelectSingleControl,
  StepperControl,
  ToggleObjectControl,
} from '../../../../components';
import { TooltipPlacement } from '../../../../components/Controls/types';
import { AnyType } from '../../../../types';
import { generateInstanceConfigItems, getDisk } from '../../../utils';

const ServerTypeItem = {
  ComputeIntensive: 'Compute-intensive',
  GeneralComputing: 'General computing',
  MemoryOptimized: 'Memory-optimized',
};

const serverTypeItems = [
  {
    value: ServerTypeItem.ComputeIntensive,
    label: 'Compute-intensive',
  },
  {
    value: ServerTypeItem.GeneralComputing,
    label: 'General computing',
  },
  {
    value: ServerTypeItem.MemoryOptimized,
    label: 'Memory-optimized',
  },
];

const InstanceConfigMap: Record<string, [number, number][]> = {
  [ServerTypeItem.ComputeIntensive]: [
    [4, 8],
    [8, 16],
    [16, 32],
    [32, 64],
  ],
  [ServerTypeItem.GeneralComputing]: [
    [4, 16],
    [8, 32],
    [16, 64],
    [32, 128],
  ],
  [ServerTypeItem.MemoryOptimized]: [
    [4, 32],
    [8, 64],
    [16, 128],
  ],
};

const serverTypeInstanceConfigToEvsDiskSpaceMap: Record<string, Record<string, [number, number]>> = {
  [ServerTypeItem.ComputeIntensive]: {
    '4 8': [40, 1_500],
    '8 16': [80, 1_600],
    '16 32': [100, 3_200],
    '32 64': [320, 10_240],
  },
  [ServerTypeItem.GeneralComputing]: {
    '4 16': [40, 1_600],
    '8 32': [80, 3_200],
    '16 64': [100, 6_400],
    '32 128': [100, 10_240],
  },
  [ServerTypeItem.MemoryOptimized]: {
    '4 32': [40, 2560],
    '8 64': [80, 5_120],
    '16 128': [160, 10_240],
  },
};

const baseInstanceConfigItems = generateInstanceConfigItems(InstanceConfigMap[ServerTypeItem.ComputeIntensive]);

type GetNodeConfigProps = {
  prefix: string;
  diskProps: {
    min: number;
    max: number;
    defaultValue: number;
  };
  nodeCountProps: {
    min: number;
    max: number;
    defaultValue: number;
  };
};

function getAccessorKey(prefix: string) {
  return {
    serverType: `${prefix}.serverType`,
    instanceConfig: `${prefix}.instanceConfig`,
    evsDiskSpace: `${prefix}.evs.systemDisk.diskSpace`,
    evsDiskSpecification: `${prefix}.evs.systemDisk.specification`,
    nodeCount: `${prefix}.nodeCount`,
  };
}

function getNodeConfigControls({ prefix, diskProps, nodeCountProps }: GetNodeConfigProps): {
  serverType: SelectSingleControl;
  instanceConfig: SelectSingleControl;
  evs: ObjectControl;
  nodeCount: StepperControl;
} {
  const accessorKey = getAccessorKey(prefix);

  return {
    serverType: {
      type: CONTROL.SelectSingle,
      accessorKey: accessorKey.serverType,
      defaultValue: ServerTypeItem.ComputeIntensive,
      items: serverTypeItems,
      decoratorProps: {
        label: 'Тип сервера',
      },
    },
    instanceConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: accessorKey.instanceConfig,
      defaultValue: baseInstanceConfigItems[0].value,
      items: baseInstanceConfigItems,
      decoratorProps: {
        label: 'Спецификация ноды',
      },
      watchedControls: { serverType: accessorKey.serverType },
      relateFn: ({ serverType }) => ({
        items: generateInstanceConfigItems(InstanceConfigMap[serverType]),
      }),
    },
    evs: getDisk({
      space: {
        accessorKey: accessorKey.evsDiskSpace,
        label: 'Объем системного диска',
        defaultValue: diskProps.defaultValue,
        uiProps: {
          min: diskProps.min,
          max: diskProps.max,
        },
      },
      specification: {
        accessorKey: accessorKey.evsDiskSpecification,
        defaultValue: 'SSD',
      },
    }),
    nodeCount: {
      type: CONTROL.Stepper,
      accessorKey: accessorKey.nodeCount,
      defaultValue: nodeCountProps.defaultValue,
      decoratorProps: {
        label: 'Количество нод',
      },
      uiProps: {
        min: nodeCountProps.min,
        max: nodeCountProps.max,
        postfix: 'Шт',
      },
    },
  };
}

function getNodeConfig(props: GetNodeConfigProps): ObjectControl {
  const { evs, serverType, instanceConfig, nodeCount } = getNodeConfigControls(props);

  return {
    type: CONTROL.Object,
    ui: [
      ['serverType', 'instanceConfig'],
      ['evs', 'nodeCount'],
    ],
    controls: {
      serverType,
      instanceConfig,
      evs,
      nodeCount,
    },
  };
}

type GetToggleNodeConfigProps = GetNodeConfigProps & {
  label: string;
  labelTooltip: string;
  tooltipPlacement?: TooltipPlacement;
};

function getToggleNodeConfig({
  label,
  labelTooltip,
  tooltipPlacement,
  ...rest
}: GetToggleNodeConfigProps): ToggleObjectControl {
  return {
    type: CONTROL.ToggleObject,
    decoratorProps: {
      label,
      labelTooltip,
      tooltipPlacement,
    },
    switchKey: `${rest.prefix}.isIncluded`,
    control: getNodeConfig(rest),
  };
}

function getBaseNodeConfig(props: GetNodeConfigProps): ObjectControl {
  const { serverType, instanceConfig, nodeCount } = getNodeConfigControls(props);

  const accessorKey = getAccessorKey(props.prefix);

  return {
    type: CONTROL.Object,
    ui: [
      ['serverType', 'instanceConfig'],
      ['evs', 'nodeCount'],
    ],
    controls: {
      serverType: {
        ...serverType,
        onChangeFn: (value, setValue) => {
          const arr: [string, AnyType][] = [[accessorKey.serverType, value]];
          const instanceConfigValue = generateInstanceConfigItems(InstanceConfigMap[value])[0].value;

          arr.push([accessorKey.instanceConfig, instanceConfigValue]);
          arr.push([accessorKey.evsDiskSpace, 40]);

          setValue(arr);
        },
      },
      instanceConfig: {
        ...instanceConfig,
        onChangeFn: (value, setValue) => {
          const arr: [string, AnyType][] = [[accessorKey.instanceConfig, value]];
          arr.push([accessorKey.evsDiskSpace, 40]);

          setValue(arr);
        },
      },
      evs: getDisk({
        space: {
          accessorKey: accessorKey.evsDiskSpace,
          label: 'Объем системного диска',
          defaultValue: props.diskProps.defaultValue,
          uiProps: {
            min: props.diskProps.min,
            max: props.diskProps.max,
          },
          watchedControls: { serverType: accessorKey.serverType, instanceConfig: accessorKey.instanceConfig },
          relateFn: ({ serverType, instanceConfig }) => {
            const [min, max] = serverTypeInstanceConfigToEvsDiskSpaceMap?.[serverType]?.[instanceConfig] || [];

            if (min || max) {
              return {
                uiProps: {
                  min,
                  max,
                },
              };
            }
          },
        },
        specification: {
          accessorKey: accessorKey.evsDiskSpecification,
          defaultValue: 'SSD',
        },
      }),
      nodeCount,
    },
  };
}

export const ELASTIC_SEARCH_FORM_CONFIG: FormConfig = {
  ui: ['baseNodeConfig', 'masterNodeConfig', 'clientNodeConfig', 'coldDataNodeConfig', 'internet'],
  controls: {
    baseNodeConfig: getBaseNodeConfig({
      prefix: 'baseNodeConfig',
      diskProps: {
        defaultValue: 40,
        min: 40,
        max: 1500,
      },
      nodeCountProps: {
        defaultValue: 1,
        min: 1,
        max: 200,
      },
    }),

    masterNodeConfig: getToggleNodeConfig({
      label: 'Master node',
      labelTooltip:
        'Мастер-узел, который управляет всеми узлами в кластере. Если для хранения и обработки данных требуется 20 или более узлов, рекомендуется включить мастер-узел, чтобы обеспечить стабильную работу кластера',
      prefix: 'masterNodeConfig',
      diskProps: {
        defaultValue: 40,
        min: 40,
        max: 40,
      },
      nodeCountProps: {
        defaultValue: 3,
        min: 3,
        max: 9,
      },
    }),

    clientNodeConfig: getToggleNodeConfig({
      label: 'Client node',
      labelTooltip:
        'Клиент-узел, который позволяет клиентам получать доступ к кластерам и анализировать данные. Если для хранения и обработки данных требуется 20 или более узлов, рекомендуется включить клиент-узел, чтобы обеспечить стабильную работу кластера',
      prefix: 'clientNodeConfig',
      diskProps: {
        defaultValue: 40,
        min: 40,
        max: 40,
      },
      nodeCountProps: {
        defaultValue: 1,
        min: 1,
        max: 32,
      },
    }),

    coldDataNodeConfig: getToggleNodeConfig({
      label: 'Cold data node',
      labelTooltip:
        'Холодный узел, который используется для хранения архивных данных. Если быстрый ответ (получение данных из холодного узла занимает несколько минут) не требуется, используйте узлы данного типа',
      prefix: 'coldDataNodeConfig',
      diskProps: {
        defaultValue: 40,
        min: 40,
        max: 1500,
      },
      nodeCountProps: {
        defaultValue: 1,
        min: 1,
        max: 32,
      },
    }),

    internet: {
      type: CONTROL.ToggleObject,
      switchKey: 'internet.isIncluded',
      decoratorProps: {
        label: 'Доступ в интернет',
      },
      control: {
        type: CONTROL.Object,
        ui: [['speed']],
        controls: {
          speed: {
            type: CONTROL.Stepper,
            accessorKey: 'internet.speed',
            defaultValue: 100,
            decoratorProps: {
              label: 'Скорость',
            },
            uiProps: {
              min: 1,
              max: 2000,
              postfix: 'Mбит/сек',
            },
          },
        },
      },
    },
  },
};
