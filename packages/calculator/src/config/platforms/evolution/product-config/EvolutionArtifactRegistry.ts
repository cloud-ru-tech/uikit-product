import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_ARTIFACT_REGISTRY: FormConfig = {
  ui: ['tariffType', ['storageSize', 'outgoingTraffic']],
  controls: {
    tariffType: {
      type: CONTROL.Carousel,
      defaultValue: 'basic',
      accessorKey: 'tariff',
      items: [
        {
          value: 'basic',
          label: 'Базовый',
          description: 'В рамках этого тарифа Artifact Registry обеспечивает хранение и скачивание артефактов',
        },
        {
          value: 'premium',
          label: 'Премиум',
          description:
            'Этот тариф включает хранение и скачивание артефактов, сканирование образов на уязвимости, карантин и настройку политики удаления артефактов',
        },
      ],
      decoratorProps: {
        label: 'Тариф',
      },
    },
    storageSize: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Размер хранилища',
      },
      accessorKey: 'storageSize',
      defaultValue: 1,
      uiProps: {
        showHint: false,
        min: 1,
        max: 9_999_999_999,
        postfix: 'ГБ',
      },
    },
    outgoingTraffic: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Исходящий трафик',
        labelTooltip: 'Бесплатно до 100 ГБ',
      },
      accessorKey: 'outgoingTraffic',
      defaultValue: 0,
      uiProps: {
        showHint: false,
        min: 0,
        max: 9_999_999_999,
        postfix: 'ГБ',
      },
    },
  },
};
