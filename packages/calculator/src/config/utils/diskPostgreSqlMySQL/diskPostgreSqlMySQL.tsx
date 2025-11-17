import { QuestionRoundSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@snack-uikit/tooltip';
import { ValueOf } from '@snack-uikit/utils';

import { CONTROL, ObjectControl, SelectSingleControl, StepperControl } from '../../../components';
import styles from './styles.module.scss';

export const SpecificationItem = {
  Extreme_SSD: 'Extreme SSD',
  Cloud_SSD: 'Cloud SSD',
  ESSD: 'ESSD',
} as const;

export const specificationItems = [
  {
    value: SpecificationItem.Extreme_SSD,
    label: 'Extreme SSD',
    afterContent: (
      <Tooltip tip='Диски Ultra-high I/O с увеличенной пропускной способностью'>
        <QuestionRoundSVG size={20} className={styles.icon} data-test-id='field-decorator__label-tooltip-trigger' />
      </Tooltip>
    ),
  },
  {
    value: SpecificationItem.Cloud_SSD,
    label: 'Cloud SSD',
    afterContent: (
      <Tooltip tip='Диски Ultra-high I/O'>
        <QuestionRoundSVG size={20} className={styles.icon} data-test-id='field-decorator__label-tooltip-trigger' />
      </Tooltip>
    ),
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
    defaultValue: specificationDefaultValue = SpecificationItem.Cloud_SSD,
    ...restSpecification
  } = specification;

  return {
    type: 'object',
    ui: ['space', 'specification'],
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
