import { CONTROL, FormConfig } from '../../../../components';

export const VM_WARE_VIRTUAL_MACHINES_BACKUP_FORM_CONFIG: FormConfig = {
  ui: ['vmWareVirtualMachinesBackup'],
  controls: {
    vmWareVirtualMachinesBackup: {
      type: CONTROL.Table,
      accessorKey: 'vmWareVirtualMachinesBackup',
      defaultValue: {
        backupVM: 0,
        // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- это имя свойства объекта, не использование localStorage API
        localStorage: 0,
        remoteStorage: 0,
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
          label: 'Локальное хранилище',
          accessorKey: 'localStorage',
          uiProps: {
            min: 0,
            max: 2_044_977,
            postfix: 'ГБ',
          },
          labelTooltip: 'Резервные копии хранятся на основной площадке',
        },
        {
          label: 'Удаленное хранилище',
          accessorKey: 'remoteStorage',
          uiProps: {
            min: 0,
            max: 2_044_977,
            postfix: 'ГБ',
          },
          labelTooltip:
            'Резервные копии хранятся на площадке, удаленной от основного ЦОДа. Рекомендуется выбирать удаленный репозиторий для повышения уровня безопасности',
        },
        {
          label: 'Неудаляемое хранилище',
          accessorKey: 'unremovableStorage',
          uiProps: {
            min: 0,
            max: 1_999_000,
            postfix: 'ГБ',
          },
          labelTooltip: 'Неудаляемое хранение резервных копий (Immutable Storage)',
        },
      ],
    },
  },
};
