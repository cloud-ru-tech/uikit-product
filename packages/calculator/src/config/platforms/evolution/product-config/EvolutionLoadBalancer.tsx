import { CONTROL, FormConfig } from '../../../../components';
import { FormValues } from '../../../../types';

function transformEvolutionLoadBalancerValues(values: FormValues): FormValues {
  const { availabilityZone, replicasInAZ, ...restValues } = values;

  return {
    ...restValues,
    replicasInAZs: Number(availabilityZone) * Number(replicasInAZ),
  };
}

export const EVOLUTION_LOAD_BALANCER_CONFIG: FormConfig = {
  ui: [['availabilityZone'], ['replicasInAZ'], ['outcomingTraffic'], ['incomingTraffic'], 'hasPublicIP'],
  transformValues: transformEvolutionLoadBalancerValues,
  controls: {
    availabilityZone: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'availabilityZone',
      decoratorProps: {
        label: 'Зоны доступности',
      },
      uiProps: {
        min: 1,
        max: 3,
        showHint: false,
        postfix: 'Шт',
      },
    },
    replicasInAZ: {
      type: CONTROL.Slider,
      defaultValue: '2',
      accessorKey: 'replicasInAZ',
      decoratorProps: {
        label: 'Ресурсных единиц в зонах доступности',
        labelTooltip:
          'Ресурсная единица — компонент балансировщика, обрабатывающий трафик в выбранной зоне доступности.',
      },
      items: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    outcomingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'outcomingTraffic',
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
    incomingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'incomingTraffic',
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
