import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_ARTIFACT_REGISTRY: FormConfig = {
  ui: [['storageSize', 'outgoingTraffic']],
  controls: {
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
