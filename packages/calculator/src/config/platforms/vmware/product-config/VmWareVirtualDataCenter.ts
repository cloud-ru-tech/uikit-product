import { CONTROL, FormConfig } from '../../../../components';

export const VIRTUAL_DATA_CENTER_FORM_CONFIG: FormConfig = {
  ui: ['alert', 'instancePayg', 'instancePaya', 'additionalServices', 'os'],
  controls: {
    alert: {
      type: CONTROL.Alert,
      uiProps: {
        description:
          'Продукт тарифицируется по модели Allocation — все зарезервированные ресурсы оплачиваются независимо от их фактического потребления. Оплата раз в месяц.',
      },
    },
    instancePayg: {
      type: CONTROL.Table,
      decoratorProps: {
        label: 'Ресурсы Pay As You Go',
      },
      accessorKey: 'instancePayg',
      defaultValue: {
        vCpu26: 0,
        vCpu30: 0,
        ram: 0,
        sata: 0,
        ssd: 0,
        workTime: 1,
      },
      counter: {
        label: 'Время работы в месяц',
        accessorKey: 'workTime',
        uiProps: {
          min: 1,
          max: 744,
          postfix: 'ч',
        },
      },
      rows: [
        {
          label: 'Количество vCPU 2.6 GHz',
          accessorKey: 'vCpu26',
          uiProps: {
            min: 0,
            max: 9_999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Количество vCPU 3.0 GHz',
          accessorKey: 'vCpu30',
          uiProps: {
            min: 0,
            max: 9_999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Оперативная память (RAM)',
          accessorKey: 'ram',
          uiProps: {
            min: 0,
            max: 99_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Жесткий диск SATA',
          accessorKey: 'sata',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Жесткий диск SSD',
          accessorKey: 'ssd',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
      ],
    },
    instancePaya: {
      type: CONTROL.Table,
      decoratorProps: {
        label: 'Ресурсы Pay As You Allocate',
      },
      accessorKey: 'instancePaya',
      defaultValue: {
        vCpu26: 0,
        vCpu30: 0,
        vCpu35: 0,
        ram: 0,
        sata: 0,
        ssd: 0,
      },
      rows: [
        {
          label: 'Количество vCPU 2.6 GHz',
          accessorKey: 'vCpu26',
          uiProps: {
            min: 0,
            max: 9_999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Количество vCPU 3.0 GHz',
          accessorKey: 'vCpu30',
          uiProps: {
            min: 0,
            max: 9_999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Количество vCPU 3.5 GHz',
          accessorKey: 'vCpu35',
          uiProps: {
            min: 0,
            max: 9_999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Оперативная память (RAM)',
          accessorKey: 'ram',
          uiProps: {
            min: 0,
            max: 99_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Жесткий диск SATA',
          accessorKey: 'sata',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Жесткий диск SSD',
          accessorKey: 'ssd',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
      ],
    },
    additionalServices: {
      type: CONTROL.Table,
      decoratorProps: {
        label: 'Дополнительные сервисы',
      },
      accessorKey: 'additionalServices',
      defaultValue: {
        ipQuantity: 0,
        velocity: 0,
        virtualMachineBackup: 0,
        dataCenterBackup: 0,
        remoteBackup: 0,
        databaseManageSystemEnterpriseCore: 0,
        databaseManageSystemStandardCore: 0,
        databaseManageSystemStandard: 0,
        databaseManageSystemWebEdition: 0,
      },
      rows: [
        {
          label: 'Количество IP-адресов',
          accessorKey: 'ipQuantity',
          uiProps: {
            min: 0,
            max: 100,
            postfix: 'Шт',
          },
        },
        {
          label: 'Скорость доступа в интернет',
          labelTooltip: 'Доступ в интернет до 100Мбит/с не тарифицируется',
          accessorKey: 'velocity',
          allowedValues: [0, 100, 200, 500, 1000],
          uiProps: {
            min: 0,
            max: 1_000,
            step: 100,
            postfix: 'Мбит/с',
          },
        },
        {
          label: 'Резервное копирование ВМ',
          accessorKey: 'virtualMachineBackup',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Хранение копий в том же ЦОД',
          accessorKey: 'dataCenterBackup',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Хранение копий в другом ЦОД',
          accessorKey: 'remoteBackup',
          uiProps: {
            min: 0,
            max: 999_999,
            postfix: 'ГБ',
          },
        },
        {
          label: 'Серверная СУБД Enterprise Core',
          labelTooltip: 'Лицензия на 2 ядра',
          accessorKey: 'databaseManageSystemEnterpriseCore',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Серверная СУБД Standard Core',
          labelTooltip: 'Лицензия на 2 ядра',
          accessorKey: 'databaseManageSystemStandardCore',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Серверная СУБД Standard',
          accessorKey: 'databaseManageSystemStandard',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Серверная СУБД Web Edition',
          labelTooltip: 'Лицензия на 2 ядра',
          accessorKey: 'databaseManageSystemWebEdition',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
      ],
    },
    os: {
      type: CONTROL.Table,
      decoratorProps: {
        label: 'Операционные системы',
      },
      accessorKey: 'os',
      defaultValue: {
        osAltServer10: 0,
        osAltRabochayaStantsiya10: 0,
        osAltServerSp8Fstek: 0,
        osRedOsServer73Fstek: 0,
        osRedOsServer73Standart: 0,
        osRedOsRabochayaStantsiya73Fstek: 0,
        osRedOsRabochayaStantsiya73Standart: 0,
        osRosaServerKobaltFstek: 0,
        osRosaServerHromStandart: 0,
        osRosaRabochayaStantsiyaHromStandart: 0,
        osStandard: 0,
        osDatacenter: 0,
      },
      rows: [
        {
          label: 'Альт Сервер 10',
          accessorKey: 'osAltServer10',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Альт Рабочая станция 10',
          accessorKey: 'osAltRabochayaStantsiya10',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Альт Сервер СП 8 ФСТЭК',
          accessorKey: 'osAltServerSp8Fstek',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Роса Сервер "КОБАЛЬТ" ФСТЭК',
          accessorKey: 'osRosaServerKobaltFstek',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Роса Сервер "ХРОМ" Стандарт',
          accessorKey: 'osRosaServerHromStandart',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Роса Рабочая станция "ХРОМ" Стандарт',
          accessorKey: 'osRosaRabochayaStantsiyaHromStandart',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Dataсenter',
          labelTooltip: 'Лицензия на 2 ядра',
          accessorKey: 'osDatacenter',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
        {
          label: 'Standard',
          labelTooltip: 'Лицензия на 2 ядра',
          accessorKey: 'osStandard',
          uiProps: {
            min: 0,
            max: 999,
            postfix: 'Шт',
          },
        },
      ],
    },
  },
};
