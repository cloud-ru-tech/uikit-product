import { CONTROL, FormConfig } from '../../../../components';

export const VM_WARE_CLOUD_BACKUP_FORM_CONFIG: FormConfig = {
  ui: ['vmWareCloudBackup'],
  controls: {
    vmWareCloudBackup: {
      type: CONTROL.Table,
      accessorKey: 'vmWareCloudBackup',
      defaultValue: {
        backupVM: 0,
        backupWorkStation: 0,
        backupServer: 0,
        cloudStorage: 0,
      },
      rows: [
        {
          label: 'Резервное копирование ВМ',
          accessorKey: 'backupVM',
          uiProps: {
            min: 0,
            max: 50_000,
            postfix: 'Шт',
          },
        },
        {
          label: 'Резервное копирование рабочей станции',
          accessorKey: 'backupWorkStation',
          uiProps: {
            min: 0,
            max: 50_000,
            postfix: 'Шт',
          },
        },
        {
          label: 'Резервное копирование сервера',
          accessorKey: 'backupServer',
          uiProps: {
            min: 0,
            max: 50_000,
            postfix: 'Шт',
          },
        },
        {
          label: 'Облачное хранилище',
          accessorKey: 'cloudStorage',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
          labelTooltip: 'Данные хранятся в облачном репозитории Cloud.ru',
        },
      ],
    },
  },
};
