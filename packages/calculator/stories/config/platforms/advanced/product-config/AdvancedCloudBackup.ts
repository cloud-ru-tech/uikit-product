import { CONTROL, FormConfig } from '@sbercloud/uikit-product-calculator';

import { getObs } from '../../../utils/obs';

const StorageClassItem = {
  VirtualServer: 'Virtual server',
  Volume: 'Volume',
  SFSTurbo: 'SFS Turbo',
};

const storageClassItems = [
  {
    value: StorageClassItem.VirtualServer,
    label: 'Virtual server',
    description:
      'Предназначен для сервисов Elastic Cloud Server (ECS) и Bare Metal Server (BMS), с помощью которого осуществляется бэкап системных дисков и дисков с данными.',
  },
  {
    value: StorageClassItem.Volume,
    label: 'Volume',
    description:
      'Предназначен для сервиса Elastic Volume Sevice (EVS), с помощью которого осуществляется бэкап системных дисков или дисков с данными.',
  },
  {
    value: StorageClassItem.SFSTurbo,
    label: 'SFS Turbo',
    description:
      'Предназначен для сервиса Scalable File Service (SFS), с помощью которого осуществляется бэкап файлового хранилища.',
  },
];

export const CLOUD_BACKUP_FORM_CONFIG: FormConfig = {
  ui: ['serviceAlert', 'service', ['storage']],
  controls: {
    serviceAlert: {
      type: CONTROL.Alert,
      uiProps: {
        description: 'Рекомендуем выбирать объем хранилища под бэкапы на 20% больше объема самого продукта',
      },
    },
    service: {
      type: CONTROL.Carousel,
      defaultValue: StorageClassItem.VirtualServer,
      items: storageClassItems,
      accessorKey: 'cbr.service',
      decoratorProps: {
        label: 'Тип продукта',
      },
    },
    storage: getObs({
      space: {
        accessorKey: 'cbr.storage.space',
        label: 'Размер хранилища',
        defaultValue: 1,
        uiProps: {
          min: 1,
        },
      },
      units: {
        accessorKey: 'cbr.storage.unitsOfCalculation',
        defaultValue: 'gb',
      },
    }),
  },
};
