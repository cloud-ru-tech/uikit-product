import { CONTROL, FormConfig } from '../../../../components';
import { generateCpuItems, generateRamItems, getObs } from '../../../utils';

const RedisVersionItem = {
  Redis3: '3',
  Redis4: '4',
  Redis5: '5',
  Redis6: '6',
};

const versionItems = [
  {
    value: RedisVersionItem.Redis3,
    label: 'Redis 3.0',
  },
  {
    value: RedisVersionItem.Redis4,
    label: 'Redis 4.0',
  },
  {
    value: RedisVersionItem.Redis5,
    label: 'Redis 5.0',
  },
  {
    value: RedisVersionItem.Redis6,
    label: 'Redis 6.0',
  },
];

const InstanceTypeItem = {
  MasterStandby: 'Master/Standby',
  SingleNode: 'Single-Node',
  ProxyCluster: 'Proxy Cluster',
  RedisCluster: 'Redis Cluster',
};

const instanceTypeItemMasterStandby = {
  value: InstanceTypeItem.MasterStandby,
  label: 'Master/Standby',
  description:
    'Каждый экземпляр работает на двух узлах кэша - один главный (для чтения/записи данных) и один резервный (реплицирует данныев режиме реального времени и берет на себя управление в случае сбоя основного кэш-узла',
};

const instanceTypeItemSingleNode = {
  value: InstanceTypeItem.SingleNode,
  label: 'Single-Node',
  description:
    'Каждый экземпляр работает только на одном узле кэша. В основном используются для временного хранения данных и не подходят для сценариев обслуживания с высокой надежностью, поддерживают интенсивные параллельные операции чтения/записи, но не обеспечивают сохранение данных',
};

const instanceTypeItemProxyCluster = {
  value: InstanceTypeItem.ProxyCluster,
  label: 'Proxy Cluster',
  description: 'Используется так же, как экземпляр с одним узлом. Приложения получают доступ к Redis через прокси',
};

const instanceTypeItemRedisCluster = {
  value: InstanceTypeItem.RedisCluster,
  label: 'Redis Cluster',
  description: 'Нативная распределенная реализация Redis. Приложения подключаются через клиентов Redis Cluster',
};

const versionToInstanceTypeMap = {
  [RedisVersionItem.Redis3]: [instanceTypeItemMasterStandby, instanceTypeItemSingleNode, instanceTypeItemProxyCluster],
  [RedisVersionItem.Redis4]: [instanceTypeItemMasterStandby, instanceTypeItemSingleNode, instanceTypeItemRedisCluster],
  [RedisVersionItem.Redis5]: [instanceTypeItemMasterStandby, instanceTypeItemSingleNode, instanceTypeItemRedisCluster],
  [RedisVersionItem.Redis6]: [instanceTypeItemMasterStandby, instanceTypeItemSingleNode],
};

const versionInstanceTypeToCacheSizeMap = {
  [RedisVersionItem.Redis3]: {
    [InstanceTypeItem.MasterStandby]: [2, 4, 8, 16, 32, 64],
    [InstanceTypeItem.SingleNode]: [2, 4, 8, 16, 32, 64],
    [InstanceTypeItem.ProxyCluster]: [64, 128, 256],
  },
  [RedisVersionItem.Redis4]: {
    [InstanceTypeItem.MasterStandby]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
    [InstanceTypeItem.SingleNode]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
    [InstanceTypeItem.RedisCluster]: [4, 8, 16, 32, 64, 128, 256],
  },
  [RedisVersionItem.Redis5]: {
    [InstanceTypeItem.MasterStandby]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
    [InstanceTypeItem.SingleNode]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
    [InstanceTypeItem.RedisCluster]: [4, 8, 16, 32, 64, 128, 256],
  },
  [RedisVersionItem.Redis6]: {
    [InstanceTypeItem.MasterStandby]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
    [InstanceTypeItem.SingleNode]: [1, 2, 4, 8, 16, 24, 32, 48, 64],
  },
};

