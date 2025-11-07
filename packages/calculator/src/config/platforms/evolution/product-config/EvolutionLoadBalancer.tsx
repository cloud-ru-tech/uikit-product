import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_LOAD_BALANCER_CONFIG: FormConfig = {
  ui: [['availabilityZone'], ['incomingTraffic'], ['outcomingTraffic'], 'hasPublicIP'],
  controls: {
    availabilityZone: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'availabilityZone',
      decoratorProps: {
        label: 'Зоны доступности',
        labelTooltip: 'В каждой зоне доступности по две ресурсные единицы',
      },
      uiProps: {
        min: 1,
        max: 3,
        showHint: false,
        postfix: 'Шт',
      },
    },
    incomingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'incomingTraffic',
      decoratorProps: {
        label: 'Исходящий трафик',
        labelTooltip: 'Обработка балансировщиком L4 исходящего трафика',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        showHint: false,
        postfix: 'Гб',
      },
    },
    outcomingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'outcomingTraffic',
      decoratorProps: {
        label: 'Входящий трафик',
        labelTooltip: 'Обработка балансировщиком L4 входящего трафика',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        showHint: false,
        postfix: 'Гб',
      },
    },
    hasPublicIP: {
      type: CONTROL.Toggle,
      accessorKey: 'hasPublicIP',
      defaultValue: false,
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
    },
  },
};
