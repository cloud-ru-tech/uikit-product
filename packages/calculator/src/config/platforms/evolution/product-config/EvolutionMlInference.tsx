import { CONTROL, FormConfig } from '../../../../components';
import { WORKING_HOURS_ITEMS, WorkingHoursSpecification } from '../../../../constants';
import { getMaxWorkingHoursAmount, getNumeralWord } from '../../../utils';

const LaunchMode = {
  ModelSharedGPU: 'model-shared-gpu',
  InstanceTypeGPU: 'instance-type-gpu',
} as const;

const ConfigurationType = {
  SharedReady: 'shared-ready',
  Custom: 'custom',
} as const;

const Configuration = {
  Qwen: 'qwen-qwen-2.5',
  Google: 'google',
  Baai: 'baai',
  BlackForest: 'black-forest',
  QwenQwq: 'qwen-qwq',
  DeepSeek: 'deepseek',
} as const;

const launchModeItems = [
  {
    label: 'Model Shared GPU',
    value: LaunchMode.ModelSharedGPU,
    description:
      'Запуск модели с возможностью частичного потребления GPU-ресурса (в пределах его физического объема памяти)',
  },
  {
    label: 'Instance Type GPU',
    value: LaunchMode.InstanceTypeGPU,
    description:
      'Запуск образа на преднастроенной конфигурации инстанса с поддержкой частичного потребления GPU-ресурса',
  },
];

const configurationTypeItems = [
  {
    label: 'Готовая',
    value: ConfigurationType.SharedReady,
    description: 'Преднастроенная конфигурация  для запуска популярных моделей',
  },
  {
    label: 'Пользовательская',
    value: ConfigurationType.Custom,
    description: 'С возможностью настроить собственную конфигурацию для запуска моделей',
  },
];

const configurationItems = [
  {
    label: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    value: Configuration.Qwen,
    description: (
      <div>
        Графический процессор NVIDIA® H100 PCIe
        <br />
        Видеопамять GPU 80 ГБ
        <br />
        Запросы к ML-моделям 5 млн запросов
        <br />
        Кэш ML-моделей 90 ГБ
      </div>
    ),
  },
  {
    label: 'google-bert/bert-base-uncased',
    value: Configuration.Google,
    description: (
      <div>
        Графический процессор NVIDIA® H100 PCIe
        <br />
        Видеопамять GPU 4 ГБ
        <br />
        Запросы к ML-моделям 10 млн запросов
        <br />
        Кэш ML-моделей 1 ГБ
      </div>
    ),
  },
  {
    label: 'BAAI/bge-reranker-v2-m3',
    value: Configuration.Baai,
    description: (
      <div>
        Графический процессор NVIDIA® V100 NVLink
        <br />
        Видеопамять GPU 4 ГБ
        <br />
        Запросы к ML-моделям 15 млн запросов
        <br />
        Кэш ML-моделей 1 ГБ
      </div>
    ),
  },
  {
    label: 'black-forest-labs/FLUX.1-dev',
    value: Configuration.BlackForest,
    description: (
      <div>
        Графический процессор NVIDIA® H100 NVLink
        <br />
        Видеопамять GPU 40 ГБ
        <br />
        Запросы к ML-моделям 300 млн запросов
        <br />
        Кэш ML-моделей 60 ГБ
      </div>
    ),
  },
  {
    label: 'Qwen/QwQ-32B',
    value: Configuration.QwenQwq,
    description: (
      <div>
        Графический процессор NVIDIA® H100 NVLink
        <br />
        Видеопамять GPU 80 ГБ
        <br />
        Запросы к ML-моделям 5 млн запросов
        <br />
        Кэш ML-моделей 70 ГБ
      </div>
    ),
  },
  {
    label: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
    value: Configuration.DeepSeek,
    description: (
      <div>
        Графический процессор NVIDIA® H100 NVLink
        <br />
        Видеопамять GPU 160 ГБ
        <br />
        Запросы к ML-моделям 4 млн запросов
        <br />
        Кэш ML-моделей 150 ГБ
      </div>
    ),
  },
];

