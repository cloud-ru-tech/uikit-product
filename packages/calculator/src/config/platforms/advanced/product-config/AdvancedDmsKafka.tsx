import { CONTROL, FormConfig } from '../../../../components';
import { formatNumber } from '../../../../utils';
import { getDisk } from '../../../utils';

enum ConfigTypeItem {
  Kafka2_4 = 'kafka.2u4g.cluster',
  Kafka4_8 = 'kafka.4u8g.cluster',
  Kafka8_16 = 'kafka.8u16g.cluster',
  Kafka12_24 = 'kafka.12u24g.cluster',
  Kafka16_32 = 'kafka.16u32g.cluster',
}

const configItems = {
  [ConfigTypeItem.Kafka2_4]: {
    parts: '7',
    partition: '250',
    tps: '30000',
    throughput: '100',
    usersConnectionsCount: '2000',
    usersGroupCount: '20',
  },

  [ConfigTypeItem.Kafka4_8]: {
    parts: '14',
    partition: '500',
    tps: '100000',
    throughput: '200',
    usersConnectionsCount: '4000',
    usersGroupCount: '100',
  },

  [ConfigTypeItem.Kafka8_16]: {
    parts: '27',
    partition: '1000',
    tps: '150000',
    throughput: '375',
    usersConnectionsCount: '4000',
    usersGroupCount: '150',
  },

  [ConfigTypeItem.Kafka12_24]: {
    parts: '41',
    partition: '1500',
    tps: '200000',
    throughput: '625',
    usersConnectionsCount: '4000',
    usersGroupCount: '200',
  },

  [ConfigTypeItem.Kafka16_32]: {
    parts: '50',
    partition: '2000',
    tps: '250000',
    throughput: '750',
    usersConnectionsCount: '4000',
    usersGroupCount: '200',
  },
};

type Item = {
  parts: string;
  partition: string;
  tps: string;
  throughput: string;
  usersConnectionsCount: string;
  usersGroupCount: string;
};

function getDescription(configType: ConfigTypeItem) {
  const rows: Item = configItems[configType];
  const { parts, partition, tps, throughput, usersConnectionsCount, usersGroupCount } = rows;
  return (
    <>
      {formatNumber(Number(parts))} частей ядра виртуального процессора <br />
      {formatNumber(Number(partition))} партиций <br />
      {formatNumber(Number(tps))} TPS <br />
      {formatNumber(Number(throughput))} МБ/с пропускная способность <br />
      {formatNumber(Number(usersConnectionsCount))} пользовательский подключений <br />
      {formatNumber(Number(usersGroupCount))} пользовательских групп <br />
    </>
  ) as unknown as string;
}

const configTypeItems = [
  {
    value: ConfigTypeItem.Kafka2_4,
    label: `Флейвор ${ConfigTypeItem.Kafka2_4}`,
    description: getDescription(ConfigTypeItem.Kafka2_4),
  },
  {
    value: ConfigTypeItem.Kafka4_8,
    label: `Флейвор ${ConfigTypeItem.Kafka4_8}`,
    description: getDescription(ConfigTypeItem.Kafka4_8),
  },
  {
    value: ConfigTypeItem.Kafka8_16,
    label: `Флейвор ${ConfigTypeItem.Kafka8_16}`,
    description: getDescription(ConfigTypeItem.Kafka8_16),
  },
  {
    value: ConfigTypeItem.Kafka12_24,
    label: `Флейвор ${ConfigTypeItem.Kafka12_24}`,
    description: getDescription(ConfigTypeItem.Kafka12_24),
  },
  {
    value: ConfigTypeItem.Kafka16_32,
    label: `Флейвор ${ConfigTypeItem.Kafka16_32}`,
    description: getDescription(ConfigTypeItem.Kafka16_32),
  },
];

export const DMS_KAFKA_FORM_CONFIG: FormConfig = {
  ui: ['configType', ['evs'], ['brokersCount']],
  controls: {
    configType: {
      type: CONTROL.ToggleCards,
      accessorKey: 'config.type',
      defaultValue: ConfigTypeItem.Kafka2_4,
      items: configTypeItems,
      decoratorProps: {
        label: 'Тип конфигурации',
        labelTooltip: 'Данные конфигурации на 1 брокер в кластере',
      },
      onChangeFn: (value: ConfigTypeItem, setValue) => {
        setValue([['config', { ...configItems[value], type: value }]]);
      },
    },
    evs: getDisk({
      space: {
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 100,
        decoratorProps: {
          label: 'Объем системного диска',
          labelTooltip: (
            <>
              Объем хранилища на 1 брокер в кластере
              <br />
              Рекомендуем указывать объем хранилища исходя из ожидаемого размера сообщений и количества реплик.
              Например, если предполагаемый размер сообщения — 100 ГБ, то объем дискового пространства должен быть не
              менее: 100 ГБ x количество реплик + 100 ГБ (резервное пространство).
            </>
          ),
        },
        uiProps: {
          min: 100,
          max: 30000,
          showHint: true,
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        defaultValue: 'SSD',
      },
    }),
    brokersCount: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Количество брокеров',
      },
      accessorKey: 'brokersCount',
      defaultValue: 3,
      uiProps: {
        min: 3,
        max: 50,
        postfix: 'шт',
      },
    },
    // set-default value
    config: {
      type: CONTROL.Segmented,
      accessorKey: 'config',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultValue: configItems[ConfigTypeItem.Kafka2_4],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items: [configItems[ConfigTypeItem.Kafka2_4]],
      decoratorProps: {
        label: '',
      },
      uiProps: {
        visible: false,
      },
    },
  },
};
