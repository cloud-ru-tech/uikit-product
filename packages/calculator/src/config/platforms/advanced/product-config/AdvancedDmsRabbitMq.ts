import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';
import { generateCpuItems, generateInstanceConfigItems, getDisk } from '../../../utils';

const instanceConfigitems = generateInstanceConfigItems([
  [2, 4],
  [4, 8],
  [8, 16],
  [16, 32],
]);

const InstanceTypeItem = {
  Single: 'Single-node',
  Cluster: 'Cluster',
};

const instanceTypeItems = [
  {
    value: InstanceTypeItem.Single,
    label: 'Single-Node',
  },
  {
    value: InstanceTypeItem.Cluster,
    label: 'Cluster',
  },
];

const instanceBrokersCountItems = generateCpuItems([1, 3, 5, 7]);

const accessorKey = {
  instanceType: 'instance.type',
  instanceConfig: 'instance.config',
  instanceBrokersCount: 'instance.brokersCount',
  evsDiskSpace: 'evs.systemDisk.diskSpace',
};

export const DSC_RABBIT_MQ_FORM_CONFIG: FormConfig = {
  ui: [['instanceType', 'instanceConfig'], 'instanceAlert', 'instanceBrokersCount', ['evs']],
  controls: {
    instanceType: {
      type: CONTROL.Segmented,
      accessorKey: accessorKey.instanceType,
      defaultValue: InstanceTypeItem.Single,
      items: instanceTypeItems,
      decoratorProps: {
        label: 'Тип инстанса',
      },
      onChangeFn: (value, setValue) => {
        const arr: [string, AnyType][] = [[accessorKey.instanceType, value]];

        switch (value) {
          case InstanceTypeItem.Cluster: {
            arr.push([accessorKey.evsDiskSpace, 600]);
            arr.push(['instance.brokersCount', '3']);
            arr.push([accessorKey.instanceConfig, '4 8']);
            break;
          }

          case InstanceTypeItem.Single:
          default: {
            arr.push([accessorKey.evsDiskSpace, 200]);
            arr.push(['instance.brokersCount', '1']);
            arr.push([accessorKey.instanceConfig, '2 4']);
          }
        }

        setValue(arr);
      },
    },
    instanceAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'В состав инстанса Single-Node входит только один брокер',
      },
      watchedControls: { instanceType: accessorKey.instanceType },
      relateFn: ({ instanceType }) => {
        if (instanceType !== InstanceTypeItem.Single) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    instanceConfig: {
      type: CONTROL.SelectSingle,
      accessorKey: accessorKey.instanceConfig,
      defaultValue: instanceConfigitems[0].value,
      items: instanceConfigitems,
      decoratorProps: {
        label: 'Конфигурация инстанса',
      },
      uiProps: {
        showClearButton: false,
        searchable: false,
      },
      watchedControls: { instanceType: accessorKey.instanceType },
      relateFn: ({ instanceType }) => {
        if (instanceType === instanceTypeItems[1].value) {
          return {
            items: instanceConfigitems.slice(1),
          };
        }
      },
    },
    instanceBrokersCount: {
      type: CONTROL.Segmented,
      accessorKey: accessorKey.instanceBrokersCount,
      defaultValue: instanceBrokersCountItems[0].value,
      items: instanceBrokersCountItems.slice(0, 1),
      decoratorProps: {
        label: 'Количество брокеров',
        labelTooltip:
          'Брокер — это приложение, которое преобразует сообщения и выступает посредником между другими приложениями',
      },
      uiProps: {
        visible: false,
      },
      watchedControls: { instanceType: accessorKey.instanceType },
      relateFn: ({ instanceType }) => {
        if (instanceType === instanceTypeItems[1].value) {
          return {
            items: instanceBrokersCountItems.slice(1),
            uiProps: {
              visible: true,
            },
          };
        }
      },
      onChangeFn: (value, setValue) => {
        const arr: [string, AnyType][] = [[accessorKey.instanceBrokersCount, value]];

        switch (value) {
          case '3': {
            arr.push([accessorKey.evsDiskSpace, 600]);
            break;
          }

          case '5': {
            arr.push([accessorKey.evsDiskSpace, 1000]);
            break;
          }

          case '7': {
            arr.push([accessorKey.evsDiskSpace, 1400]);
            break;
          }

          default: {
            arr.push([accessorKey.evsDiskSpace, 200]);
          }
        }

        setValue(arr);
      },
    },
    evs: getDisk({
      space: {
        accessorKey: accessorKey.evsDiskSpace,
        defaultValue: 200,
        uiProps: {
          min: 200,
          max: 90000,
        },
        watchedControls: { instanceBrokersCount: accessorKey.instanceBrokersCount },
        relateFn: ({ instanceBrokersCount }) => {
          switch (instanceBrokersCount) {
            case '3': {
              return {
                uiProps: {
                  min: 600,
                },
              };
            }
            case '5': {
              return {
                uiProps: {
                  min: 1000,
                },
              };
            }
            case '7': {
              return {
                uiProps: {
                  min: 1400,
                },
              };
            }
            default: {
              /* empty */
            }
          }
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
      },
    }),
  },
};
