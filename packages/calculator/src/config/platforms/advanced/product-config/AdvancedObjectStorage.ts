import { CONTROL, FormConfig, StepperControl } from '../../../../components';
import { getObs, UnitsOfCalculationItem } from '../../../utils';

const StorageClassItem = {
  Cold: 'Cold',
  Standard: 'Standard',
  Warm: 'Warm',
};

const storageClassItems = [
  {
    value: StorageClassItem.Standard,
    label: 'Горячее (Standard)',
    description:
      'Стандартный класс хранения обеспечивает высокий уровень доступа и применим как к большим массивам данных, к которым требуется частый доступ, так и к небольшим (менее 1 МБ) данным.',
  },
  {
    value: StorageClassItem.Warm,
    label: 'Теплое (Warm)',
    description: 'Подходит для хранения информации, доступ к которой требуется нечасто (меньше 12-ти раз в год).',
  },
  {
    value: StorageClassItem.Cold,
    label: 'Холодное (Cold)',
    description:
      'Архивный класс хранения предназначен для данных, доступ к которым требуется редко (в среднем один раз в год).',
  },
];

const DataRedundancyPolicyItem = {
  Multi: 'Multi',
  Single: 'Single',
};

const dataRedundancyPolicyItems = [
  {
    value: DataRedundancyPolicyItem.Multi,
    label: 'В трех зонах',
  },
  {
    value: DataRedundancyPolicyItem.Single,
    label: 'В одной зоне',
  },
];

const RestoringDataTypeItem = {
  Standard:
    // тут очепятка намеренная, тк бек такое тоже ждет
    'Standart',
  Fast: 'Fast',
};

const restoringDataTypeItems = [
  {
    value: RestoringDataTypeItem.Standard,
    label: 'Стандартное',
  },
  {
    value: RestoringDataTypeItem.Fast,
    label: 'Быстрое',
  },
];

const apiUiOptions: Partial<StepperControl['uiProps']> = {
  min: 0,
  step: 1_000,
  max: 9_999_999_000,
  showHint: false,
  postfix: 'Шт',
};

export const OBJECT_STORAGE_FORM_CONFIG: FormConfig = {
  ui: [
    'storageClass',
    ['storage', 'dataRedundancyPolicy'],
    'apiActions',
    ['internetOutbound'],
    ['restoringDataType'],
    ['quantityRestoringData'],
  ],
  controls: {
    storageClass: {
      type: CONTROL.Carousel,
      defaultValue: StorageClassItem.Standard,
      items: storageClassItems,
      accessorKey: 'storages[0].obs.storageClass',
      decoratorProps: {
        label: 'Тип хранилища',
      },
    },
    storage: getObs({
      space: {
        accessorKey: 'storages[0].obs.storage.space',
        label: 'Размер хранилища',
        defaultValue: 100,
        uiProps: {
          min: 0,
          max: 9_999_999_900,
          showHint: false,
        },
      },
      units: {
        accessorKey: 'storages[0].obs.storage.specification',
      },
    }),
    dataRedundancyPolicy: {
      type: CONTROL.Segmented,
      accessorKey: 'storages[0].obs.dataRedundancyPolicy',
      defaultValue: DataRedundancyPolicyItem.Single,
      items: dataRedundancyPolicyItems,
      decoratorProps: {
        label: 'Зона доступности хранения данных',
      },
      watchedControls: { storageClass: 'storages[0].obs.storageClass' },
      relateFn: ({ storageClass }) => {
        if (storageClass === StorageClassItem.Cold) {
          return {
            items: dataRedundancyPolicyItems.slice(1),
          };
        }
      },
    },
    apiActions: {
      type: CONTROL.Object,
      decoratorProps: {
        label: 'Количество операций API',
      },
      ui: [['apiGet'], ['apiPut'], ['apiDelete']],
      controls: {
        apiGet: {
          type: CONTROL.Stepper,
          defaultValue: 0,
          accessorKey: 'storages[0].obs.apiGet',
          decoratorProps: {
            label: 'GET-операции',
          },
          uiProps: apiUiOptions,
        },
        apiPut: {
          type: CONTROL.Stepper,
          defaultValue: 0,
          accessorKey: 'storages[0].obs.apiPut',
          decoratorProps: {
            label: 'PUT-операции',
          },
          uiProps: apiUiOptions,
        },
        apiDelete: {
          type: CONTROL.Stepper,
          defaultValue: 0,
          accessorKey: 'storages[0].obs.apiDelete',
          decoratorProps: {
            label: 'DELETE-операции',
          },
          uiProps: apiUiOptions,
        },
      },
    },

    internetOutbound: getObs({
      space: {
        accessorKey: 'storages[0].obs.internetOutbound.traffic',
        label: 'Исходящий трафик в интернет',
        defaultValue: 0,
      },
      units: {
        accessorKey: 'storages[0].obs.internetOutbound.unitsOfCalculation',
      },
    }),
    restoringDataType: {
      type: CONTROL.Segmented,
      accessorKey: 'storages[0].obs.restoringDataType',
      defaultValue: RestoringDataTypeItem.Standard,
      items: restoringDataTypeItems,
      decoratorProps: {
        label: 'Восстановление данных',
      },
      watchedControls: { storageClass: 'storages[0].obs.storageClass' },
      relateFn: ({ storageClass }) => {
        if (storageClass !== StorageClassItem.Cold) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    quantityRestoringData: getObs({
      space: {
        accessorKey: 'storages[0].obs.quantityRestoringData.quantity',
        label: 'Объём восстановленных данных',
        defaultValue: 0,
        uiProps: {
          max: 9_999_999_900,
        },
        watchedControls: {
          storageClass: 'storages[0].obs.storageClass',
          unitsOfCalculation: 'storages[0].obs.quantityRestoringData.unitsOfCalculation',
        },
        relateFn: ({ storageClass, unitsOfCalculation }) => {
          const uiProps: Partial<StepperControl['uiProps']> = {};

          if (unitsOfCalculation === UnitsOfCalculationItem.Tb) {
            uiProps.max = 9_765_620;
            uiProps.postfix = 'ТБ';
          }

          if (storageClass !== StorageClassItem.Cold) {
            uiProps.visible = false;
          }

          return { uiProps };
        },
      },
      units: {
        accessorKey: 'storages[0].obs.quantityRestoringData.unitsOfCalculation',
        watchedControls: { storageClass: 'storages[0].obs.storageClass' },

        relateFn: ({ storageClass }) => {
          if (storageClass !== StorageClassItem.Cold) {
            return {
              uiProps: {
                visible: false,
              },
            };
          }
        },
      },
    }),
  },
};
