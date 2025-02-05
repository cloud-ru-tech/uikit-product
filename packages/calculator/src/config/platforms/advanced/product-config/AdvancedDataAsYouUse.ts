import { CONTROL, FormConfig } from '../../../../components';
import { generateInstanceConfigItems } from '../../../utils';

const componentTypeItem = {
  Cdm: 'CDM',
  Dis: 'DIS',
};

const componentTypeItems = [
  {
    value: componentTypeItem.Cdm,
    label: 'Cloud Data Migration (CDM)',
    description:
      'Позволяет осуществлять пакетную миграцию данных между однородными и разнородными источниками данных. Миграция данных из разных источников, включая локальные и облачные файловые системы, реляционные базы данных, хранилища данных, NoSQL, большие данные и хранилище объектов',
  },
  {
    value: componentTypeItem.Dis,
    label: 'Data Ingestion Service (DIS)',
    description:
      'Решает проблему передачи данных за пределами облака внутрь облака. DIS создает потоки приема данных для пользовательских приложений, способных обрабатывать или анализировать потоковые данные. DIS непрерывно собирает, передает и хранит терабайты данных из сотен тысяч источников каждый час, таких как журналы, каналы социальных сетей, потоки посещений веб-сайтов и события отслеживания местоположения',
  },
];

const streamTypeItem = {
  GeneralCommon: 'General/Common',
  Advanced: 'Advanced',
};

const streamTypeItems = [
  {
    value: streamTypeItem.GeneralCommon,
    label: 'General/Common',
    description:
      'Каждая партиция поддерживает максимальную скорость чтения 2 Мб/с и максимальную скорость записи 1 Мб/с',
  },
  {
    value: streamTypeItem.Advanced,
    label: 'Advanced',
    description:
      'Каждая партиция поддерживает максимальную скорость чтения 10 Мб/с и максимальную скорость записи 5 Мб/с',
  },
];

const clusterTypeItems = generateInstanceConfigItems([
  [8, 16],
  [16, 32],
  [64, 128],
]);

export const DATA_AS_YOU_USE_FORM_CONFIG: FormConfig = {
  ui: ['componentType', ['clusterType', 'workTime'], 'streamType', ['partitionCount']],
  controls: {
    componentType: {
      type: CONTROL.Carousel,
      accessorKey: 'componentType',
      defaultValue: componentTypeItem.Cdm,
      items: componentTypeItems,
      decoratorProps: {
        label: 'Тип очереди запроса',
      },
      uiProps: {
        showItems: 2,
        pagination: false,
        arrows: false,
      },
    },

    clusterType: {
      type: CONTROL.SelectSingle,
      accessorKey: 'clusterType',
      defaultValue: '8 16',
      items: clusterTypeItems,
      decoratorProps: {
        label: 'Кластер',
      },
      uiProps: {
        searchable: false,
        showClearButton: false,
      },
      watchedControls: { componentType: 'componentType' },
      relateFn: ({ componentType }) => {
        if (componentType === componentTypeItem.Dis) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },

    workTime: {
      type: CONTROL.Stepper,
      accessorKey: 'workTime',
      defaultValue: 1,
      decoratorProps: {
        label: 'Время работы в день',
      },
      uiProps: {
        min: 1,
        max: 24,
        postfix: 'ч',
      },
    },

    streamType: {
      type: CONTROL.Carousel,
      accessorKey: 'streamType',
      defaultValue: streamTypeItem.GeneralCommon,
      items: streamTypeItems,
      decoratorProps: {
        label: 'Тип потока',
      },
      uiProps: {
        showItems: 2,
        pagination: false,
        arrows: false,
      },
      watchedControls: { componentType: 'componentType' },
      relateFn: ({ componentType }) => {
        if (componentType === componentTypeItem.Cdm) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
      },
    },
    partitionCount: {
      type: CONTROL.Stepper,
      accessorKey: 'partitionCount',
      defaultValue: 1,
      decoratorProps: {
        label: 'Количество партиций',
      },
      uiProps: {
        min: 1,
        max: 50,
        postfix: 'Шт',
      },
      watchedControls: { streamType: 'streamType', componentType: 'componentType' },
      relateFn: ({ streamType, componentType }) => {
        if (componentType === componentTypeItem.Cdm) {
          return {
            uiProps: {
              visible: false,
            },
          };
        }
        if (streamType === streamTypeItem.Advanced) {
          return {
            uiProps: { max: 10 },
          };
        }
      },
    },
  },
};
