import { CONTROL, ToggleObjectControl } from '../../components';

const SpecificationItem = {
  Velocity: 'velocity',
  Traffic: 'traffic',
};

const specificationItems = [
  {
    value: SpecificationItem.Velocity,
    label: 'Пропускная способность',
  },
  {
    value: SpecificationItem.Traffic,
    label: 'Количество трафика',
  },
];

type GetEipProps = {
  switchKey?: string;
  velocityKey?: string;
  trafficKey?: string;
  specificationKey?: string;
};

export function getEip({
  switchKey = 'eipIsNeeded',
  velocityKey = 'eip.velocity',
  trafficKey = 'eip.trafficKey',
  specificationKey = 'eip.specification',
}: GetEipProps): ToggleObjectControl {
  return {
    type: CONTROL.ToggleObject,
    switchKey,
    decoratorProps: {
      label: 'Доступ в интернет',
    },
    control: {
      type: CONTROL.Object,
      ui: [['specification', 'velocity', 'traffic']],
      controls: {
        velocity: {
          type: CONTROL.Stepper,
          accessorKey: velocityKey,
          defaultValue: 100,
          decoratorProps: {
            label: 'Скорость',
            labelTooltip: 'Пропускная способность выделенной сети',
          },
          uiProps: {
            min: 1,
            max: 2000,
            step: 1,
            postfix: 'Mбит/сек',
          },
          watchedControls: { specification: specificationKey },
          relateFn: ({ specification }) => {
            if (specification === SpecificationItem.Traffic) {
              return {
                uiProps: {
                  visible: false,
                },
              };
            }
          },
        },
        traffic: {
          type: CONTROL.Stepper,
          accessorKey: trafficKey,
          defaultValue: 1,
          decoratorProps: {
            label: 'Количество трафика',
          },
          uiProps: {
            min: 1,
            max: 9_999_999_999,
            showHint: false,
            postfix: 'ГБ',
            step: 1,
          },
          watchedControls: { specification: specificationKey },
          relateFn: ({ specification }) => {
            if (specification === SpecificationItem.Velocity) {
              return {
                uiProps: {
                  visible: false,
                },
              };
            }
          },
        },
        specification: {
          type: CONTROL.SelectSingle,
          accessorKey: specificationKey,
          defaultValue: SpecificationItem.Velocity,
          items: specificationItems,
          decoratorProps: {
            label: 'Способ тарификации доступа в интернет',
          },
        },
      },
    },
  };
}
