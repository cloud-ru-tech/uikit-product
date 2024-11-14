import { CONTROL, ObjectControl, SelectSingleControl, StepperControl } from '@sbercloud/uikit-product-calculator';
import { ValueOf } from '@snack-uikit/utils';

export const UnitsOfCalculationItem = {
  Gb: 'gb',
  Tb: 'tb',
};

export const unitsOfCalculationItems = [
  {
    value: UnitsOfCalculationItem.Gb,
    label: 'ГБ',
  },
  {
    value: UnitsOfCalculationItem.Tb,
    label: 'ТБ',
  },
];

type GetObsProps = {
  space: Pick<
    Partial<StepperControl>,
    'defaultValue' | 'accessorKey' | 'uiProps' | 'watchedControls' | 'relateFn' | 'onChangeFn'
  > & {
    label?: string;
  };
  units: Pick<
    Partial<SelectSingleControl>,
    'accessorKey' | 'items' | 'uiProps' | 'watchedControls' | 'relateFn' | 'onChangeFn'
  > & {
    defaultValue?: ValueOf<typeof UnitsOfCalculationItem>;
  };
};

export function getObs({ space, units }: GetObsProps): ObjectControl {
  const {
    accessorKey: spaceKey = 'obs.space',
    label: spaceLabel = 'Объем хранилища',
    uiProps: spaceUiProps,
    defaultValue: spaceDefaultValue = 0,
    ...restSpace
  } = space;

  const {
    accessorKey: unitsKey = 'obs.unitsOfCalculation',
    items: unitsItems = unitsOfCalculationItems,
    uiProps: unitUiProps,
    defaultValue: unitsDefaultValue = UnitsOfCalculationItem.Gb,
    ...restUnits
  } = units;
  return {
    type: CONTROL.Object,
    ui: [{ controls: ['space', 'unitsOfCalculation'] }],
    controls: {
      space: {
        type: CONTROL.Stepper,
        decoratorProps: {
          label: spaceLabel,
        },
        accessorKey: spaceKey,
        defaultValue: spaceDefaultValue,
        uiProps: {
          min: 0,
          max: 9_999_999_900,
          postfix: 'ГБ',
          showHint: false,
          ...spaceUiProps,
        },
        watchedControls: { unitsOfCalculation: unitsKey },
        relateFn: ({ unitsOfCalculation }) => {
          if (unitsOfCalculation === UnitsOfCalculationItem.Tb) {
            return {
              uiProps: {
                max: 9_765_620,
                postfix: 'ТБ',
              },
            };
          }
        },
        ...restSpace,
      },
      unitsOfCalculation: {
        type: CONTROL.SelectSingle,
        accessorKey: unitsKey,
        decoratorProps: {
          label: '',
        },
        defaultValue: unitsDefaultValue,
        items: unitsItems,
        uiProps: {
          showClearButton: false,
          searchable: false,
          ...unitUiProps,
        },
        ...restUnits,
      },
    },
  };
}
