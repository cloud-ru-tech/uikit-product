import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';

const domainZoneCards = [
  {
    value: 'Private',
    label: 'Приватная доменная зона',
  },
  {
    value: 'Public',
    label: 'Публичная доменная зона',
  },
  {
    value: 'null',
    label: 'DNS-сервер',
  },
];

const requestTypesCards = [
  {
    value: '0',
    label: 'Запросы к приватным доменным зонам',
  },
  {
    value: '1',
    label: 'Запросы к публичным доменным зонам',
    disabled: true,
  },
  {
    value: '2',
    label: 'Запросы к внешним доменным зонам',
    disabled: true,
  },
];

export const EVOLUTION_DNS_CONFIG: FormConfig = {
  ui: ['domainZone', 'requestTypes', ['requestCount']],
  controls: {
    domainZone: {
      decoratorProps: {
        label: 'Тип услуги',
      },
      type: CONTROL.Segmented,
      accessorKey: 'domainZone',
      defaultValue: domainZoneCards[0].value,
      items: domainZoneCards,
      onChangeFn: (value, setValue) => {
        const itemIndex = domainZoneCards.findIndex(domain => value === domain.value);

        const arr: [string, AnyType][] = [
          ['domainZone', value],
          ['requestTypes', String(itemIndex)],
        ];

        setValue(arr);
      },
    },
    requestTypes: {
      decoratorProps: {
        label: 'Тип запросов',
      },
      type: CONTROL.Segmented,
      accessorKey: 'requestTypes',
      defaultValue: requestTypesCards[0].value,
      items: requestTypesCards,
      watchedControls: { domainZone: 'domainZone' },
      relateFn: ({ domainZone }) => {
        const itemIndex = domainZoneCards.findIndex(domain => domainZone === domain.value);

        if (itemIndex >= 0) {
          return {
            items: requestTypesCards.map((type, index) => ({
              value: type.value,
              label: type.label,
              disabled: itemIndex !== index,
            })),
          };
        }
      },
    },
    requestCount: {
      type: CONTROL.Stepper,
      accessorKey: 'requestCount',
      defaultValue: 100,
      decoratorProps: {
        label: 'Количество запросов',
        labelTooltip: 'Бесплатно',
      },
      uiProps: {
        min: 100,
        max: 9_999_900,
        step: 100,
        postfix: 'тыс',
      },
      watchedControls: { requestTypes: 'requestTypes' },
      relateFn: ({ requestTypes }) => ({
        decoratorProps: {
          labelTooltip: requestTypes === '0' ? 'Бесплатно' : 'Бесплатно до 1 млн запросов',
        },
      }),
    },
  },
};