const GpuValues = {
  NvidiaH100Pcie: 'nvidia-h100-pcie',
  NvidiaH100NVLink: 'nvidia-h100-nvlink',
  NvidiaA100Pcie: 'nvidia-a100-pcie',
  NvidiaV100NVLink: 'nvidia-v100-nvlink',
} as const;

const gpuItems = [
  {
    label: 'NVIDIA® H100 PCIe',
    value: GpuValues.NvidiaH100Pcie,
  },
  {
    label: 'NVIDIA® H100 NVLink',
    value: GpuValues.NvidiaH100NVLink,
  },
  {
    label: 'NVIDIA® A100 PCIe',
    value: GpuValues.NvidiaA100Pcie,
  },
  {
    label: 'NVIDIA® V100 NVLink',
    value: GpuValues.NvidiaV100NVLink,
  },
];

const gpuInstanceTypes = {
  [GpuValues.NvidiaH100Pcie]: [
    {
      label: 'NVIDIA® H100 PCIe',
      value: GpuValues.NvidiaH100Pcie + '-1gpu',
      description: (
        <div>
          1 GPU
          <br />
          20 vCPU
          <br />
          125 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 PCIe',
      value: GpuValues.NvidiaH100Pcie + '-2gpu',
      description: (
        <div>
          2 GPU
          <br />
          40 vCPU
          <br />
          250 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 PCIe',
      value: GpuValues.NvidiaH100Pcie + '-4gpu',
      description: (
        <div>
          4 GPU
          <br />
          80 vCPU
          <br />
          500 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 PCIe',
      value: GpuValues.NvidiaH100Pcie + '-6gpu',
      description: (
        <div>
          6 GPU
          <br />
          120 vCPU
          <br />
          750 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 PCIe',
      value: GpuValues.NvidiaH100Pcie + '-8gpu',
      description: (
        <div>
          8 GPU
          <br />
          160 vCPU
          <br />
          1000 ГБ RAM
        </div>
      ),
    },
  ],
  [GpuValues.NvidiaH100NVLink]: [
    {
      label: 'NVIDIA® H100 NVLink',
      value: GpuValues.NvidiaH100NVLink + '-1gpu',
      description: (
        <div>
          1 GPU
          <br />
          20 vCPU
          <br />
          190 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 NVLink',
      value: GpuValues.NvidiaH100NVLink + '-2gpu',
      description: (
        <div>
          2 GPU
          <br />
          40 vCPU
          <br />
          380 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 NVLink',
      value: GpuValues.NvidiaH100NVLink + '-4gpu',
      description: (
        <div>
          4 GPU
          <br />
          80 vCPU
          <br />
          760 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 NVLink',
      value: GpuValues.NvidiaH100NVLink + '-6gpu',
      description: (
        <div>
          6 GPU
          <br />
          120 vCPU
          <br />
          1140 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® H100 NVLink',
      value: GpuValues.NvidiaH100NVLink + '-8gpu',
      description: (
        <div>
          8 GPU
          <br />
          160 vCPU
          <br />
          1520 ГБ RAM
        </div>
      ),
    },
  ],
  [GpuValues.NvidiaA100Pcie]: [
    {
      label: 'NVIDIA® A100 PCIe',
      value: GpuValues.NvidiaA100Pcie + '-1gpu',
      description: (
        <div>
          1 GPU
          <br />
          20 vCPU
          <br />
          125 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® A100 PCIe',
      value: GpuValues.NvidiaA100Pcie + '-2gpu',
      description: (
        <div>
          2 GPU
          <br />
          40 vCPU
          <br />
          250 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® A100 PCIe',
      value: GpuValues.NvidiaA100Pcie + '-4gpu',
      description: (
        <div>
          4 GPU
          <br />
          80 vCPU
          <br />
          500 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® A100 PCIe',
      value: GpuValues.NvidiaA100Pcie + '-6gpu',
      description: (
        <div>
          6 GPU
          <br />
          120 vCPU
          <br />
          750 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® A100 PCIe',
      value: GpuValues.NvidiaA100Pcie + '-8gpu',
      description: (
        <div>
          8 GPU
          <br />
          160 vCPU
          <br />
          1000 ГБ RAM
        </div>
      ),
    },
  ],
  [GpuValues.NvidiaV100NVLink]: [
    {
      label: 'NVIDIA® V100 NVLink',
      value: GpuValues.NvidiaV100NVLink + '-1gpu',
      description: (
        <div>
          1 GPU
          <br />
          4 vCPU
          <br />
          64 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® V100 NVLink',
      value: GpuValues.NvidiaV100NVLink + '-2gpu',
      description: (
        <div>
          2 GPU
          <br />
          8 vCPU
          <br />
          128 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® V100 NVLink',
      value: GpuValues.NvidiaV100NVLink + '-4gpu',
      description: (
        <div>
          4 GPU
          <br />
          16 vCPU
          <br />
          256 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® V100 NVLink',
      value: GpuValues.NvidiaV100NVLink + '-8gpu',
      description: (
        <div>
          8 GPU
          <br />
          32 vCPU
          <br />
          512 ГБ RAM
        </div>
      ),
    },
    {
      label: 'NVIDIA® V100 NVLink',
      value: GpuValues.NvidiaV100NVLink + '-16gpu',
      description: (
        <div>
          16 GPU
          <br />
          64 vCPU
          <br />
          1024 ГБ RAM
        </div>
      ),
    },
  ],
};

export const EVOLUTION_ML_INFERENCE_FORM_CONFIG: FormConfig = {
  ui: [
    'mlInferenceLaunchMode',
    'mlInferenceConfigurationType',
    'mlInferenceConfiguration',
    ['mlInferenceGpu', 'mlInferenceGpuMemory'],
    'mlInferenceGpuInstanceType',
    'mlInferenceRequests',
    ['mlInferenceWorkingHours', 'mlInferenceWorkingHoursSpecification'],
  ],
  controls: {
    mlInferenceLaunchMode: {
      type: CONTROL.ToggleCards,
      accessorKey: 'mlInferenceLaunchMode',
      defaultValue: LaunchMode.ModelSharedGPU,
      items: launchModeItems,
      decoratorProps: {
        label: 'Способ запуска инференса',
      },
    },
    mlInferenceConfigurationType: {
      type: CONTROL.ToggleCards,
      accessorKey: 'mlInferenceConfigurationType',
      defaultValue: ConfigurationType.SharedReady,
      items: configurationTypeItems,
      decoratorProps: {
        label: 'Тип конфигурации',
      },
      watchedControls: {
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
      },
      relateFn: ({ mlInferenceLaunchMode }) => {
        if (mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    mlInferenceConfiguration: {
      type: CONTROL.ToggleCards,
      accessorKey: 'mlInferenceConfiguration',
      defaultValue: Configuration.Qwen,
      items: configurationItems,
      watchedControls: {
        mlInferenceConfigurationType: 'mlInferenceConfigurationType',
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
      },
      relateFn: ({ mlInferenceConfigurationType, mlInferenceLaunchMode }) => {
        if (
          mlInferenceConfigurationType !== ConfigurationType.SharedReady ||
          mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU
        ) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
      decoratorProps: {
        label: 'Конфигурация',
      },
    },
    mlInferenceGpu: {
      type: CONTROL.SelectSingle,
      accessorKey: 'mlInferenceGpu',
      items: gpuItems,
      decoratorProps: {
        label: 'Графический процессор',
      },
      watchedControls: {
        mlInferenceConfigurationType: 'mlInferenceConfigurationType',
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
      },
      relateFn: ({ mlInferenceConfigurationType, mlInferenceLaunchMode }) => {
        if (mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU) {
          return {
            uiProps: {
              visible: true,
            },
          };
        }
        if (mlInferenceConfigurationType === ConfigurationType.SharedReady) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    mlInferenceGpuMemory: {
      type: CONTROL.Stepper,
      accessorKey: 'mlInferenceGpuMemory',
      decoratorProps: {
        label: 'Объем видеопамяти GPU',
      },
      defaultValue: 4,
      uiProps: {
        min: 4,
        max: 80,
        postfix: 'ГБ',
        allowedValues: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
      },
      watchedControls: {
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
        mlInferenceConfigurationType: 'mlInferenceConfigurationType',
      },
      relateFn: ({ mlInferenceLaunchMode, mlInferenceConfigurationType }) => {
        if (
          mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU ||
          mlInferenceConfigurationType === ConfigurationType.SharedReady
        ) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    mlInferenceGpuInstanceType: {
      type: CONTROL.ToggleCards,
      accessorKey: 'mlInferenceGpuInstanceType',
      items: gpuInstanceTypes[GpuValues.NvidiaH100Pcie],
      decoratorProps: {
        label: 'Тип инстанса',
      },
      watchedControls: {
        mlInferenceGpu: 'mlInferenceGpu',
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
      },
      relateFn: ({
        mlInferenceGpu,
        mlInferenceLaunchMode,
      }: {
        mlInferenceGpu: keyof typeof gpuInstanceTypes;
        mlInferenceLaunchMode: string;
      }) => {
        if (mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU) {
          return {
            uiProps: {
              visible: true,
            },
            items: gpuInstanceTypes[mlInferenceGpu],
          };
        }

        return {
          uiProps: {
            visible: false,
          },
        };
      },
    },
    mlInferenceRequests: {
      type: CONTROL.Object,
      ui: [['mlInferenceRequestsCount', 'mlInferenceCacheVolume']],
      watchedControls: {
        mlInferenceConfigurationType: 'mlInferenceConfigurationType',
        mlInferenceLaunchMode: 'mlInferenceLaunchMode',
      },
      relateFn: ({ mlInferenceConfigurationType, mlInferenceLaunchMode }) => {
        if (mlInferenceLaunchMode === LaunchMode.InstanceTypeGPU) {
          return {
            visible: true,
          };
        }
        if (mlInferenceConfigurationType === ConfigurationType.SharedReady) {
          return {
            visible: false,
          };
        }
      },
      controls: {
        mlInferenceRequestsCount: {
          type: CONTROL.Stepper,
          accessorKey: 'mlInferenceRequestsCount',
          decoratorProps: {
            label: 'Количество запросов к ML-моделям',
          },
          defaultValue: 1,
          uiProps: {
            min: 1,
            max: 9_999_999_999,
            postfix: 'млн. шт.',
            showHint: false,
          },
        },
        mlInferenceCacheVolume: {
          type: CONTROL.Stepper,
          accessorKey: 'mlInferenceCacheVolume',
          decoratorProps: {
            label: 'Кэш ML-моделей',
          },
          defaultValue: 1,
          uiProps: {
            min: 1,
            max: 9_999_999_999,
            postfix: 'ГБ',
            showHint: false,
          },
        },
      },
    },
    mlInferenceWorkingHours: {
      type: CONTROL.Stepper,
      accessorKey: 'mlInferenceWorkingHours',
      defaultValue: 1,
      uiProps: {
        min: 1,
        max: 1,
        postfix: 'час',
      },
      decoratorProps: {
        label: 'Время работы',
      },
      watchedControls: {
        period: 'mlInferenceWorkingHoursSpecification',
        workingHours: 'mlInferenceWorkingHours',
      },
      relateFn: ({ period, workingHours }) => {
        const maxWorkingHours = getMaxWorkingHoursAmount(period, {
          hour: 1,
          day: 24,
          month: 744,
        });
        const isStepperDisabled = maxWorkingHours === 1;

        return {
          uiProps: {
            min: 1,
            max: maxWorkingHours,
            showHint: !isStepperDisabled,
            disabled: isStepperDisabled,
            postfix: getNumeralWord(workingHours, ['час', 'часа', 'часов']),
          },
        };
      },
    },
    mlInferenceWorkingHoursSpecification: {
      type: CONTROL.SelectSingle,
      accessorKey: 'mlInferenceWorkingHoursSpecification',
      defaultValue: WorkingHoursSpecification.Hour,
      items: WORKING_HOURS_ITEMS,
      uiProps: {
        showClearButton: false,
        searchable: false,
      },
      decoratorProps: {
        label: 'Период',
      },
      onChangePeriod: (period, setValue) => {
        setValue([['mlInferenceWorkingHoursSpecification', period]]);
      },
      canChangeWholePricePeriod: true,
    },
  },
};
