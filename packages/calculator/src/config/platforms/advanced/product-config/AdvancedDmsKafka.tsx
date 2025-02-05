import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';
import { getDisk } from '../../../utils';

const ConfigTypeItem = {
  Mini: 'mini',
  Small: 'small',
  Middle: 'middle',
  High: 'high',
};

const configItems = {
  [ConfigTypeItem.Mini]: {
    type: ConfigTypeItem.Mini,
    brokersCount: '3',
    throughput: '100',
    partition: '300',
    usersGroupCount: '60',
    usersConnectionsCount: '3000',
  },
  [ConfigTypeItem.Small]: {
    type: ConfigTypeItem.Small,
    brokersCount: '5',
    throughput: '300',
    partition: '900',
    usersGroupCount: '300',
    usersConnectionsCount: '10000',
  },
  [ConfigTypeItem.Middle]: {
    type: ConfigTypeItem.Middle,
    brokersCount: '5',
    throughput: '600',
    partition: '1800',
    usersGroupCount: '600',
    usersConnectionsCount: '20000',
  },

  [ConfigTypeItem.High]: {
    type: ConfigTypeItem.High,
    brokersCount: '10',
    throughput: '1200',
    partition: '1800',
    usersGroupCount: '600',
    usersConnectionsCount: '20000',
  },
};

type Item = {
  brokersCount: string;
  throughput: string;
  partition: string;
  usersGroupCount: string;
  usersConnectionsCount: string;
};

function getDescription({ brokersCount, throughput, partition, usersGroupCount, usersConnectionsCount }: Item) {
  return (
    <>
      Количество брокеров: {brokersCount} <br />
      Пропускная способность: {throughput} <br />
      Партиции: {partition} <br />
      Пользовательских групп: {usersGroupCount} <br />
      Пользовательских подключений: {usersConnectionsCount}
    </>
  ) as unknown as string;
}

const configTypeItems = [
  {
    value: ConfigTypeItem.Mini,
    label: 'Mini',
    description: getDescription(configItems[ConfigTypeItem.Mini]),
  },
  {
    value: ConfigTypeItem.Small,
    label: 'Small',
    description: getDescription(configItems[ConfigTypeItem.Small]),
  },
  {
    value: ConfigTypeItem.Middle,
    label: 'Middle',
    description: getDescription(configItems[ConfigTypeItem.Middle]),
  },
  {
    value: ConfigTypeItem.High,
    label: 'High',
    description: getDescription(configItems[ConfigTypeItem.High]),
  },
];

export const DMS_KAFKA_FORM_CONFIG: FormConfig = {
  ui: ['configType', ['evs']],
  controls: {
    configType: {
      type: CONTROL.Carousel,
      accessorKey: 'config.type',
      defaultValue: ConfigTypeItem.Mini,
      items: configTypeItems,
      decoratorProps: {
        label: 'Тип конфигурации',
      },
      onChangeFn: (value, setValue) => {
        const arr: [string, AnyType][] = [['config', configItems[value]]];

        switch (value) {
          case ConfigTypeItem.Mini: {
            arr.push(['evs.systemDisk.diskSpace', 600]);
            break;
          }
          case ConfigTypeItem.Small: {
            arr.push(['evs.systemDisk.diskSpace', 1200]);
            break;
          }
          case ConfigTypeItem.Middle: {
            arr.push(['evs.systemDisk.diskSpace', 2400]);
            break;
          }
          case ConfigTypeItem.High: {
            arr.push(['evs.systemDisk.diskSpace', 4800]);
            break;
          }
          default: {
            /* empty */
          }
        }

        setValue(arr);
      },
    },

    evs: getDisk({
      space: {
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 600,
        label: 'Объем системного диска',
        uiProps: {
          min: 600,
          max: 90000,

          showHint: true,
        },
        watchedControls: { configType: 'config.type' },
        relateFn: ({ configType }) => {
          switch (configType) {
            case ConfigTypeItem.Small: {
              return {
                uiProps: {
                  min: 1200,
                },
              };
            }
            case ConfigTypeItem.Middle: {
              return {
                uiProps: {
                  min: 2400,
                },
              };
            }
            case ConfigTypeItem.High: {
              return {
                uiProps: {
                  min: 4800,
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
        defaultValue: 'SSD',
        watchedControls: { configType: 'config.type' },
        relateFn: ({ configType }) => {
          switch (configType) {
            case ConfigTypeItem.Middle:
            case ConfigTypeItem.High: {
              return {
                items: [
                  {
                    value: 'SSD',
                    label: 'SSD',
                  },
                ],
                uiProps: {
                  disabled: true,
                },
              };
            }
            default: {
              /* empty */
            }
          }
        },
      },
    }),

    // set-default value
    config: {
      type: CONTROL.Segmented,
      accessorKey: 'config',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultValue: configItems[ConfigTypeItem.Mini],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items: [configItems[ConfigTypeItem.Mini]],
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
  },
};