const versionInstanceTypeToReplicasCountMap = {
  [RedisVersionItem.Redis3]: {
    [InstanceTypeItem.MasterStandby]: [],
    [InstanceTypeItem.SingleNode]: [],
    [InstanceTypeItem.ProxyCluster]: [],
  },
  [RedisVersionItem.Redis4]: {
    [InstanceTypeItem.MasterStandby]: [2, 3, 4, 5],
    [InstanceTypeItem.SingleNode]: [],
    [InstanceTypeItem.RedisCluster]: [1, 2, 3, 4, 5],
  },
  [RedisVersionItem.Redis5]: {
    [InstanceTypeItem.MasterStandby]: [2, 3, 4, 5],
    [InstanceTypeItem.SingleNode]: [],
    [InstanceTypeItem.RedisCluster]: [1, 2, 3, 4, 5],
  },
  [RedisVersionItem.Redis6]: {
    [InstanceTypeItem.MasterStandby]: [2],
    [InstanceTypeItem.SingleNode]: [],
  },
};

const cacheSizeItems = generateRamItems([2, 4, 8, 16, 32, 64]);

export const DCS_REDIS_FORM_CONFIG: FormConfig = {
  ui: [['version'], 'instanceType', ['cacheSize', 'instancesCount'], 'obsAlert', ['replicasCount'], ['obs']],
  controls: {
    version: {
      type: CONTROL.SelectSingle,
      accessorKey: 'version',
      defaultValue: RedisVersionItem.Redis3,
      items: versionItems,
      decoratorProps: {
        label: 'Версия',
        labelTooltip: `Экземпляры Redis версии 3.0 разворачиваются на виртуальных машинах за несколько минут, а версии 4.0, 5.0 и 6.0 — в контейнерах за несколько секунд.`,
      },
    },
    instanceType: {
      type: CONTROL.Carousel,
      accessorKey: 'instanceType',
      items: [...versionToInstanceTypeMap[RedisVersionItem.Redis3]],
      defaultValue: InstanceTypeItem.MasterStandby,
      decoratorProps: { label: 'Тип инстанса' },
      watchedControls: { version: 'version' },
      relateFn: ({ version }) => ({ items: versionToInstanceTypeMap[version] }),
    },
    cacheSize: {
      type: CONTROL.Segmented,
      accessorKey: 'cacheSize',
      defaultValue: cacheSizeItems[0].value,
      items: cacheSizeItems,
      decoratorProps: {
        label: 'Объем кэша',
        labelTooltip:
          'Брокер — это приложение, которое преобразует сообщения и выступает посредником между другими приложениями',
      },
      watchedControls: { version: 'version', instanceType: 'instanceType' },
      relateFn: ({ version, instanceType }) => {
        const items = versionInstanceTypeToCacheSizeMap[version][instanceType] || [];

        return {
          items: generateRamItems(items),
        };
      },
    },
    instancesCount: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Количество инстансов',
      },
      accessorKey: 'instancesCount',
      defaultValue: 1,
      uiProps: {
        min: 1,
        max: 100,
        postfix: 'Шт',
      },
    },
    obsAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Хранилище используется под бэкапы. Рекомендуем указывать объем не меньше объема кэша',
      },
      accessorKey: 'backup',
    },
    replicasCount: {
      type: CONTROL.Segmented,
      accessorKey: 'replicasCount',
      defaultValue: '1',
      items: generateCpuItems([1, 2, 3, 4, 5]),
      decoratorProps: {
        label: 'Количество реплик',
      },
      watchedControls: { version: 'version', instanceType: 'instanceType' },
      relateFn: ({ version, instanceType }) => {
        const items = versionInstanceTypeToReplicasCountMap?.[version]?.[instanceType];

        if (items?.length > 0) {
          return {
            items: generateCpuItems(items),
            uiProps: {
              visible: true,
            },
          };
        }

        return {
          uiProps: {
            visible: false,
          },
        };
      },
    },

    obs: getObs({
      space: {
        accessorKey: 'obs.space',
        defaultValue: 0,
        uiProps: {
          min: 0,
          max: 9_999_999_900,
        },
      },
      units: {
        accessorKey: 'obs.unitsOfCalculation',
      },
    }),
  },
};
