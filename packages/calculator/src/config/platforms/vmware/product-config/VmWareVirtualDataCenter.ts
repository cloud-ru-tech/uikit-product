import { CONTROL, FormConfig } from '../../../../components';

const payAsYouGoTooltip =
  'При модели pay-as-you-go оплачивается фактическое использование ресурсов в почасовом режиме, начиная с первой минуты использования ресурсов. Тарифицируется сумма используемых ресурсов для всех VM. Ресурсы виртуального процессора и памяти тарифицируются в период работы VM. Ресурсы хранения тарифицируются после создания VM и не зависят от состояния активности VM. Для каждой VM учитываются максимальные значения ресурсов за каждый час. Неполные часы использования ресурсов округляются до полного часа.';
const payAsYouAllocateTooltip =
  'При модели Allocation ресурсы начинают тарифицироваться при создании виртуального ЦОД. Использование или не использование ресурсов внутри виртуального ЦОД не влияет на тарификацию. Например, если вы создали виртуальный ЦОД с объемом оперативной памяти 500 ГБ, а VM внутри ЦОД используют только 100 ГБ, тарифицироваться будут 500 ГБ.';

export const VIRTUAL_DATA_CENTER_FORM_CONFIG: FormConfig = {
  ui: ['instancePayg', 'instancePaya', 'additionalServices', 'os'],
  controls: {
    instancePayg: {
      type: CONTROL.Table,
      decoratorProps: {
        label: 'Pay As You Go',
        labelTooltip: payAsYouGoTooltip,
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
        label: 'Pay As You Allocate',
        labelTooltip: payAsYouAllocateTooltip,
        tooltipPlacement: 'right',
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
        osRosaServerKobaltFstek: 0,
        osRosaServerHromStandart: 0,
        osRosaRabochayaStantsiyaHromStandart: 0,
        osStandard: 0,
        osDatacenter: 0,
      },
      rows: [
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
