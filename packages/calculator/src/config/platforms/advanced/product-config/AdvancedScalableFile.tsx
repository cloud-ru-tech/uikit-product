import { ValueOf } from '@snack-uikit/utils';

import { CONTROL, FormConfig } from '../../../../components';
import { AnyType } from '../../../../types';
import { getObs, UnitsOfCalculationItem } from '../../../utils';

const StorageClassItem = {
  Performance: 'Performance',
  Standard: 'Standard',
  StandardEnhanced: 'Standard-Enhanced',
  PerformanceEnhanced: 'Performance-Enhanced',
} as const;

type StorageClassItemType = ValueOf<typeof StorageClassItem>;

const storageClassItems = [
  {
    value: StorageClassItem.Standard,
    label: 'Standard',
    description: (
      <>
        150 MБ/с; <br />
        Макс. IOPS — 5000; <br />
        Время задержки: 2-5 мс; <br />
        Объем от 500 ГБ до 32 ТБ
      </>
    ),
  },
  {
    value: StorageClassItem.Performance,
    label: 'Performance',
    description: (
      <>
        300 MБ/с; <br />
        Макс. IOPS — 20 000; <br />
        Время задержки: 1-2 мс; <br />
        Объем от 500 ГБ до 32 ТБ
      </>
    ),
  },
  {
    value: StorageClassItem.StandardEnhanced,
    label: 'Standard-Enhanced',
    description: (
      <>
        1 ГБ/с; <br />
        Макс. IOPS — 15 000; <br />
        Время задержки: 2-5 мс; <br />
        Объем от 10 ТБ до 320 ТБ
      </>
    ),
  },
  {
    value: StorageClassItem.PerformanceEnhanced,
    label: 'Performance-Enhanced',
    description: (
      <>
        2 ГБ/с; <br />
        Макс. IOPS — 100 000; <br />
        Время задержки: 1-2 мс; <br />
        Объем от 10 ТБ до 320 ТБ
      </>
    ),
  },
];

export const SCALABLE_FILE_FORM_CONFIG: FormConfig = {
  ui: ['storageClass', ['storage']],
  controls: {
    storageClass: {
      type: CONTROL.Carousel,
      defaultValue: StorageClassItem.Standard,
      items: storageClassItems,
      accessorKey: 'sfs.storageClass',
      decoratorProps: {
        label: 'Класс хранилища',
      },
      onChangeFn: (value: StorageClassItemType, setValue) => {
        const arr: [string, AnyType][] = [
          ['sfs.storageClass', value],
          ['sfs.storage.unitsOfCalculation', UnitsOfCalculationItem.Gb],
        ];

        switch (value) {
          case StorageClassItem.StandardEnhanced:
          case StorageClassItem.PerformanceEnhanced: {
            arr.push(['sfs.storage.space', 10_240]);
            break;
          }

          case StorageClassItem.Standard:
          case StorageClassItem.Performance:
          default: {
            arr.push(['sfs.storage.space', 500]);
            break;
          }
        }

        setValue(arr);
      },
    },
    storage: getObs({
      space: {
        accessorKey: 'sfs.storage.space',
        label: 'Размер хранилища',
        defaultValue: 500,
        uiProps: {
          min: 500,
          max: 32_768,
          postfix: 'ГБ',
          showHint: true,
        },
        watchedControls: { storageClass: 'sfs.storageClass', specification: 'sfs.storage.unitsOfCalculation' },
        relateFn: ({ storageClass, specification }) => {
          if (specification === 'tb') {
            if ([StorageClassItem.StandardEnhanced, StorageClassItem.PerformanceEnhanced].includes(storageClass)) {
              return {
                uiProps: {
                  min: 10,
                  max: 320,
                  postfix: 'ТБ',
                },
              };
            }

            return {
              uiProps: {
                min: 1,
                max: 32,
                postfix: 'ТБ',
              },
            };
          }

          if ([StorageClassItem.StandardEnhanced, StorageClassItem.PerformanceEnhanced].includes(storageClass)) {
            return {
              uiProps: {
                min: 10_240,
                max: 327_680,
                postfix: 'ГБ',
              },
            };
          }
        },
      },
      units: {
        accessorKey: 'sfs.storage.unitsOfCalculation',
        defaultValue: 'gb',
        onChangeFn: (value: string, setValue) => {
          const arr: [string, AnyType][] = [['sfs.storage.unitsOfCalculation', value]];

          if (value === UnitsOfCalculationItem.Tb) {
            arr.push(['sfs.storage.space', 1]);
          }

          setValue(arr);
        },
      },
    }),
  },
};
