import { CONTROL, FormConfig, StepperControl } from '../../../../components';

const StorageTypeItem = {
  Standard:
    // Бек требует именно так
    'standart',
  Cold: 'cold',
  Ice: 'ice',
  Single: 'single',
};

const multiAZStorageTypeItems = [
  {
    value: StorageTypeItem.Standard,
    label: 'Стандартное (Standard)',
    description:
      'Для медиаконтента, писем и документов. Высокая стоимость хранения, низкая стоимость операций с данными',
  },
  {
    value: StorageTypeItem.Cold,
    label: 'Холодное (Cold)',
    description:
      'Для редкоиспользуемых данных, логов, отчетов, озер данных. Низкая стоимость хранения, высокая стоимость операций с данными',
  },
  {
    value: StorageTypeItem.Ice,
    label: 'Ледяное (Ice)',
    description:
      'Для бэкапов и архивов большого объема. Низкая стоимость хранения, высокая стоимость операций с данными',
  },
];

const singleAZStorageTypeItems = [
  {
    value: StorageTypeItem.Single,
    label: 'Однозонное',
    description: 'Для часто используемых данных',
  },
];

const DeploymentZoneItem = {
  SingleAZ: '1AZ',
  MultiAZ: 'MultiAZ',
};

const deploymentZoneItems = [
  {
    value: DeploymentZoneItem.MultiAZ,
    label: 'Multi-AZ',
  },
  {
    value: DeploymentZoneItem.SingleAZ,
    label: 'Single-AZ',
  },
];

const apiUiOptions: Partial<StepperControl['uiProps']> = {
  min: 0,
  step: 1_000,
  max: 9_999_999_999,
  showHint: false,
  postfix: 'Шт',
};

export const EVOLUTION_STORAGE_S3_FORM_CONFIG: FormConfig = {
  ui: [
    ['deploymentZone'],
    'storageType',
    ['storageSize', 'outgoingTraffic'],
    ['apiPut', 'apiPost'],
    ['apiGet', 'apiHead'],
    ['apiList'],
  ],
  controls: {
    deploymentZone: {
      type: CONTROL.Segmented,
      accessorKey: 'deploymentZone',
      defaultValue: DeploymentZoneItem.MultiAZ,
      items: deploymentZoneItems,
      decoratorProps: {
        label: 'Зона доступности',
      },
    },
    storageType: {
      type: CONTROL.Carousel,
      defaultValue: StorageTypeItem.Standard,
      items: multiAZStorageTypeItems,
      accessorKey: 'storageType',
      decoratorProps: {
        label: 'Класс хранения',
      },
      watchedControls: { deploymentZone: 'deploymentZone' },
      relateFn: ({ deploymentZone }) => {
        if (deploymentZone === DeploymentZoneItem.SingleAZ) {
          return {
            items: singleAZStorageTypeItems,
          };
        }
      },
    },
    storageSize: {
      type: CONTROL.Stepper,
      defaultValue: 1,
      accessorKey: 'storageSize',
      decoratorProps: {
        label: 'Размер хранилища',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        showHint: false,
        postfix: 'ГБ',
      },
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'Размер хранилища (бесплатно до 15 ГБ)' },
          };
        }
      },
    },
    outgoingTraffic: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'outgoingTraffic',
      decoratorProps: {
        label: 'Исходящий трафик',
      },
      uiProps: {
        min: 0,
        max: 9_999_999_999,
        showHint: false,
        postfix: 'ГБ',
      },
    },
    apiPut: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'apiPut',
      decoratorProps: {
        label: 'PUT-операции',
      },
      uiProps: apiUiOptions,
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'PUT-операции (бесплатно до 100 тысяч)' },
          };
        }
      },
    },
    apiPost: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'apiPost',
      decoratorProps: {
        label: 'POST-операции',
      },
      uiProps: apiUiOptions,
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'POST-операции (бесплатно до 100 тысяч)' },
          };
        }
      },
    },
    apiGet: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'apiGet',
      decoratorProps: {
        label: 'GET-операции',
      },
      uiProps: apiUiOptions,
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'GET-операции (бесплатно до 1 миллиона)' },
          };
        }
      },
    },
    apiHead: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'apiHead',
      decoratorProps: {
        label: 'HEAD-операции',
      },
      uiProps: apiUiOptions,
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'HEAD-операции (бесплатно до 1 миллиона)' },
          };
        }
      },
    },
    apiList: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'apiList',
      decoratorProps: {
        label: 'LIST-операции',
      },
      uiProps: apiUiOptions,
      watchedControls: { deploymentZone: 'deploymentZone', storageType: 'storageType' },
      relateFn: ({ deploymentZone, storageType }) => {
        if (deploymentZone === DeploymentZoneItem.MultiAZ && storageType === StorageTypeItem.Standard) {
          return {
            decoratorProps: { label: 'LIST-операции (бесплатно до 100 тысяч)' },
          };
        }
      },
    },
  },
};
