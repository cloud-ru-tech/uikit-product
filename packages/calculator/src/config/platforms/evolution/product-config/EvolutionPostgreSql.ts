import { CONTROL, FormConfig } from '../../../../components';
import { generateRamItems } from '../../../utils';

const DeploymentMode = {
  Standard: 'standart',
  Business: 'business',
};

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

const deploymentToVCpuMap = {
  [DeploymentMode.Standard]: [0.5, 1, 2],
  [DeploymentMode.Business]: [4, 8],
};

const deploymentVCpuToRamMap: Record<string, Record<string, number[]>> = {
  [DeploymentMode.Standard]: {
    '0.5': [1, 2, 4],
    '1': [2, 4, 8],
    '2': [4, 8, 16],
  },
  [DeploymentMode.Business]: {
    '4': [8, 16],
    '8': [32],
  },
};

const ramAmount = generateRamItems([1, 2, 4, 8, 16, 32]);

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
      items: [
        {
          label: 'Single',
          value: 'single',
          description: 'Одноузловая конфигурация',
        },
      ],
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
          defaultValue: '0.5',
          items: [],
          decoratorProps: {
            label: 'Количество ядер vCPU',
            labelTooltip: 'Виртуальные ядра',
          },
          watchedControls: { deploymentMode: 'deploymentMode' },
          relateFn: ({ deploymentMode }) => {
            const items = deploymentToVCpuMap?.[deploymentMode];

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
          defaultValue: '1',
          items: ramAmount.slice(0, 3),
          decoratorProps: {
            label: 'Количество оперативной памяти (RAM)',
          },
          watchedControls: { deploymentMode: 'deploymentMode', vCpu: 'flavorConfig.vCpu' },
          relateFn: ({ deploymentMode, vCpu }) => {
            const items = deploymentVCpuToRamMap?.[deploymentMode]?.[vCpu];

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
          relateFn: ({ deploymentMode }) => {
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
          },
        },
        specification: {
          type: CONTROL.SelectSingle,
          accessorKey: 'systemDisk.specification',
          decoratorProps: {
            label: '',
            // TODO: need disabled state hint
            // disabledHint: 'Скоро будут доступны другие типы дисков',
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
