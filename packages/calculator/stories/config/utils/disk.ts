import { CONTROL, ObjectControl, SelectSingleControl, StepperControl } from '@sbercloud/uikit-product-calculator';
import { ValueOf } from '@snack-uikit/utils';

export const SpecificationItem = {
  HDD: 'SAS',
  SSD: 'SSD',
} as const;

export const specificationItems = [
  {
    value: SpecificationItem.HDD,
    label: 'HDD',
  },
  {
    value: SpecificationItem.SSD,
    label: 'SSD',
  },
];

type DiskSpecification = ValueOf<typeof SpecificationItem>;

type GetDiskProps = {
  space: Pick<
    Partial<StepperControl>,
    'defaultValue' | 'accessorKey' | 'uiProps' | 'watchedControls' | 'relateFn' | 'onChangeFn' | 'decoratorProps'
  > & {
    label?: string;
  };
  specification: Pick<
    Partial<SelectSingleControl>,
    'accessorKey' | 'items' | 'uiProps' | 'watchedControls' | 'relateFn' | 'onChangeFn'
  > & {
    defaultValue?: DiskSpecification;
  };
};

export function getDisk({ space, specification }: GetDiskProps): ObjectControl {
  const {
    accessorKey: spaceKey = 'systemDisk.diskSpace',
    label: spaceLabel = 'Объем диска',
    uiProps: spaceUiProps,
    defaultValue: spaceDefaultValue = 0,
    decoratorProps: decoratorProps,
    ...restSpace
  } = space;

  const {
    accessorKey: specificationKey = 'systemDisk.specification',
    items = specificationItems,
    uiProps: specificationUiProps,
    defaultValue: specificationDefaultValue = SpecificationItem.HDD,
    ...restSpecification
  } = specification;

  return {
    type: 'object',
    ui: [{ controls: ['space', 'specification'] }],
    controls: {
      space: {
        type: CONTROL.Stepper,
        decoratorProps: {
          label: spaceLabel,
          ...decoratorProps,
        },
        accessorKey: spaceKey,
        defaultValue: spaceDefaultValue,
        uiProps: {
          min: 0,
          max: 9_999_999_999,
          postfix: 'ГБ',
          ...spaceUiProps,
        },
        ...restSpace,
      },
      specification: {
        type: CONTROL.SelectSingle,
        decoratorProps: {
          label: '',
        },
        accessorKey: specificationKey,
        defaultValue: specificationDefaultValue,
        items: items,
        uiProps: {
          showClearButton: false,
          searchable: false,
          ...specificationUiProps,
        },
        ...restSpecification,
      },
    },
  };
}
